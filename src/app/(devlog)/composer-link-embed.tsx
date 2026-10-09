import { queryOptions, useQuery } from '@tanstack/react-query'
import type { BlobRef, Client } from '@atproto/lex'
import { Schema } from 'effect'

const cardybSchema = Schema.Struct({
  error: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  image: Schema.optional(Schema.String),
})

export type LinkEmbed = {
  url: string
  title: string
  description: string
  siteName: string
  image?: { url: string; alt: string }
}

export async function createLinkEmbed(writer: Client, embed: LinkEmbed) {
  let thumb: BlobRef | undefined

  if (embed.image) {
    const response = await fetch(embed.image.url)
    if (!response.ok) throw new Error('Could not fetch the link image.')

    const image = await response.blob()
    if (image.size > 1_000_000) {
      throw new Error('The link image exceeds the 1 MB thumbnail limit.')
    }

    const { body } = await writer.uploadBlob(image)
    thumb = body.blob
  }

  return {
    $type: 'app.bsky.embed.external',
    external: {
      uri: embed.url,
      title: embed.title,
      description: embed.description,
      ...(thumb ? { thumb } : {}),
    },
  }
}

export function getLinkEmbedUrlFromText(text: string): URL | undefined {
  for (const match of text.matchAll(/\bhttps?:\/\/[^\s<>"'`]+/gi)) {
    let value = match[0].replace(/[.,!?;:]+$/, '')

    const brackets: Record<string, string> = { ')': '(', ']': '[', '}': '{' }

    while (value.length) {
      const closing = value.at(-1)!
      const opening = brackets[closing]
      if (!opening || value.split(closing).length <= value.split(opening).length) break
      value = value.slice(0, -1).replace(/[.,!?;:]+$/, '')
    }

    try {
      const url = new URL(value)
      if (['http:', 'https:'].includes(url.protocol) && !url.username && !url.password) return url
    } catch {}
  }
}

export async function getLinkEmbed(url: string, signal?: AbortSignal): Promise<LinkEmbed> {
  const params = new URLSearchParams({ url })
  const response = await fetch(`https://cardyb.bsky.app/v1/extract?${params}`, { signal })
  if (!response.ok) throw new Error('Could not load the link embed.')

  const json = await response.json()
  const metadata = await Schema.decodeUnknownPromise(cardybSchema)(json)

  const hostname = new URL(url).hostname
  const title = metadata.title || hostname

  return {
    url,
    title,
    description: metadata.description || '',
    siteName: hostname,
    ...(metadata.image ? { image: { url: metadata.image, alt: title } } : {}),
  }
}

export const linkEmbedQueryOptions = (url: string) =>
  queryOptions({
    queryKey: ['link-preview', url] as const,
    queryFn: ({ signal }) => getLinkEmbed(url, signal),
    staleTime: 5 * 60 * 1000,
    retry: false,
  })

export function LinkEmbedPreview({ url }: { url: string }) {
  const { data: preview } = useQuery(linkEmbedQueryOptions(url))

  if (!preview) return null

  return <LinkEmbed embed={preview} />
}

export function LinkEmbed({ embed }: { embed: LinkEmbed }) {
  return (
    <a
      href={embed.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Link preview: ${embed.title}`}
      className="block overflow-hidden rounded-lg border border-neutral-200 text-sm hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
    >
      {embed?.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={embed.image.url} alt={embed.image.alt} className="aspect-[1.90476/1] w-full object-cover" />
      )}

      <div className="min-w-0 p-3">
        <p className="text-label font-medium dark:text-neutral-200">{embed.title}</p>
        {embed.description && <p className="mt-1 text-sm text-neutral-400">{embed.description}</p>}
        <p className="mt-1 text-xs break-all text-neutral-500">{embed.url}</p>
      </div>
    </a>
  )
}
