'use client'

import { usePathname } from 'next/navigation'
import { Logo } from './logo'
import { Link } from 'next-view-transitions'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const links = {
  home: '/',
  work: '/work',
}

export const Nav = () => {
  const pathname = usePathname()
  const keys = Object.keys(links) as (keyof typeof links)[]

  let activeTab = keys.find((key) => links[key].startsWith(pathname))

  return (
    <nav className="sticky top-16 z-30 mx-auto h-0 pt-0">
      <ul className="relative mx-auto flex max-w-4xl items-center justify-center gap-7 px-3 py-1 bg-black/0 backdrop-blur-[8px] w-fit rounded-full">
        <li>
          <NavLink name={'home'} activeTab={activeTab} />
        </li>
        <li>
          <Logo />
        </li>
        <li className="relative">
          <NavLink name={'work'} activeTab={activeTab} />
        </li>
      </ul>
    </nav>
  )
}

const NavLink = ({ name, activeTab }: { name: keyof typeof links; activeTab?: keyof typeof links }) => {
  return (
    <Link
      key={name}
      href={links[name]}
      className={cn(
        'relative z-20 rounded-full px-2 py-1 text-sm font-semibold text-white/50 transition-all',
        activeTab !== name && 'hover:text-white/30',
      )}
    >
      {activeTab === name && <span className="absolute inset-0 -z-10 rounded-full bg-white/10 [view-transition-name:knob]" />}
      <span className="capitalize">{name}</span>
    </Link>
  )
}
