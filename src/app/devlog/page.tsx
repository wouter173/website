import { CONSTANTS } from '@/app/constants'
import type { Metadata } from 'next'
import { cacheTag } from 'next/cache'
import { cache, Suspense } from 'react'
import { Header } from './_devlog/header'
import { getPdsPosts } from './_devlog/get-pds-posts'
import { DevlogEntryList } from './_devlog/entry-list'

const cachedGetPdsPosts = cache(getPdsPosts)

export async function generateMetadata(): Promise<Metadata> {
  'use cache'
  cacheTag(CONSTANTS.cacheTags.devlog)

  const posts = await cachedGetPdsPosts()
  const post = posts.at(0)

  const imageUrl = post ? `/devlog/${encodeURIComponent(post?.rkey)}/opengraph-image` : null
  const text = post?.content.text.slice(0, 160)
  const description = `Devlog: ${text ?? `\"${text}\"`}`

  return {
    title: 'Devlog',
    description,
    alternates: {
      canonical: '/devlog',
      types: {
        'application/rss+xml': `${CONSTANTS.canonicalUrl}/devlog/rss.xml`,
      },
    },
    openGraph: {
      title: 'Devlog | Wouter de Bruijn',
      description,
      url: '/devlog',
      siteName: 'Wouter de Bruijn',
      images: imageUrl ? [imageUrl] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Devlog | Wouter de Bruijn',
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

export default async function Page() {
  'use cache'
  cacheTag(CONSTANTS.cacheTags.devlog)

  const posts = await getPdsPosts()

  return (
    <>
      <main className="relative z-10 mx-auto min-h-[calc(100vh-var(--spacing)*24)] w-full max-w-4xl p-24 px-6 lg:px-0">
        <Header />

        <Suspense>
          <DevlogEntryList prefetchedPosts={posts} />
        </Suspense>
      </main>
    </>
  )
}
