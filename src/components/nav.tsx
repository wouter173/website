'use client'

import { Logo } from './logo'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'

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
              className="absolute inset-x-0 top-1/2 -z-10 h-7 -translate-y-1/2 rounded-full border border-neutral-200 bg-neutral-100"
            />
          )}
          <span className="relative z-20 text-sm font-medium transition-all group-hover:opacity-70">Home</span>
        </InstantLink>

        <InstantLink href={'/work'} className="group relative px-3">
          {pathname === '/work' && (
            <motion.div
              transition={{ duration: 0.15, ease: 'circOut' }}
              layoutId="active-tab"
              className="absolute inset-x-0 top-1/2 -z-10 h-7 -translate-y-1/2 rounded-full border border-neutral-200 bg-neutral-100"
            />
          )}
          <span className="relative z-20 text-sm font-medium transition-all group-hover:opacity-70">Work</span>
        </InstantLink>
        <InstantLink href={'/posts'} className="group relative px-3">
          {pathname.startsWith('/posts') && (
            <motion.div
              transition={{ duration: 0.15, ease: 'circOut' }}
              layoutId="active-tab"
              className="absolute inset-x-0 top-1/2 -z-10 h-7 -translate-y-1/2 rounded-full border border-neutral-200 bg-neutral-100"
            />
          )}
          <span className="relative z-20 text-sm font-medium transition-all group-hover:opacity-70">Posts</span>
        </InstantLink>
      </div>
    </motion.nav>
  )
}
