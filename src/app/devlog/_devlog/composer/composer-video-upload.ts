import { lexParse, type Client } from '@atproto/lex'
import { errorSchema, getServiceAuth, jobResponseSchema, limitsSchema } from '../atproto/atproto-client'

const VIDEO_SERVICE = 'https://video.bsky.app/xrpc/'

async function request(path: string, init?: RequestInit) {
  const response = await fetch(VIDEO_SERVICE + path, init)

  let body
  try {
    body = lexParse(await response.text())
  } catch {
    throw new Error(`The video service returned an invalid response (HTTP ${response.status}).`)
  }

  const existingJob = response.status === 409 && jobResponseSchema.matches(body)

  if (!response.ok && !existingJob) {
    const error = errorSchema.ifMatches(body)
    throw new Error(error?.message || error?.error || `Video service returned HTTP ${response.status}.`)
  }

  return body
}

function readJob(body: unknown) {
  const result = jobResponseSchema.parse(body)
  return 'jobStatus' in result ? result.jobStatus : result
}

export async function uploadVideo(writer: Client, file: File, pdsUrl: string) {
  const did = writer.did
  if (!did) throw new Error('Please sign in before uploading a video.')

  async function authorize(aud: string, lxm: 'app.bsky.video.getUploadLimits' | 'com.atproto.repo.uploadBlob', lifetime: number) {
    const { token } = await writer.call(getServiceAuth, { aud, lxm, exp: Math.floor(Date.now() / 1000) + lifetime })
    return { Authorization: `Bearer ${token}` }
  }

  const limits = limitsSchema.parse(
    await request('app.bsky.video.getUploadLimits', {
      headers: await authorize('did:web:video.bsky.app', 'app.bsky.video.getUploadLimits', 60),
    }),
  )

  if (!limits.canUpload) {
    throw new Error(limits.message || limits.error || 'This account cannot upload videos right now.')
  }

  const headers = await authorize(`did:web:${encodeURIComponent(new URL(pdsUrl).host)}`, 'com.atproto.repo.uploadBlob', 30 * 60)

  const params = new URLSearchParams({ did, name: file.name })
  let job = readJob(
    await request(`app.bsky.video.uploadVideo?${params}`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'video/mp4' },
      body: file,
    }),
  )

  while (true) {
    if (job.blob) return job.blob

    const alreadyProcessed = job.error === 'already_exists'
    if (job.state === 'JOB_STATE_FAILED' || (job.error && !alreadyProcessed)) {
      throw new Error(job.message || job.error || 'Video processing failed.')
    }
    if (job.state === 'JOB_STATE_COMPLETED' && !alreadyProcessed) {
      throw new Error('Video processing finished without a video blob.')
    }

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const params = new URLSearchParams({ jobId: job.jobId })
    job = readJob(await request(`app.bsky.video.getJobStatus?${params}`))
  }
}
