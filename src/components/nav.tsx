'use client'

import { Moon, Sun } from 'lucide-react'
import { motion } from 'motion/react'
import { usePathname } from 'next/navigation'

import { Logo } from './logo'

import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { InstantLink } from './instant-link'

export function Nav() {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <motion.nav layoutRoot className="relative z-20 mx-auto max-w-4xl px-6 pt-6 lg:px-0 lg:pt-16">
      <div className="flex w-full items-center rounded-full contain-layout">
        <InstantLink href="/" className="relative pr-3">
          <Logo className="relative" />
        </InstantLink>
        <InstantLink href="/" className="group relative px-3">
          {pathname === '/' && (
            <motion.div
              transition={{ duration: 0.15, ease: 'circOut' }}
              layoutId="active-tab"
              className="dark:outline-echo absolute inset-x-0 top-1/2 -z-10 h-7 -translate-y-1/2 rounded-full border border-neutral-200 bg-neutral-100 dark:-inset-x-0.5 dark:h-8 dark:border-[#2d2d2d] dark:bg-[#171717] dark:text-neutral-200"
            />
          )}
          <span
            className={cn(
              'relative z-20 text-sm font-medium transition-all group-hover:opacity-70 dark:text-neutral-300',
              pathname === '/' && 'dark:text-white',
            )}
          >
            Home
          </span>
        </InstantLink>

        <InstantLink href={'/work'} className="group relative px-3">
          {pathname === '/work' && (
            <motion.div
              transition={{ duration: 0.15, ease: 'circOut' }}
              layoutId="active-tab"
              className="dark:outline-echo absolute inset-x-0 top-1/2 -z-10 h-7 -translate-y-1/2 rounded-full border border-neutral-200 bg-neutral-100 dark:-inset-x-0.5 dark:h-8 dark:border-[#2d2d2d] dark:bg-[#171717] dark:text-neutral-200"
            />
          )}
          <span
            className={cn(
              'relative z-20 text-sm font-medium transition-all group-hover:opacity-70 dark:text-neutral-300',
              pathname === '/work' && 'dark:text-white',
            )}
          >
            Work
          </span>
        </InstantLink>
        <InstantLink href={'/posts'} className="group relative px-3">
          {pathname.startsWith('/posts') && (
            <motion.div
              transition={{ duration: 0.15, ease: 'circOut' }}
              layoutId="active-tab"
              className="dark:outline-echo absolute inset-x-0 top-1/2 -z-10 h-7 -translate-y-1/2 rounded-full border border-neutral-200 bg-neutral-100 dark:-inset-x-0.5 dark:h-8 dark:border-[#2d2d2d] dark:bg-[#171717] dark:text-neutral-200"
            />
          )}
          <span
            className={cn(
              'relative z-20 text-sm font-medium transition-all group-hover:opacity-70 dark:text-neutral-300',
              pathname.startsWith('/posts') && 'dark:text-white',
            )}
          >
            Posts
          </span>
        </InstantLink>

        {mounted ? (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="ml-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full"
            type="button"
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="size-5 text-neutral-400 hover:text-neutral-200" />
            ) : (
              <Moon className="size-5 text-neutral-500 hover:text-neutral-800" />
            )}
          </motion.button>
        ) : (
          <div className="h-8 w-8" />
        )}
      </div>
    </motion.nav>
  )
}
