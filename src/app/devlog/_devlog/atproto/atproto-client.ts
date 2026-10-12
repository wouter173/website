import 'client-only'
import { Client, l } from '@atproto/lex'
import { BrowserOAuthClient } from '@atproto/oauth-client-browser'
import { CONSTANTS } from '../../../constants'
import { queryOptions } from '@tanstack/react-query'

//schema
export const getServiceAuth = l.query(
  'com.atproto.server.getServiceAuth',
  l.params({ aud: l.string(), lxm: l.string({ format: 'nsid' }), exp: l.integer() }),
  l.jsonPayload({ token: l.string() }),
)

const jobSchema = l.object({
  jobId: l.string(),
  state: l.string(),
  blob: l.optional(l.blob({ accept: ['video/mp4'] })),
  error: l.optional(l.string()),
  message: l.optional(l.string()),
})

export const jobResponseSchema = l.union([l.object({ jobStatus: jobSchema }), jobSchema])

export const limitsSchema = l.object({
  canUpload: l.boolean(),
  message: l.optional(l.string()),
  error: l.optional(l.string()),
})

export const errorSchema = l.object({
  message: l.optional(l.string()),
  error: l.optional(l.string()),
})

//auth
let initialization: ReturnType<typeof initialize> | undefined

async function initialize() {
  const local = ['localhost', '127.0.0.1'].includes(location.hostname)

  const clientId = local
    ? `http://localhost?${new URLSearchParams({ redirect_uri: 'http://127.0.0.1:3000/devlog', scope: 'atproto transition:generic' })}`
    : `${CONSTANTS.canonicalUrl}/client-metadata.json`

  const oauth = await BrowserOAuthClient.load({
    clientId,
    handleResolver: CONSTANTS.devlogUrl,
  })

  const result = await oauth.init()

  return { oauth, session: result?.session, writer: result ? new Client(result.session) : undefined }
}

export function getAuth() {
  return (initialization ??= initialize())
}

export async function login() {
  const { oauth } = await getAuth()
  await oauth.signIn(CONSTANTS.did, { scope: 'atproto transition:generic' })
}

export async function getToken(writer: Client) {
  const { token } = await writer.call(getServiceAuth, {
    aud: 'did:web:wouterdb.com',
    lxm: 'com.wouterdb.devlog.revalidate',
    exp: Math.floor(new Date().getTime() / 1000) + 60,
  })

  return token
}

// queryOptions
export const atprotoAuthQueryOptions = queryOptions({
  queryKey: ['user'],
  queryFn: async () => getAuth(),
})
