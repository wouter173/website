import { cn } from '@/lib/utils'
import type { Post } from '@/server/posts'
import { format } from 'date-fns'
import { ExternalLinkIcon, PlusIcon } from 'lucide-react'

import Link from 'next/link'
import type { ComponentProps } from 'react'
import { Button } from './ui/button'

export const PostCard = ({ post, className, ...props }: { post: Post } & ComponentProps<'div'>) => {
  return (
    <article className={cn('group relative z-20 flex flex-col gap-6 rounded-lg px-6 py-6 transition-all', className)} {...props}>
      <div className="bg-stroke absolute -inset-px -z-20 rounded-[9px] shadow-xs transition-all [clip-path:polygon(0_0,calc(100%-32px)_0,100%_32px,100%_100%,0_100%)] group-hover:[clip-path:polygon(0_0,calc(100%-40px)_0,100%_40px,100%_100%,0_100%)]" />
      <div className="absolute inset-0 -z-10 rounded-lg bg-white transition-all [clip-path:polygon(0_0,calc(100%-32px)_0,100%_32px,100%_100%,0_100%)] group-hover:[clip-path:polygon(0_0,calc(100%-40px)_0,100%_40px,100%_100%,0_100%)]" />
      <div className="absolute top-0 right-0 -z-10 size-8 rounded-bl-lg bg-linear-to-tr from-white to-[#efeff1] shadow-lg transition-all [clip-path:polygon(-100%_0%,0%_0%,100%_100%,100%_200%,-100%_200%)] group-hover:size-10" />
      <Link
        className="absolute inset-0 transition-all [clip-path:polygon(0_0,calc(100%-32px)_0,100%_32px,100%_100%,0_100%)] group-hover:[clip-path:polygon(0_0,calc(100%-40px)_0,100%_40px,100%_100%,0_100%)]"
        href={`/posts/${post.slug}`}
      />
      <div className="flex flex-col gap-3 pr-8">
        <div className="flex items-center gap-3">
          <h2 className="text-label text-2xl leading-tight font-semibold">{post.metadata.title}</h2>
        </div>
        <div className="relative pb-3">
          <p className="text leading-8 text-neutral-600">{post.metadata.summary}</p>
          <div className="absolute inset-0 -z-10 bg-[url('/line.png')]" />
        </div>
      </div>
      <div className="mt-auto flex justify-between">
        <div className="flex items-end gap-2">
          <span className="hidden text-sm text-neutral-600 lg:inline">
            {format(post.metadata.publishedAt, 'MMMM yyy')} - {post.metadata.type === 'blog' ? 'Blog' : 'Project'}
          </span>
          <span className="text-sm text-neutral-600 lg:hidden">
            {format(post.metadata.publishedAt, 'MMM yyy')} - {post.metadata.type === 'blog' ? 'Blog' : 'Project'}
          </span>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant={'primary'} asChild className="relative z-10 flex w-min items-center gap-1 px-2 py-1 pl-3">
            <Link href={`/posts/${post.slug}`}>
              {post.metadata.type === 'blog' ? 'Read post' : 'Writeup'} <PlusIcon className="size-4 shrink-0" />
            </Link>
          </Button>
          {post.metadata.externalLink && (
            <Button variant={'primary'} asChild className="relative z-10 flex w-min items-center gap-1 px-2 py-1 pl-3">
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
