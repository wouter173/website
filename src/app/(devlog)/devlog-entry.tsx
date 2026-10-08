'use client'

import type { postSchema } from './schema'

export function DevlogEntry({ post }: { post: typeof postSchema.Type }) {
  return (
    <article className="flex flex-col gap-2 p-2">
      <div className="flex items-center gap-2 text-sm text-neutral-400/80">
        <h2 className="font-semibold text-neutral-100">Me</h2>
        <div className="block size-1 bg-neutral-400"></div>
        <div>
          <time>Yesterday</time>
        </div>
        <div className="block size-1 bg-neutral-400"></div>
        <div>
          <span>#{post.topic}</span>
        </div>
      </div>
      <p className="text-sm text-neutral-100">Welcome to my echo chamber</p>
    </article>
  )
}
