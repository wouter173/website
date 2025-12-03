'use client'

import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ExternalLinkIcon, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import type { PropsWithChildren } from 'react'

export function ProjectCard({ children }: PropsWithChildren) {
  return (
    <div className="group relative w-full">
      <div className="absolute inset-0 top-4 -z-10 origin-bottom -skew-x-2 rounded-2xl border border-[#1E1E1E] bg-black shadow-lg transition-transform ease-in-out group-hover:-rotate-x-12 group-hover:-skew-x-4" />
      <div className="absolute top-0 right-0 left-0 h-1/2 w-full">{children}</div>
      <div className="relative z-10 origin-bottom transition-transform ease-in-out group-hover:rotate-x-6 group-hover:skew-x-2">
        <header className="relative z-10 -mb-2 w-fit min-w-40 rounded-2xl rounded-b-none border border-b-0 border-[#1E1E1E] bg-black px-6 pt-4.5">
          <h2 className="text-label text-2xl leading-tight font-semibold [text-box-trim:trim-both] dark:text-neutral-300">W5 Chat</h2>
          <div className="absolute bottom-[7px] left-full size-2 bg-black [clip-path:polygon(22%_55%,40%_73%,63%_88%,100%_100%,0_100%,0_0,10%_31%)]"></div>
          <div className="absolute bottom-[7px] left-full size-2 rounded-bl-full border-b border-l border-[#1E1E1E]"></div>
          <div className="absolute bottom-0 left-full size-[7px] bg-black"></div>
        </header>
        <section className="rounded-2xl rounded-tl-none border border-[#1E1E1E] bg-black px-6 pt-5 pb-6">
          <div className="mb-14">
            <p className="text leading-8 text-neutral-600 select-none dark:text-neutral-500">
              A set of resources I&apos;ve acquired over the years which I find myself going back to a lot.
            </p>
          </div>
          <div className="mt-auto flex justify-between peer-hover/link:[&_*#primary-cta]:outline-2">
            <div className="flex items-end gap-2">
              <span className="hidden text-sm text-neutral-600 lg:inline">{format(new Date(), 'MMMM yyy')}</span>
              <span className="text-sm text-neutral-600 lg:hidden">{format(new Date(), 'MMM yyy')}</span>
            </div>
            <div className="flex justify-end gap-2">
              <Button id="primary-cta" variant={'primary'} asChild className="relative z-10 flex w-min items-center gap-1 px-2 py-1 pl-3">
                <Link href={`/posts/`}>
                  Writeup <PlusIcon className="size-4 shrink-0" />
                </Link>
              </Button>

              <Button variant={'primary'} asChild className="relative z-10 flex w-min items-center gap-1 px-2 py-1 pl-2.5">
                <Link href={''} target="_blank" rel="noopener noreferrer">
                  <ExternalLinkIcon className="size-4 shrink-0" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
