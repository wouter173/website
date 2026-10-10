'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { postSchema } from './schema'
import { formatDistanceToNow } from 'date-fns'
import { ZoomIn } from '@/components/zoom-in'
import { Video } from '@/components/video'
import { LinkEmbed } from './composer/composer-link-embed'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getPdsPosts, getPdsWindow } from './get-pds-posts'
import { startTransition, useLayoutEffect, useRef, type PropsWithChildren } from 'react'
import Link from 'next/link'
import { Observer } from '@/components/intersection-observer'
import { useDevlogScrollVisibility } from './scroll-context'

type PageParam = { mode: 'around'; rkey: string } | { mode: 'page'; rkey?: string; reverse: boolean }

export function DevlogEntryList(props: { highlighted?: string; prefetchedPosts?: ReadonlyArray<typeof postSchema.Type> }) {
  const initialPageParam: PageParam = props.highlighted
    ? { mode: 'around', rkey: props.highlighted } //
    : { mode: 'page', reverse: false }

  const { data, fetchNextPage, fetchPreviousPage, hasNextPage, hasPreviousPage, isFetchingNextPage, isFetchingPreviousPage } =
    useInfiniteQuery({
      queryKey: ['pds', 'posts', props.highlighted ?? null],
      queryFn: async ({ pageParam }) => {
        if (pageParam.mode === 'around') return getPdsWindow(pageParam.rkey)
        const posts = await getPdsPosts({ rkey: pageParam.rkey, reverse: pageParam.reverse })
        return pageParam.reverse ? posts.toReversed() : posts
      },

      initialData:
        props.prefetchedPosts && !props.highlighted ? { pages: [props.prefetchedPosts], pageParams: [initialPageParam] } : undefined,
      initialPageParam,

      getNextPageParam: (lastPage): PageParam | undefined => {
        const rkey = lastPage.at(-1)?.rkey
        return rkey ? { mode: 'page', rkey, reverse: false } : undefined
      },
      getPreviousPageParam: (firstPage, _allPages, firstPageParam): PageParam | undefined => {
        if (firstPageParam.mode === 'page' && !firstPageParam.rkey) {
          return undefined
        }

        const rkey = firstPage.at(0)?.rkey
        const newestRkey = props.prefetchedPosts?.at(0)?.rkey

        if (!rkey || rkey === newestRkey) return undefined

        return { mode: 'page', rkey, reverse: true }
      },
    })

  const { pending, markReady } = useDevlogScrollVisibility()

  const pathname = usePathname()
  const posts = data?.pages.flat() ?? []
  const highlighted = pathname.startsWith('/devlog/') ? decodeURIComponent(pathname.slice('/devlog/'.length)) : posts[0]?.rkey

  const targetRef = useRef<HTMLLIElement>(null)
  const scrolledTo = useRef<string | undefined>(undefined)
  const listRef = useRef<HTMLUListElement>(null)

  useLayoutEffect(() => {
    const id = props.highlighted
    const initialPath = id ? `/devlog/${encodeURIComponent(id)}` : '/devlog'

    if (pathname !== initialPath) return
    if (!data || !targetRef.current) return
    if (!id) return markReady(pathname)

    if (scrolledTo.current !== id) {
      if (data.pages.flat()[0]?.rkey === id) {
        window.scrollTo({ top: 0, behavior: 'instant' })
      } else {
        targetRef.current.scrollIntoView({ block: 'center', behavior: 'instant' })
      }

      scrolledTo.current = id
    }

    markReady(pathname)
  }, [props.highlighted, data, pathname, markReady])

  const heightBeforePrepend = useRef<number | null>(null)

  async function loadNewer() {
    if (!listRef.current || heightBeforePrepend.current !== null) return

    heightBeforePrepend.current = listRef.current.getBoundingClientRect().height
    const result = await fetchPreviousPage()

    if (result.isError) heightBeforePrepend.current = null
  }

  useLayoutEffect(() => {
    const previousHeight = heightBeforePrepend.current
    if (previousHeight === null || !listRef.current) return

    const addedHeight = listRef.current.getBoundingClientRect().height - previousHeight
    heightBeforePrepend.current = null

    window.scrollBy({ top: addedHeight, behavior: 'instant' })
  }, [data])

  return (
    <div className="mx-auto mt-8 flex max-w-xl flex-col items-center justify-center" style={{ visibility: pending ? 'hidden' : undefined }}>
      <Observer
        rootMargin="300px 0px 0px 0px"
        callback={() => {
          if (!pending && hasPreviousPage && !isFetchingPreviousPage) loadNewer()
        }}
      />
      <ul
        ref={listRef}
        className="h-full w-full"
        style={{
          overflowAnchor: 'none',
        }}
      >
        {data &&
          data.pages.flat().map((post) => (
            <li
              ref={post.rkey === props.highlighted ? targetRef : undefined}
              key={post.rkey}
              data-devlog-rkey={post.rkey}
              className={cn(
                'relative my-4 border-neutral-200 p-2 first:mt-0 last:mb-0 dark:border-neutral-800',
                highlighted === post.rkey ? '-mx-px rounded-2xl border bg-white dark:bg-black' : 'border-y',
              )}
            >
              <DevlogEntry post={post} />
            </li>
          ))}
      </ul>
      <Observer
        rootMargin="0px 0px 500px 0px"
        callback={() => {
          if (!pending && hasNextPage && !isFetchingNextPage) fetchNextPage()
        }}
      />
    </div>
  )
}

function DevlogEntry({ post }: { post: typeof postSchema.Type }) {
  return (
    <article className="flex flex-col gap-2 p-2">
      <div className="flex items-center gap-2 text-sm dark:text-neutral-400/80">
        <h2 className="text-label font-semibold dark:text-neutral-100">Me</h2>
        <div className="block size-1 bg-neutral-400"></div>
        <div>
          <DevlogPostLink rkey={post.rkey}>
            <time>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</time>
          </DevlogPostLink>
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
            <div key={index} style={{ gridArea: ['a', 'b', 'c', 'd'][index] }}>
              <ZoomIn.Root>
                <ZoomIn.Trigger className="h-full w-full">
                  <img //eslint-disable-line
                    src={image.url}
                    alt=""
                    className="h-full max-h-none w-full max-w-none rounded-xl border border-neutral-200 bg-white object-cover dark:border-[#1f1f1f] dark:bg-black"
                    width={image.aspectRatio?.width}
                    height={image.aspectRatio?.height}
                  />
                </ZoomIn.Trigger>
                <ZoomIn.Content>
                  <img //eslint-disable-line
                    src={image.url}
                    alt=""
                    style={{ aspectRatio: `${image.aspectRatio?.width} / ${image.aspectRatio?.height}` }}
                    className="block h-auto max-h-[calc(100dvh-200px)] w-auto max-w-[min(64rem,100dvw)] rounded-xl border border-neutral-200 bg-white object-cover dark:border-[#1f1f1f] dark:bg-black"
                  />
                </ZoomIn.Content>
              </ZoomIn.Root>
            </div>
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
    </article>
  )
}

export function DevlogPostLink({ rkey, children }: PropsWithChildren<{ rkey: string }>) {
  const { markReady } = useDevlogScrollVisibility()
  const href = `/devlog/${encodeURIComponent(rkey)}` as const

  return (
    <Link
      href={href}
      prefetch={false}
      scroll={false}
      onNavigate={(event) => {
        event.preventDefault()

        startTransition(() => {
          markReady(href)
          window.history.pushState({ devlogShallow: true }, '', href)
        })
      }}
    >
      {children}
    </Link>
  )
}
