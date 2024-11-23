"use client"

import { isOnScreen } from "@/lib/is-on-screen"
import * as Tooltip from "@radix-ui/react-tooltip"
import { motion } from "motion/react"
import Image from "next/image"
import { PropsWithChildren, useEffect, useRef, useState, type JSX } from "react"

export type Tool = {
  name: string
  thumbnail: string
  description: string | JSX.Element
  url: string
  tags: string[]
}

export const Toolbelt = ({ tools }: { tools: Tool[] }) => {
  const ref = useRef<HTMLUListElement>(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current && isOnScreen(ref.current) && !hovering) {
        ref.current.scrollBy({ left: 70, behavior: "smooth" })
      }
    }, 1500)

    return () => clearInterval(interval)
  }, [hovering])

  return (
    <ul
      ref={ref}
      className="relative mx-auto flex w-full max-w-5xl  gap-3 overflow-scroll px-8 py-1 scrollbar-none [mask:linear-gradient(to_right,rgba(255,255,255,0)_0%,rgba(255,255,255,1)_12.5%,rgba(255,255,255,1)_87.5%,rgba(255,255,255,0)_100%)]"
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

export const MobileToolbelt = ({ tools }: { tools: Tool[] }) => {
  const ref = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current && isOnScreen(ref.current)) {
        ref.current.scrollBy({ left: 70, behavior: "smooth" })
      }
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return (
    <ul
      ref={ref}
      className="pointer-events-none relative mx-auto flex w-full max-w-5xl gap-3 overflow-scroll px-8  py-8 scrollbar-none [mask:linear-gradient(to_right,rgba(255,255,255,0)_0%,rgba(255,255,255,1)_12.5%,rgba(255,255,255,1)_87.5%,rgba(255,255,255,0)_100%)]"
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => (
        <ToolsList key={x} tools={tools} mobile />
      ))}
    </ul>
  )
}

const ToolsList = ({ tools, mobile }: { tools: Tool[]; mobile?: boolean }) => {
  const yOffsets = [16, 0, 28, 12, 32, 4, 24, 4, 28]
  const delays = [0.5, 0, 0.875, 0.375, 0.9, 0.125, 0.7]

  return (
    <>
      {Array(Math.floor(tools.length / 2))
        .fill(null)
        .map((_, i) => (
          <motion.li
            key={i}
            className="flex flex-col gap-3"
            animate={{
              y: [-2, 2],
              transition: {
                delay: 2 * delays[i % delays.length],
                duration: 2,
                repeat: Infinity,
                repeatDelay: 0.2,
                repeatType: "reverse",
              },
            }}
            style={{ marginTop: yOffsets[i % yOffsets.length] }}
          >
            <Bauble tool={tools[i * 2]} mobile={mobile} />
            <Bauble tool={tools[i * 2 + 1]} mobile={mobile} />
          </motion.li>
        ))}
    </>
  )
}

const Bauble = ({ tool, mobile }: { tool: Tool; mobile?: boolean }) => {
  return (
    <InfoTooltip description={tool.description} title={tool.name} thumbnail={tool.thumbnail}>
      <motion.div
        transition={{ duration: 0.2 }}
        initial={{ scale: 0, opacity: 0.9 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false, margin: mobile ? "9999px 0px" : "9999px -300px" }}
        className="grid size-14 snap-center place-items-center rounded-xl border border-[#1F1F1F] bg-[#0A0A0B] px-2.5  shadow-sm hover:bg-neutral-900"
      >
        <Image src={tool.thumbnail} alt={tool.name} width={32} height={32} className="size-8 grayscale-[0%]" />
      </motion.div>
    </InfoTooltip>
  )
}

const InfoTooltip = ({
  children,
  thumbnail,
  title,
  description,
}: PropsWithChildren & { thumbnail: string; title: string; description: string | JSX.Element }) => {
  return (
    <Tooltip.Provider delayDuration={100} skipDelayDuration={1000}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
            }}
          >
            {children}
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-50 max-w-96 rounded-xl border border-[#1F1F1F] bg-[#0A0A0B] px-6 py-4 shadow-sm data-[state=delayed-open]:data-[side=top]:animate-slideUpAndFade "
            sideOffset={5}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Image src={thumbnail} alt={""} width={32} height={32} className="size-8"></Image>
                <h2 className="text-white">{title}</h2>
              </div>
              <p className="text-neutral-400">{description}</p>
            </div>
            <Tooltip.Arrow className="fill-[#1F1F1F]" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
