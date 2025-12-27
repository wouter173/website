'use client'

import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ExternalLinkIcon, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import type { PropsWithChildren } from 'react'

export function ProjectCard({
  children,
  title,
  description,
  cta,
  externalLink,
  date,
}: PropsWithChildren & {
  title: string
  description: string
  cta?: { name: string; slug: string }
  externalLink?: string
  date: Date
}) {
  return (
    <div className="group relative w-full">
      <div className="absolute inset-0 top-4 -z-10 origin-bottom -skew-x-2 rounded-2xl border border-[#1E1E1E] bg-black shadow-lg transition-transform ease-in-out group-hover:-rotate-x-12 group-hover:-skew-x-4" />
      <div className="absolute top-0 right-0 left-0 h-1/2 w-full">{children}</div>
      <div className="relative z-10 origin-bottom transition-transform ease-in-out group-hover:rotate-x-6 group-hover:skew-x-2">
        <header className="relative -mb-2 w-fit min-w-40 rounded-2xl rounded-b-none border border-b-0 border-[#1E1E1E] bg-black px-6 pt-4">
          <h2 className="text-label text-xl leading-tight font-semibold [text-box-trim:trim-both] dark:text-neutral-300">{title}</h2>
          <div className="absolute bottom-[7px] left-full size-2 bg-black [clip-path:polygon(22%_55%,40%_73%,63%_88%,100%_100%,0_100%,0_0,10%_31%)]"></div>
          <div className="absolute bottom-[7px] left-full size-2 rounded-bl-full border-b border-l border-[#1E1E1E]"></div>
          <div className="absolute bottom-0 left-full size-[7px] bg-black"></div>
        </header>
        <section className="rounded-2xl rounded-tl-none border border-[#1E1E1E] bg-black px-6 pt-5 pb-6">
          <div className="mb-14">
            <p className="text-[15px] text-neutral-600 select-none dark:text-neutral-500">{description}</p>
          </div>
          <div className="mt-auto flex justify-between">
            <div className="flex items-end gap-2">
              <span className="hidden text-sm text-neutral-600 lg:inline">{format(date, 'MMMM yyy')}</span>
              <span className="text-sm text-neutral-600 lg:hidden">{format(date, 'MMM yyy')}</span>
            </div>
            <div className="flex justify-end gap-2">
              {cta ? (
                <Link
                  tabIndex={-1}
                  className="peer/link absolute inset-0 z-20 transition-all [clip-path:polygon(0_0,calc(100%-32px)_0,100%_32px,100%_100%,0_100%)] group-hover/card:[clip-path:polygon(0_0,calc(100%-40px)_0,100%_40px,100%_100%,0_100%)]"
                  href={`/projects/${cta.slug}`}
                />
              ) : null}

              {cta ? (
                <Button
                  id="primary-cta"
                  variant={'primary'}
                  asChild
                  className="relative z-30 flex w-min items-center gap-1 px-2 py-1 pl-3 peer-hover/link:outline-2"
                >
                  <Link href={`/projects/${cta.slug}`}>
                    {cta.name} <PlusIcon className="size-4 shrink-0" />
                  </Link>
                </Button>
              ) : null}

              {externalLink ? (
                <Button variant={'primary'} asChild className="relative z-30 flex w-min items-center gap-1 px-2 py-1 pl-2.5">
                  <Link href={externalLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLinkIcon className="size-4 shrink-0" />
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
