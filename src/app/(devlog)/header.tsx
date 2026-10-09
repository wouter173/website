'use client'

import { useQuery } from '@tanstack/react-query'
import { Composer } from './composer'
import { atprotoAuthQueryOptions } from './devlog-atproto-auth'
import { LoginDialog } from './login-dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { ChevronDownIcon, PlusIcon } from 'lucide-react'
import { motion } from 'motion/react'

export function Header() {
  const { data } = useQuery(atprotoAuthQueryOptions)
  const [visible, setVisible] = useState<boolean>()

  return (
    <div>
      <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
        <h1 className="text-label font-serif text-4xl font-bold dark:text-neutral-200">Devlog</h1>
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
          <Composer />
        </div>
      ) : null}

      <LoginDialog />
    </div>
  )
}
