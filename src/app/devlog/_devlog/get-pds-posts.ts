import { postSchema } from './schema'
import { Client, getBlobCid, type BlobRef } from '@atproto/lex'
import { CONSTANTS } from '@/app/constants'
import { app } from '@/lexicons.generated'

function toMedia(blob: BlobRef) {
  const params = new URLSearchParams({ did: CONSTANTS.did, cid: getBlobCid(blob).toString() })
  return { mimeType: blob.mimeType, url: `${CONSTANTS.devlogUrl}/xrpc/com.atproto.sync.getBlob?${params}` }
}

function toAttachment(embed: app.bsky.feed.post.Main['embed']): (typeof postSchema.Type)['attachments'] {
  if (!embed) return undefined

  if (app.bsky.embed.video.$isTypeOf(embed)) {
    return { type: 'video', ...toMedia(embed.video), aspectRatio: embed.aspectRatio }
  }

  if (app.bsky.embed.images.$isTypeOf(embed)) {
    return { type: 'images', images: embed.images.map(({ image, aspectRatio }) => ({ ...toMedia(image), aspectRatio })) }
  }

  if (app.bsky.embed.external.$isTypeOf(embed)) {
    return { type: 'embed', ...embed.external, imageUrl: embed.external.thumb ? toMedia(embed.external.thumb).url : '' }
  }
}

export async function getPdsPosts({ limit = 10, rkey, reverse = false }: { limit?: number; rkey?: string; reverse?: boolean } = {}) {
  const reader = new Client(CONSTANTS.devlogUrl)

  const result = await reader.list(app.bsky.feed.post, { repo: CONSTANTS.did, limit, cursor: rkey, reverse })

  return result.records
    .filter((post) => post.valid)
    .map((post) => ({
      rkey: post.uri.split('/').at(-1) ?? '',
      topic: '',
      content: { text: post.value.text },
      createdAt: post.value.createdAt,
      attachments: toAttachment(post.value.embed),
    }))
}

export async function getPdsPost(rkey: string) {
  const reader = new Client(CONSTANTS.devlogUrl)
  const { value } = await reader.get(app.bsky.feed.post, { repo: CONSTANTS.did, rkey })

  return {
    rkey,
    topic: '',
    content: { text: value.text },
    createdAt: value.createdAt,
    attachments: toAttachment(value.embed),
  }
}

export async function getPdsWindow(rkey: string) {
  const [target, newer, older] = await Promise.all([
    getPdsPost(rkey),
    getPdsPosts({ rkey, reverse: true }),
    getPdsPosts({ rkey, reverse: false }),
  ])

  return [...newer.toReversed(), target, ...older]
}
