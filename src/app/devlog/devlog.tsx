import type { Metadata } from 'next'
import { DevlogEntryList } from './devlog-entry-list'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Devlog',
  alternates: {
    canonical: '/devlog',
  },
}

export default function Page() {
  return (
    <main className="relative z-10 mx-auto min-h-[calc(100vh-var(--spacing)*24)] w-full max-w-4xl p-24 px-6 lg:px-0">
      <h1 className="text-label font-serif text-4xl font-bold dark:text-neutral-200">Devlog</h1>
      <div className="mx-auto mt-8 flex max-w-xl flex-col items-center justify-center">
        <Suspense>
          <DevlogEntryList />
        </Suspense>
      </div>
    </main>
  )
}
