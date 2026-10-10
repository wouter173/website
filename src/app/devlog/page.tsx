import type { Metadata } from 'next'
import { DevlogEntryList } from './_devlog/entry-list'
import { Suspense } from 'react'
import { Header } from './_devlog/header'
import { cacheTag } from 'next/cache'
import { CONSTANTS } from '@/app/constants'

import { getPdsPosts } from './_devlog/get-pds-posts'

export const metadata: Metadata = {
  title: 'Devlog',
  alternates: {
    canonical: '/devlog',
  },
}

export default async function Page() {
  'use cache'
  cacheTag(CONSTANTS.cacheTags.devlog)

  const posts = await getPdsPosts({ limit: 10 })

  return (
    <main className="relative z-10 mx-auto min-h-[calc(100vh-var(--spacing)*24)] w-full max-w-4xl p-24 px-0">
      <Header />

      <Suspense>
        <DevlogEntryList prefetchedPosts={posts} />
      </Suspense>
    </main>
  )
}
