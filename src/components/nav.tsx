'use client'

import { Logo } from './logo'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import Link from 'next/link'

export function Nav() {
  const pathname = usePathname()

  return (
    <motion.nav layoutRoot className="relative z-20 mx-auto max-w-4xl px-6 pt-6 lg:px-0 lg:pt-16">
      <div className="flex w-min items-center rounded-full contain-layout">
        <Link href="/" className="relative pr-3">
          <Logo className="relative" />
        </Link>
        <Link href="/" className="group relative px-3">
          {pathname === '/' && (
            <motion.div
              layoutId="active-tab"
              className="absolute inset-x-0 top-1/2 -z-10 h-7 -translate-y-1/2 rounded-full border border-neutral-200 bg-neutral-100"
            />
          )}
          <span className="relative z-20 text-sm font-medium transition-all group-hover:opacity-70">Home</span>
        </Link>

        <Link href={'/work'} className="group relative px-3">
          {pathname === '/work' && (
            <motion.div
              layoutId="active-tab"
              className="absolute inset-x-0 top-1/2 -z-10 h-7 -translate-y-1/2 rounded-full border border-neutral-200 bg-neutral-100"
            />
          )}
          <span className="relative z-20 text-sm font-medium transition-all group-hover:opacity-70">Work</span>
        </Link>
        <Link href={'/posts'} className="group relative px-3">
          {pathname.startsWith('/posts') && (
            <motion.div
              layoutId="active-tab"
              className="absolute inset-x-0 top-1/2 -z-10 h-7 -translate-y-1/2 rounded-full border border-neutral-200 bg-neutral-100"
            />
          )}
          <span className="relative z-20 text-sm font-medium transition-all group-hover:opacity-70">Posts</span>
        </Link>
      </div>
    </motion.nav>
  )
}
