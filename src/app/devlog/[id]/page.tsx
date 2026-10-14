import { CONSTANTS } from '@/app/constants'
import type { Metadata } from 'next'
import { cacheTag } from 'next/cache'
import { getPdsPost, getPdsPosts } from '../_devlog/get-pds-posts'
import { Header } from '../_devlog/header'
import { DevlogEntryList } from '../_devlog/entry-list'

export const instant = false

export async function generateMetadata({ params }: PageProps<'/devlog/[id]'>): Promise<Metadata> {
  'use cache'
  cacheTag(CONSTANTS.cacheTags.devlog)

  const { id } = await params
  const post = await getPdsPost(id)

  const url = `/devlog/${encodeURIComponent(id)}`
  const text = post.content.text.slice(0, 160)
  const description = `Devlog: ${text ?? `\"${text}\"`}`

  return {
    title: 'Devlog',
    description,
    alternates: {
      canonical: url,
      types: { 'application/rss+xml': `${CONSTANTS.canonicalUrl}/devlog/rss.xml` },
    },
    openGraph: {
      title: 'Devlog | Wouter de Bruijn',
      description,
      url,
      siteName: 'Wouter de Bruijn',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Devlog | Wouter de Bruijn',
      description,
      images: [`${url}/opengraph-image`],
    },
  }
}

export default async function Page({ params }: PageProps<'/devlog/[id]'>) {
  'use cache'
  cacheTag(CONSTANTS.cacheTags.devlog)

  const { id } = await params

  const topPosts = await getPdsPosts()
  const nearTop = topPosts.slice(0, 3).some((post) => post.rkey === id)
  const prefetchedAt = new Date()

  return (
    <>
      <main className="relative z-10 mx-auto min-h-[calc(100vh-var(--spacing)*24)] w-full max-w-4xl p-24 px-6 lg:px-0">
        <Header hideUntilPositioned={!nearTop} />
        <DevlogEntryList highlighted={id} prefetchedPosts={{ posts: topPosts, at: prefetchedAt }} />
      </main>
    </>
  )
}
