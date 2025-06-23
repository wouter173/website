'use client'

import { motion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { Logo } from './logo'

import { cn } from '@/lib/utils'
import { InstantLink } from './instant-link'

export function Nav() {
  const pathname = usePathname()

  return (
    <motion.nav layoutRoot className="relative z-20 mx-auto max-w-4xl px-6 pt-6 lg:px-0 lg:pt-16">
      <div className="flex w-min items-center rounded-full contain-layout">
        <InstantLink href="/" className="relative pr-3">
          <Logo className="relative" />
        </InstantLink>
        <InstantLink href="/" className="group relative px-3">
          {pathname === '/' && (
            <motion.div
              transition={{ duration: 0.15, ease: 'circOut' }}
              layoutId="active-tab"
              className="absolute inset-x-0 top-1/2 -z-10 h-7 -translate-y-1/2 rounded-full border border-neutral-200 bg-neutral-100 dark:-inset-x-0.5 dark:h-8 dark:border-[#1f1f1f] dark:bg-black"
            />
          )}
          <span
            className={cn(
              'relative z-20 text-sm font-medium transition-all group-hover:opacity-70 dark:text-neutral-300',
              pathname === '/' && 'text-white dark:text-white',
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
              className="absolute inset-x-0 top-1/2 -z-10 h-7 -translate-y-1/2 rounded-full border border-neutral-200 bg-neutral-100 dark:-inset-x-0.5 dark:h-8 dark:border-[#1f1f1f] dark:bg-black"
            />
          )}
          <span
            className={cn(
              'relative z-20 text-sm font-medium transition-all group-hover:opacity-70 dark:text-neutral-300',
              pathname === '/work' && 'text-white dark:text-white',
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
              className="absolute inset-x-0 top-1/2 -z-10 h-7 -translate-y-1/2 rounded-full border border-neutral-200 bg-neutral-100 dark:-inset-x-0.5 dark:h-8 dark:border-[#1f1f1f] dark:bg-black"
            />
          )}
          <span
            className={cn(
              'relative z-20 text-sm font-medium transition-all group-hover:opacity-70 dark:text-neutral-300',
              pathname === '/posts' && 'text-white dark:text-white',
            )}
          >
            Posts
          </span>
        </InstantLink>
      </div>
    </motion.nav>
  )
}
