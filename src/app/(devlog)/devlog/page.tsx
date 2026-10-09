import type { Metadata } from 'next'
import { DevlogEntryList } from '../devlog-entry-list'
import { Suspense } from 'react'
import { Header } from '../header'

export const metadata: Metadata = {
  title: 'Devlog',
  alternates: {
    canonical: '/devlog',
  },
}

export default function Page() {
  return (
    <main className="relative z-10 mx-auto min-h-[calc(100vh-var(--spacing)*24)] w-full max-w-4xl p-24 px-0">
      <Header />

      <Suspense>
        <DevlogEntryList />
      </Suspense>
    </main>
  )
}
