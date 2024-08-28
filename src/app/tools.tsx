"use client"

import { isOnScreen } from "@/lib/is-on-screen"
import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export type Tool = {
  name: string
  thumbnail: string
  description: string
  url: string
  tags: string[]
}

export const Tools = ({ tools }: { tools: Tool[] }) => {
  const ref = useRef<HTMLUListElement>(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current && isOnScreen(ref.current) && !hovering) {
        console.log("scroll")
        ref.current.scrollBy({ left: 70, behavior: "smooth" })
      }
    }, 1500)

    return () => clearInterval(interval)
  }, [hovering])

  return (
    <ul
      ref={ref}
      className="relative mx-auto flex w-full max-w-5xl gap-3 overflow-scroll px-8 scrollbar-none [mask:linear-gradient(to_right,rgba(255,255,255,0)_0%,rgba(255,255,255,1)_12.5%,rgba(255,255,255,1)_87.5%,rgba(255,255,255,0)_100%)]"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseOver={() => {
        if (!hovering) setHovering(true)
      }}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => (
        <ToolsList key={x} tools={tools} />
      ))}
    </ul>
  )
}

const ToolsList = ({ tools }: { tools: Tool[] }) => {
  return (
    <>
      <div className="mt-5 flex flex-col gap-3">
        <Bauble tool={tools[0]} />
        <Bauble tool={tools[1]} />
      </div>
      <div className="mt-1 flex flex-col gap-3">
        <Bauble tool={tools[2]} />
        <Bauble tool={tools[3]} />
      </div>
      <div className="mt-7 flex flex-col gap-3">
        <Bauble tool={tools[4]} />
        <Bauble tool={tools[5]} />
      </div>
      <div className="mt-3 flex flex-col gap-3">
        <Bauble tool={tools[6]} />
        <Bauble tool={tools[7]} />
      </div>
      <div className="mt-8 flex flex-col gap-3">
        <Bauble tool={tools[8]} />
        <Bauble tool={tools[9]} />
      </div>
      <div className="mt-1 flex flex-col gap-3">
        <Bauble tool={tools[10]} />
        <Bauble tool={tools[11]} />
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <Bauble tool={tools[12]} />
        <Bauble tool={tools[13]} />
      </div>
    </>
  )
}

const Bauble = ({ tool }: { tool: Tool }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0.9 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: false, margin: "9999px -300px" }}
      className="grid size-14 snap-center place-items-center rounded-xl border border-[#1F1F1F] bg-[#0A0A0B] px-3  shadow-sm"
    >
      <Image src={tool.thumbnail} alt={tool.name} width={32} height={32} className="size-8 grayscale-[0%]" />
    </motion.div>
  )
}
