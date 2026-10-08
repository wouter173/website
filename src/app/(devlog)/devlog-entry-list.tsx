import { cn } from '@/lib/utils'
import { DevlogEntry } from './devlog-entry'
import { getDevlogPosts } from './devlog-atproto'
import { Composer } from './composer'

export async function DevlogEntryList(props: { highlighted?: string }) {
  'use cache'

  const result = await getDevlogPosts()
  const highlighted = props.highlighted ?? result.body.records.at(0)?.cid

  return (
    <>
      <div className="w-full">
        <Composer />
      </div>
      <ul className="h-full w-full">
        {result.body.records.map((post) => {
          console.log(post)
          return (
            <li
              key={post.cid}
              className={cn(
                'relative my-4 p-2 first:mt-0 last:mb-0',
                highlighted === post.cid ? '-mx-px rounded-2xl border border-neutral-800 bg-black' : 'border-y border-neutral-800',
              )}
            >
              <DevlogEntry
                post={{
                  topic: '',
                  content: { text: post.value.text! as string },
                  createdAt: post.value.createdAt! as string,
                }}
              />
            </li>
          )
        })}
      </ul>
    </>
  )
}
