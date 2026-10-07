'use client'
import { DateTime } from 'effect'
import type { postSchema } from './schema'

export function JournalPost({ post }: { post: typeof postSchema.Type }) {
  return (
    <article className="flex flex-col gap-2 p-2">
      <p className="text-white">Welcome to my echo chamber</p>
      <footer className="flex items-center gap-2 text-xs text-neutral-400/80">
        <div>
          <span>#{post.topic}</span>
        </div>
        <div className="block size-1 bg-neutral-400"></div>
        <div>
          <time>Yesterday</time>
        </div>
        <div className="block size-1 bg-neutral-400"></div>
        <div>
          <span>Sent from my Mac</span>
        </div>
      </footer>
    </article>
  )
}

export function JournalPostList() {
  return (
    <ul className="w-full">
      <li className="rounded-2xl border border-neutral-800 bg-neutral-900 p-2">
        <JournalPost
          post={{
            topic: 'Topic',
            content: { text: 'hello' },
            createdAt: DateTime.nowUnsafe(),
            latest: true,
          }}
        />
      </li>
      <li className="border-b border-b-neutral-800 py-4">
        <JournalPost
          post={{
            topic: 'Topic',
            content: { text: 'hello' },
            createdAt: DateTime.nowUnsafe(),
            latest: true,
          }}
        />
      </li>
      <li className="border-b border-b-neutral-800 py-4">
        <JournalPost
          post={{
            topic: 'Topic',
            content: { text: 'hello' },
            createdAt: DateTime.nowUnsafe(),
            latest: true,
          }}
        />
      </li>
    </ul>
  )
}
