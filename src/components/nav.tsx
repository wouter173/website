'use client'

import { Logo } from './logo'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import Link from 'next/link'

export function Nav() {
  const pathname = usePathname()

  return (
    <motion.nav layoutRoot className="relative z-20 mx-auto max-w-4xl px-6 pt-6 lg:px-0 lg:pt-16">
      <div className="flex w-min items-center gap-6 rounded-full contain-layout">
        <Link href="/" className="relative">
          <Logo className="relative" />
        </Link>
        <Link href="/" className="relative">
          {pathname === '/' && (
            <motion.div
              layoutId="active-tab"
              className="absolute -inset-x-2 -inset-y-0.25 -z-10 rounded-full border border-neutral-200 bg-neutral-100"
            />
          )}
          <span className="relative z-20 text-sm font-medium">Home</span>
        </Link>

        <Link href={'/work'} className="relative">
          {pathname === '/work' && (
            <motion.div
              layoutId="active-tab"
              className="absolute -inset-x-2 -inset-y-0.25 -z-10 rounded-full border border-neutral-200 bg-neutral-100"
            />
          )}
          <span className="relative z-20 text-sm font-medium">Work</span>
        </Link>
        <Link href={'/posts'} className="relative">
          {pathname.startsWith('/posts') && (
            <motion.div
              layoutId="active-tab"
              className="absolute -inset-x-2 -inset-y-0.25 -z-10 rounded-full border border-neutral-200 bg-neutral-100"
            />
          )}
          <span className="relative z-20 text-sm font-medium">Posts</span>
        </Link>
      </div>
    </motion.nav>
  )
}
