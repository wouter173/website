import { CONSTANTS } from '@/app/constants'
import type { Metadata } from 'next'
import { cacheTag } from 'next/cache'
import { Suspense } from 'react'
import { Header } from './_devlog/header'
import { getPdsPosts } from './_devlog/get-pds-posts'
import { DevlogEntryList } from './_devlog/entry-list'

export const metadata: Metadata = {
  title: 'Devlog',
  alternates: {
    canonical: '/devlog',
  },
}

export default async function Page() {
  'use cache'
  cacheTag(CONSTANTS.cacheTags.devlog)

  const posts = await getPdsPosts()

  return (
    <>
      <main className="relative z-10 mx-auto min-h-[calc(100vh-var(--spacing)*24)] w-full max-w-4xl p-24 px-0">
        <Header />

        <Suspense>
          <DevlogEntryList prefetchedPosts={posts} />
        </Suspense>
      </main>
    </>
  )
}
