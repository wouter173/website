"use client"

import { cn } from "@/lib/utils"
import { Link as ViewTransitionLink } from "next-view-transitions"
import { usePathname } from "next/navigation"
import { Logo } from "./logo"

const links = {
  home: "/",
  work: "/work",
}

export const Nav = () => {
  const pathname = usePathname()
  const keys = Object.keys(links) as (keyof typeof links)[]

  let activeTab = keys.find((key) => links[key].startsWith(pathname))

  return (
    <nav className="sticky top-16 z-30 mx-auto h-0 pt-0">
      <ul className="relative mx-auto flex w-fit max-w-4xl items-center justify-center gap-7 rounded-full bg-black/0 px-3 py-1 backdrop-blur-[8px]">
        <li>
          <NavLink name={"home"} activeTab={activeTab} />
        </li>
        <li>
          <Logo />
        </li>
        <li className="relative">
          <NavLink name={"work"} activeTab={activeTab} />
        </li>
      </ul>
    </nav>
  )
}

const NavLink = ({ name, activeTab }: { name: keyof typeof links; activeTab?: keyof typeof links }) => {
  return (
    <ViewTransitionLink
      key={name}
      href={links[name]}
      className={cn(
        "relative z-20 rounded-full px-2 py-1 text-sm font-semibold text-white/50 transition-all",
        activeTab !== name && "hover:text-white/30",
      )}
    >
      {activeTab === name && <span className="absolute inset-0 -z-10 rounded-full bg-white/10 [view-transition-name:knob]" />}
      <span className="capitalize">{name}</span>
    </ViewTransitionLink>
  )
}
