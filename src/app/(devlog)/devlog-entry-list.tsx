import { cn } from '@/lib/utils'
import { DevlogEntry } from './devlog-entry'
import { getDevlogPosts } from './devlog-atproto'
import { Schema } from 'effect'
import { isCid } from '@atproto/lex'
import { CONSTANTS } from '../constants'
import { aspectRatioSchema, postSchema } from './schema'

const blobSchema = Schema.Struct({
  ref: Schema.declare(isCid),
  mimeType: Schema.String,
})

const bskyPostSchema = Schema.Struct({
  text: Schema.String,
  createdAt: Schema.String,
  embed: Schema.optional(
    Schema.Union([
      Schema.Struct({
        $type: Schema.Literal('app.bsky.embed.video'),
        video: blobSchema,
        aspectRatio: Schema.optional(aspectRatioSchema),
      }),
      Schema.Struct({
        $type: Schema.Literal('app.bsky.embed.images'),
        images: Schema.Array(
          Schema.Struct({
            image: blobSchema,
            aspectRatio: Schema.optional(aspectRatioSchema),
          }),
        ),
      }),
      Schema.Struct({
        $type: Schema.Literal('app.bsky.embed.external'),
        external: Schema.Struct({
          uri: Schema.String,
          title: Schema.String,
          description: Schema.String,
          thumb: Schema.optional(blobSchema),
        }),
      }),
    ]),
  ),
})

function toMedia(blob: typeof blobSchema.Type) {
  const params = new URLSearchParams({
    did: CONSTANTS.did,
    cid: blob.ref.toString(),
  })

  return {
    mimeType: blob.mimeType,
    url: `${CONSTANTS.devlogUrl}/xrpc/com.atproto.sync.getBlob?${params}`,
  }
}

function toAttachment(embed: (typeof bskyPostSchema.Type)['embed']): (typeof postSchema.Type)['attachments'] {
  switch (embed?.$type) {
    case 'app.bsky.embed.video':
      return {
        type: 'video',
        ...toMedia(embed.video),
        aspectRatio: embed.aspectRatio,
      }

    case 'app.bsky.embed.images':
      return {
        type: 'images',
        images: embed.images.map(({ image, aspectRatio }) => ({
          ...toMedia(image),
          aspectRatio,
        })),
      }

    case 'app.bsky.embed.external':
      return {
        type: 'embed',
        uri: embed.external.uri,
        title: embed.external.title,
        description: embed.external.description,
        imageUrl: embed.external.thumb ? toMedia(embed.external.thumb).url : '',
      }
  }
}

export function toDevlogPost(value: unknown) {
  const post = Schema.decodeUnknownSync(bskyPostSchema)(value)

  return Schema.decodeUnknownSync(postSchema)({
    topic: '',
    content: { text: post.text },
    createdAt: post.createdAt,
    attachments: toAttachment(post.embed),
  })
}

export async function DevlogEntryList(props: { highlighted?: string }) {
  'use cache'

  const result = await getDevlogPosts()
  const highlighted = props.highlighted ?? result.body.records.at(0)?.cid

  return (
    <div className="mx-auto mt-8 flex max-w-xl flex-col items-center justify-center">
      <ul className="h-full w-full">
        {result.body.records.map((post) => {
          console.log(post)
          return (
            <li
              key={post.cid}
              className={cn(
                'relative my-4 border-neutral-200 p-2 first:mt-0 last:mb-0 dark:border-neutral-800',
                highlighted === post.cid ? '-mx-px rounded-2xl border bg-white dark:bg-black' : 'border-y',
              )}
            >
              <DevlogEntry post={toDevlogPost(post.value)} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
