import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Post } from '@/server/posts'
import { format } from 'date-fns'
import { ExternalLinkIcon, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { type ComponentProps } from 'react'

export const PostCard = ({ post, className, ...props }: { post: Post } & ComponentProps<'div'>) => {
  return (
    <article className={cn('group/card relative z-20 flex flex-col gap-6 rounded-2xl px-6 py-6 transition-all', className)} {...props}>
      <div className="bg-stroke absolute -inset-px -z-20 rounded-[17px] shadow-xs transition-all [clip-path:polygon(0_0,calc(100%-32px)_0,100%_32px,100%_100%,0_100%)] group-hover/card:[clip-path:polygon(0_0,calc(100%-40px)_0,100%_40px,100%_100%,0_100%)] dark:bg-[#1F1F1F] dark:shadow-2xl" />
      <div className="absolute inset-0 -z-10 rounded-2xl bg-white transition-all [clip-path:polygon(0_0,calc(100%-32px)_0,100%_32px,100%_100%,0_100%)] group-hover/card:[clip-path:polygon(0_0,calc(100%-40px)_0,100%_40px,100%_100%,0_100%)] dark:bg-black" />
      <div className="absolute top-0 right-0 -z-10 size-8 rounded-bl-lg bg-linear-to-tr from-white to-[#efeff1] shadow-lg transition-all [clip-path:polygon(-100%_0%,0%_0%,100%_100%,100%_200%,-100%_200%)] group-hover/card:size-10 dark:from-[#1F1F1F] dark:to-[#1F1F1F] dark:shadow-2xl" />
      <Link
        tabIndex={-1}
        className="peer/link absolute inset-0 transition-all [clip-path:polygon(0_0,calc(100%-32px)_0,100%_32px,100%_100%,0_100%)] group-hover/card:[clip-path:polygon(0_0,calc(100%-40px)_0,100%_40px,100%_100%,0_100%)]"
        href={`/posts/${post.slug}`}
      />
      <div className="-z-10 flex flex-col gap-3 pr-8">
        <div className="flex items-center gap-3">
          <h2 className="text-label text-2xl leading-tight font-semibold dark:text-neutral-300">{post.metadata.title}</h2>
        </div>
        <div className="relative pb-3">
          <p className="text leading-8 text-neutral-600 select-none dark:text-neutral-500">{post.metadata.summary}</p>
          <div className="absolute inset-0 -z-10 bg-[url('/line.png')] dark:opacity-15" />
        </div>
      </div>
      <div className="mt-auto flex justify-between peer-hover/link:[&_*#primary-cta]:outline-2">
        <div className="flex items-end gap-2">
          <span className="hidden text-sm text-neutral-600 lg:inline">
            {format(post.metadata.publishedAt, 'MMMM yyy')} - {post.metadata.type === 'blog' ? 'Blog' : 'Project'}
          </span>
          <span className="text-sm text-neutral-600 lg:hidden">
            {format(post.metadata.publishedAt, 'MMM yyy')} - {post.metadata.type === 'blog' ? 'Blog' : 'Project'}
          </span>
        </div>
        <div className="flex justify-end gap-2">
          <Button id="primary-cta" variant={'primary'} asChild className="relative z-10 flex w-min items-center gap-1 px-2 py-1 pl-3">
            <Link href={`/posts/${post.slug}`}>
              {post.metadata.type === 'blog' ? 'Read post' : 'Writeup'} <PlusIcon className="size-4 shrink-0" />
            </Link>
          </Button>
          {post.metadata.externalLink && (
            <Button variant={'primary'} asChild className="relative z-10 flex w-min items-center gap-1 px-2 py-1 pl-2.5">
              <Link href={post.metadata.externalLink} target="_blank" rel="noopener noreferrer">
                <ExternalLinkIcon className="size-4 shrink-0" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}
