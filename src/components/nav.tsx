"use client"

import { cn } from "@/lib/utils"
import { Link as ViewTransitionLink } from "next-view-transitions"
import { usePathname } from "next/navigation"
import { PropsWithChildren } from "react"
import { Logo } from "./logo"

const links = {
  work: "/work",
  home: "/",
}

export const Nav = () => {
  const pathname = usePathname()
  const keys = Object.keys(links) as (keyof typeof links)[]

  let activeTab = keys.find((key) => pathname.startsWith(links[key]))

  return (
    <nav className="sticky top-16 z-30 mx-auto h-0 pt-0">
      <ul className="relative mx-auto flex w-fit max-w-4xl items-center justify-center gap-7 rounded-full bg-black/30 px-3 py-1 backdrop-blur-[8px]">
        <li>
          <NavLink linkKey={"home"} activeTab={activeTab}>
            Home
          </NavLink>
        </li>
        <li>
          <Logo />
        </li>
        <li className="relative">
          <NavLink linkKey={"work"} activeTab={activeTab}>
            Work
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

const NavLink = ({ linkKey, activeTab, children }: PropsWithChildren & { linkKey: keyof typeof links; activeTab?: keyof typeof links }) => {
  return (
    <ViewTransitionLink
      key={linkKey}
      href={links[linkKey]}
      className={cn(
        "relative z-20 rounded-full px-2 py-1 text-sm font-semibold text-white/50 transition-all",
        activeTab !== linkKey && "hover:text-white/30",
      )}
    >
      <div className="absolute inset-0 -mx-2 -my-2"></div>
      {activeTab === linkKey && <span className="absolute inset-0 -z-10 rounded-full bg-white/10 [view-transition-name:knob]" />}
      <span>{children}</span>
    </ViewTransitionLink>
  )
}
