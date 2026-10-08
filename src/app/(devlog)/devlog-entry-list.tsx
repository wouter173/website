import { cn } from '@/lib/utils'
import { DevlogEntry } from './devlog-entry'
import { getDevlogPosts } from './devlog-atproto'

export async function DevlogEntryList(props: { highlighted?: string }) {
  const entries = await getDevlogPosts()
  const highlighted = props.highlighted ?? entries.body.records.at(0)?.cid

  return (
    <ul className="h-full w-full">
      {/* {entries.map((post) => {
        return (
          <li
            key={post.id}
            className={cn(
              'relative my-4 p-2 first:mt-0 last:mb-0',
              highlighted === post.id ? '-mx-px rounded-2xl border border-neutral-800 bg-black' : 'border-y border-neutral-800',
            )}
          >
            <DevlogEntry post={post} />
          </li>
        )
      })}
       */}
      {entries.body.records.map((x) => JSON.stringify(x))}
    </ul>
  )
}
