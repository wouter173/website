'use client'

import { Video } from '@/components/video'
import { LinkEmbed } from './composer-link-embed'
import type { postSchema } from './schema'
import { formatDistanceToNow } from 'date-fns'
import { cn } from '@/lib/utils'

export function DevlogEntry({ post }: { post: typeof postSchema.Type }) {
  return (
    <article className="flex flex-col gap-2 p-2">
      <div className="flex items-center gap-2 text-sm dark:text-neutral-400/80">
        <h2 className="text-label font-semibold dark:text-neutral-100">Me</h2>
        <div className="block size-1 bg-neutral-400"></div>
        <div>
          <time>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</time>
        </div>
        <div className="block size-1 bg-neutral-400"></div>
        <div>
          <span>#{post.topic}</span>
        </div>
      </div>
      <p className="text-label text-sm dark:text-neutral-100">{post.content.text}</p>
      {post.attachments?.type === 'images' && (
        <div
          className={cn(
            'grid grid-cols-2 grid-rows-2 gap-2',
            post.attachments.images.length === 1 ? '[grid-template-areas:"a_a"_"a_a"]' : '',
            post.attachments.images.length === 2 ? '[grid-template-areas:"a_b"_"a_b"]' : '',
            post.attachments.images.length === 3 ? '[grid-template-areas:"a_c"_"b_c"]' : '',
            post.attachments.images.length === 4 ? '[grid-template-areas:"a_b"_"c_d"]' : '',
          )}
        >
          {post.attachments.images.map((image, index) => (
            <img //eslint-disable-line
              key={index}
              src={image.url}
              alt=""
              className="h-full w-full rounded-xl border border-neutral-200 bg-white object-cover dark:border-[#1f1f1f] dark:bg-black"
              style={{ gridArea: ['a', 'b', 'c', 'd'][index] }}
              width={image.aspectRatio?.width}
              height={image.aspectRatio?.height}
            />
          ))}
        </div>
      )}
      {post.attachments?.type === 'video' && (
        <Video
          lightSrc={post.attachments.url}
          darkSrc={post.attachments.url}
          mimeType={post.attachments.mimeType}
          width={post.attachments.aspectRatio?.width + ''}
          height={post.attachments.aspectRatio?.height + ''}
          className="rounded-md"
        />
      )}
      {post.attachments?.type === 'embed' && (
        <div className="bg-white dark:bg-black">
          <LinkEmbed
            embed={{
              url: post.attachments.uri,
              title: post.attachments.title,
              description: post.attachments.description,
              siteName: post.attachments.uri,
              image: undefined,
            }}
          />
        </div>
      )}
      {/* <code>
        <pre>{JSON.stringify(post)}</pre>
      </code> */}
    </article>
  )
}
