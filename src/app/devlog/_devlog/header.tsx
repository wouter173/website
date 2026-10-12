'use client'

import { useQuery } from '@tanstack/react-query'
import { Composer } from './composer/composer'
import { atprotoAuthQueryOptions } from './atproto/atproto-client'
import { LoginDialog } from './login-dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { ChevronDownIcon, PlusIcon, RssIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useDevlogScrollVisibility } from './scroll-context'
import { CONSTANTS } from '@/app/constants'

const BSKY_URL = 'https://bsky.app/profile/wouterdb.com'
const RSS_URL = `${CONSTANTS.canonicalUrl}/devlog/rss.xml`

export function Header({ hideUntilPositioned = true }: { hideUntilPositioned?: boolean }) {
  const { pending } = useDevlogScrollVisibility()
  const { data } = useQuery(atprotoAuthQueryOptions)
  const [visible, setVisible] = useState<boolean>()
  const [composerKey, setComposerKey] = useState(0)

  return (
    <div data-devlog-header data-devlog-near-top={!hideUntilPositioned || undefined} style={{ visibility: pending ? 'hidden' : undefined }}>
      <div className="mx-auto flex max-w-xl items-center gap-1.5">
        <h1 className="text-label mr-auto font-serif text-4xl font-bold dark:text-neutral-200">Devlog</h1>

        <Button className="size-7 p-1.5" asChild>
          <a href={RSS_URL} rel="noopener noreferrer" target="_blank">
            <RssIcon />
          </a>
        </Button>

        <Button className="size-7 p-1.5" asChild>
          <a href={BSKY_URL} rel="noopener noreferrer" target="_blank">
            <svg fill="none" viewBox="0 0 64 57" width="28" style={{ width: '28px', height: '24.9375px' }}>
              <path
                fill="currentColor"
                d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805ZM50.127 3.805C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745Z"
              />
            </svg>
          </a>
        </Button>

        {data?.writer ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Button className="mt-1 size-7 p-1.25" onClick={() => setVisible(!visible)}>
              {visible ? <ChevronDownIcon /> : <PlusIcon />}
            </Button>
          </motion.div>
        ) : null}
      </div>

      {visible ? (
        <div className="mx-auto mt-8 flex max-w-xl flex-col items-center justify-center">
          <Composer key={composerKey} onSuccess={() => setComposerKey((k) => k + 1)} />
        </div>
      ) : null}

      <LoginDialog />
    </div>
  )
}
