"use client"

import Link from "next/link"
import { useState } from "react"
import { Logo } from "./logo"

export const Nav = () => {
  const [hovering, setHovering] = useState(false)

  return (
    <nav className="sticky top-16 z-30 mx-auto h-0 pt-0">
      <ul className="relative mx-auto flex max-w-4xl items-center justify-center gap-7">
        <li>
          <Link href={"/"} className="px-2 py-1 text-sm font-semibold text-white/40">
            Home
          </Link>
        </li>
        <li>
          <Logo />
        </li>
        <li>
          <Link href={"/blog"} className="px-2 py-1 text-sm font-semibold text-white/40">
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  )
}
