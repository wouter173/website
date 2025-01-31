"use client"

import { ChevronDown } from "lucide-react"
import { Link as ViewTransitionLink } from "next-view-transitions"
import { usePathname } from "next/navigation"

import type { Post } from "@/server/posts"
import { format } from "date-fns"
import { motion, useMotionValueEvent, useScroll } from "motion/react"
import { NavigationMenu } from "radix-ui"
import { useState } from "react"
import { Logo } from "./logo"

const links = {
  work: "/work",
  home: "/",
}

export const Nav = ({ posts }: { posts: Post[] }) => {
  const pathname = usePathname()
  const keys = Object.keys(links) as (keyof typeof links)[]

  const currentPath = keys.find((key) => pathname.startsWith(links[key]))

  const [value, setValue] = useState<string>()
  const [hovering, setHovering] = useState<keyof typeof links | null>(null)

  const activeTab = value ? value : hovering ? hovering : currentPath

  const { scrollY } = useScroll()
  const [logoVisible, setLogoVisible] = useState(true)

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!logoVisible && latest < 600) setLogoVisible(true)
    if (logoVisible && latest > 600) setLogoVisible(false)
  })

  // const showLogo = pathname === "/" ? !logoVisible : true

  console.log(activeTab)

  return (
    <div className="sticky top-6 z-30 mx-auto h-0 pt-0 lg:top-16" onMouseLeave={() => setHovering(null)}>
      <NavigationMenu.Root className="pointer-events-none relative flex w-screen justify-center" value={value} onValueChange={setValue}>
        <NavigationMenu.List className="pointer-events-auto mx-auto flex h-12.5 w-fit max-w-4xl items-center justify-center rounded-full border border-white/7 bg-black/30 backdrop-blur-[8px]">
          {/* home */}
          <NavigationMenu.Item
            value="home"
            className="flex h-12.5 items-center px-3 py-1 lg:pr-6"
            onMouseEnter={() => setHovering("home")}
            onMouseLeave={() => setHovering(null)}
          >
            <NavigationMenu.Link asChild>
              <ViewTransitionLink
                href="/"
                className="relative z-20 rounded-full px-2 py-1 text-sm font-semibold text-white/50 transition-all"
              >
                <div className="absolute inset-0 -mx-2 -my-2"></div>
                {activeTab === "home" && <ActiveTab />}
                <span>Home</span>
              </ViewTransitionLink>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          {/* logo */}
          {/* <AnimatePresence>
            <motion.div
              initial={{ scale: 0, width: "0px" }}
              animate={{ scale: 1, width: "auto" }}
              exit={{ scale: 0, width: "0px" }}
              className="flex items-center justify-center"
            > */}
          <NavigationMenu.Item className="h-full py-1">
            <NavigationMenu.Link asChild>
              <ViewTransitionLink href={"/"}>
                <Logo />
              </ViewTransitionLink>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          {/* </motion.div> */}
          {/* </AnimatePresence> */}
          {/* work mobile */}
          <NavigationMenu.Item
            value="work"
            className="flex h-12.5 items-center px-3 py-1 lg:hidden"
            onMouseEnter={() => setHovering("work")}
            onMouseLeave={() => setHovering(null)}
          >
            <NavigationMenu.Link asChild>
              <ViewTransitionLink
                href="/work"
                className="relative z-20 rounded-full px-2 py-1 text-sm font-semibold text-white/50 transition-all"
              >
                <div className="absolute inset-0 -mx-2 -my-2"></div>
                {activeTab === "work" && <ActiveTab />}
                <span>Work</span>
              </ViewTransitionLink>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          {/* work desktop */}
          <NavigationMenu.Item value="work" className="hidden lg:block">
            <NavigationMenu.Trigger className="group h-12.5 py-1 pr-3 pl-2">
              <div className="relative z-20 flex items-center gap-1 rounded-full px-2 py-1 text-sm font-semibold text-white/50 transition-all">
                <span>Work</span>
                <ChevronDown
                  className="relative top-px size-4 stroke-[2.5] transition-all group-data-[state=open]:-rotate-180"
                  aria-hidden
                />
                {activeTab === "work" && <ActiveTab />}
              </div>
            </NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <ul className="grid grid-cols-1 gap-2">
                {posts.slice(0, 2).map((post) => (
                  <li key={post.slug}>
                    <ViewTransitionLink
                      href={"/work/" + post.slug}
                      className="block w-max max-w-72 rounded-lg bg-white/0 p-3 text-white transition-all hover:bg-white/10"
                    >
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center gap-2">
                          {post.metadata.title}
                          {post.metadata.publishedAt ? (
                            <span className="text-sm text-neutral-500">{format(post.metadata.publishedAt, "yyyy")}</span>
                          ) : null}
                        </div>

                        {post.metadata.summary ? (
                          <span className="line-clamp-2 text-sm text-neutral-400"> {post.metadata.summary}</span>
                        ) : null}
                      </div>
                    </ViewTransitionLink>
                  </li>
                ))}
              </ul>
              <ViewTransitionLink
                className="mt-2 flex w-full items-center justify-center rounded-lg bg-white/5 py-3 text-white transition-all hover:bg-white/10"
                href="/work"
              >
                See all
              </ViewTransitionLink>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Indicator className="data-[state=visible]:animate-fade-in data-[state=hidden]:animate-fade-out relative top-full z-40 flex h-[11px] items-end justify-center overflow-hidden transition-all">
            <div className="relative top-[70%] z-40 size-3 rotate-45 rounded-tl-xs border border-[#1F1F1F] bg-[#0A0A0B]" />
          </NavigationMenu.Indicator>
        </NavigationMenu.List>

        <div className="pointer-events-auto absolute top-full left-0 flex w-full justify-center">
          <NavigationMenu.Viewport className="data-[state=closed]:animate-scale-out data-[state=open]:animate-scale-in relative mt-2.5 w-full min-w-3xs origin-[top_center] overflow-hidden rounded-2xl border border-[#1F1F1F] bg-[#0A0A0B] p-2 transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)+1px]" />
        </div>
      </NavigationMenu.Root>
    </div>
  )
}

const ActiveTab = () => (
  <>
    <motion.span
      layoutId="knob"
      className="absolute inset-0 -z-10 hidden rounded-full bg-white/10 lg:block"
      transition={{ duration: 0.3, ease: "circOut" }}
    />
    <span className="absolute inset-0 -z-10 rounded-full bg-white/10 [view-transition-name:knob] lg:hidden"></span>
  </>
)
