import type { Metadata } from 'next'
import { DevlogEntryList } from '../../devlog-entry-list'
import { Suspense } from 'react'
import { Header } from '../../header'

export async function generateMetadata({ params }: PageProps<'/devlog/[id]'>): Promise<Metadata> {
  return {
    title: 'Devlog',
    alternates: {
      canonical: '/devlog',
    },
  }
}

export default async function Page({ params }: PageProps<'/devlog/[id]'>) {
  const { id } = await params

  return (
    <main className="relative z-10 mx-auto min-h-[calc(100vh-var(--spacing)*24)] w-full max-w-4xl p-24 px-0">
      <Header />
      <div className="mx-auto mt-8 flex max-w-xl flex-col items-center justify-center">
        <Suspense>
          <DevlogEntryList highlighted={id} />
        </Suspense>
      </div>
    </main>
  )
}
