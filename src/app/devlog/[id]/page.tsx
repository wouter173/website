import { CONSTANTS } from '@/app/constants'
import type { Metadata } from 'next'
import { cacheTag } from 'next/cache'
import { Suspense } from 'react'
import { getPdsPosts } from '../_devlog/get-pds-posts'
import { Header } from '../_devlog/header'
import type { postSchema } from '../_devlog/schema'
import { DevlogEntryList } from '../_devlog/entry-list'

export const instant = false

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Devlog',
    alternates: {
      canonical: '/devlog',
    },
  }
}

export default async function Page({ params }: PageProps<'/devlog/[id]'>) {
  'use cache'
  cacheTag(CONSTANTS.cacheTags.devlog)
  const posts = await getPdsPosts()

  return (
    <>
      <main className="relative z-10 mx-auto min-h-[calc(100vh-var(--spacing)*24)] w-full max-w-4xl p-24 px-6 lg:px-0">
        <Suspense>
          <PageContent params={params} posts={posts} />
        </Suspense>
      </main>
    </>
  )
}

async function PageContent({ params, posts }: { params: Promise<{ id: string }>; posts: Array<typeof postSchema.Type> }) {
  const { id } = await params
  const nearTop = posts.slice(0, 3).some((post) => post.rkey === id)

  return (
    <>
      <Header hideUntilPositioned={!nearTop} />
      <DevlogEntryList highlighted={id} prefetchedPosts={posts} />
    </>
  )
}
