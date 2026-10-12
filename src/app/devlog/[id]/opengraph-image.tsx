import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { CSSProperties } from 'react'
import { Schema } from 'effect'
import { CONSTANTS } from '@/app/constants'
import { getPdsPost } from '../_devlog/get-pds-posts'
import type { postSchema } from '../_devlog/schema'

export const alt = 'Devlog by Wouter de Bruijn'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type Post = typeof postSchema.Type
type Media = { src?: string; video?: boolean }

const decodeThumbnailResponse = Schema.decodeUnknownSync(
  Schema.Struct({
    posts: Schema.Array(
      Schema.Struct({
        embed: Schema.optional(Schema.Struct({ $type: Schema.String, thumbnail: Schema.optional(Schema.String) })),
      }),
    ),
  }),
)

const interFonts = Promise.all([
  readFile(join(process.cwd(), 'public/fonts/Inter/static/Inter_24pt-Regular.ttf')),
  readFile(join(process.cwd(), 'public/fonts/Inter/static/Inter_24pt-SemiBold.ttf')),
]).then(([regular, semibold]) => [
  { name: 'Inter', data: regular, weight: 400 as const, style: 'normal' as const },
  { name: 'Inter', data: semibold, weight: 600 as const, style: 'normal' as const },
])

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPdsPost(id)
  const [media, fonts] = await Promise.all([getMedia(post), interFonts])

  return new ImageResponse(<DevlogOgCard post={post} media={media} />, { ...size, fonts })
}

async function getMedia(post: Post): Promise<Media[]> {
  const attachment = post.attachments

  if (attachment?.type === 'images') {
    return attachment.images.slice(0, 4).map((image) => ({ src: image.url }))
  }

  if (attachment?.type === 'video') {
    return [{ src: await getVideoThumbnail(post.rkey), video: true }]
  }

  if (attachment?.type === 'embed' && attachment.imageUrl) {
    return [{ src: attachment.imageUrl }]
  }

  return []
}

async function getVideoThumbnail(rkey: string): Promise<string | undefined> {
  try {
    const url = new URL('https://public.api.bsky.app/xrpc/app.bsky.feed.getPosts')
    url.searchParams.append('uris', `at://${CONSTANTS.did}/app.bsky.feed.post/${rkey}`)

    const response = await fetch(url, { signal: AbortSignal.timeout(5000) })
    if (!response.ok) return undefined

    const json = await response.json()
    const data = decodeThumbnailResponse(json)
    console.log(data.posts.at(0)?.embed)

    const embed = data.posts[0]?.embed
    return embed?.$type === 'app.bsky.embed.video#view' ? embed.thumbnail : undefined
  } catch {
    // The card still renders if the video is not indexed or the AppView is unavailable.
    return undefined
  }
}

function DevlogOgCard({ post, media }: { post: Post; media: Media[] }) {
  const hasMedia = media.length > 0
  const columns =
    media.length === 3
      ? [[media[0], media[1]], [media[2]]]
      : media.length === 4
        ? [
            [media[0], media[2]],
            [media[1], media[3]],
          ]
        : media.map((item) => [item])

  const datetime = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(post.createdAt))

  return (
    <div
      tw="relative flex h-full w-full flex-col bg-black text-neutral-100"
      style={{ padding: '48px 56px 0px', fontFamily: 'Inter', justifyContent: hasMedia ? 'flex-start' : 'center' }}
    >
      <div tw="flex rounded-[32px] bg-black flex-col p-8" style={{ height: hasMedia ? '100%' : 'fit' }}>
        <div tw="flex items-center justify-between" style={{ flexShrink: 0 }}>
          <div tw="flex items-center" style={{ gap: 14, fontSize: 25 }}>
            <span tw="font-semibold">Me</span>
            <div tw="bg-neutral-500" style={{ width: 7, height: 7 }} />
            <span tw="text-[#929292]" style={{ fontSize: 25 }}>
              {datetime}
            </span>
          </div>
        </div>
        {post.content.text.trim() && (
          <div
            style={
              {
                display: 'block',
                marginTop: 24,
                fontSize: hasMedia ? 25 : 25,
                lineHeight: 1.3,
                letterSpacing: -0.8,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                lineClamp: hasMedia ? 4 : 6,
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                flexShrink: 0,
              } as CSSProperties
            }
          >
            {post.content.text}
          </div>
        )}
        {hasMedia && (
          <div tw="mt-6 flex" style={{ flex: 1, minHeight: 0, gap: 12, marginBottom: -80 }}>
            {columns.map((column, index) => (
              <div key={index} tw="flex flex-col" style={{ flex: 1, minWidth: 0, minHeight: 0, gap: 12 }}>
                {column.map((item, index) => (
                  <MediaTile key={index} item={item} />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function MediaTile({ item }: { item: Media }) {
  return (
    <div
      tw="relative flex items-center justify-center overflow-hidden border border-[#303030] bg-[#080808]"
      style={{ flex: 1, minHeight: 0, borderRadius: 20 }}
    >
      {item.src && (
        <img
          src={item.src}
          alt=""
          style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
        />
      )}
      {item.video && (
        <div
          style={{
            display: 'flex',
            width: 72,
            height: 72,
            borderRadius: 36,
            background: 'rgba(0,0,0,0.65)',
            border: '1px solid rgba(255,255,255,0.3)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="26" height="30" viewBox="0 0 26 30">
            <path d="M3 2L25 15L3 28Z" fill="white" />
          </svg>
        </div>
      )}
    </div>
  )
}
