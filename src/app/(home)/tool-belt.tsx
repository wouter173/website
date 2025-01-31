"use client"

import { isOnScreen } from "@/lib/is-on-screen"
import { motion, useAnimationControls } from "motion/react"
import Image from "next/image"
import { Tooltip } from "radix-ui"
import { useEffect, useRef, useState, type JSX, type PropsWithChildren } from "react"

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
      className="scrollbar-none relative mx-auto flex w-full max-w-5xl gap-3 overflow-scroll px-8 py-1 [mask:linear-gradient(to_right,rgba(255,255,255,0)_0%,rgba(255,255,255,1)_12.5%,rgba(255,255,255,1)_87.5%,rgba(255,255,255,0)_100%)]"
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
      className="scrollbar-none pointer-events-none relative mx-auto flex w-full max-w-5xl gap-3 overflow-scroll px-8 py-8 [mask:linear-gradient(to_right,rgba(255,255,255,0)_0%,rgba(255,255,255,1)_12.5%,rgba(255,255,255,1)_87.5%,rgba(255,255,255,0)_100%)]"
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => (
        <ToolsList key={x} tools={tools} mobile />
      ))}
    </ul>
  )
}

const ToolsList = ({ tools }: { tools: Tool[]; mobile?: boolean }) => {
  return (
    <>
      {Array(Math.floor(tools.length / 2))
        .fill(null)
        .map((_, i) => (
          <ToolPair key={i} tool1={tools[i * 2]} tool2={tools[i * 2 + 1]} index={i} />
        ))}
    </>
  )
}

const ToolPair = ({ tool1, tool2, index, mobile }: { tool1: Tool; tool2: Tool; index: number; mobile?: boolean }) => {
  const yOffsets = [16, 0, 28, 12, 32, 4, 24, 4, 28]
  const yRef = useRef(0)

  const controls = useAnimationControls()

  useEffect(() => {
    const delays = [0.5, 0, 0.875, 0.375, 0.9, 0.125, 0.7]

    controls.start({
      y: [-2, 2],
      transition: {
        delay: 2 * delays[index % delays.length],
        duration: 2,
        repeat: Infinity,
        repeatDelay: 0.2,
        repeatType: "reverse",
      },
    })
  }, [controls, index])

  return (
    <motion.li
      key={index}
      className="flex flex-col gap-3"
      onUpdate={(latest) => (yRef.current = +latest.y)}
      onHoverStart={() => {
        controls.start({
          y: yRef.current,
        })
      }}
      onHoverEnd={() => {
        controls.start({
          y: [yRef.current, -2, 2],
          transition: {
            duration: 2,
            repeat: Infinity,
            repeatDelay: 0.2,
            repeatType: "reverse",
          },
        })
      }}
      animate={controls}
      style={{ marginTop: yOffsets[index % yOffsets.length] }}
    >
      <Bauble tool={tool1} mobile={mobile} />
      <Bauble tool={tool2} mobile={mobile} />
    </motion.li>
  )
}

const Bauble = ({ tool }: { tool: Tool; mobile?: boolean }) => {
  return (
    <InfoTooltip description={tool.description} title={tool.name} thumbnail={tool.thumbnail}>
      <motion.div
        transition={{ duration: 0.2 }}
        initial={{ scale: 0, opacity: 0.9 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false }}
        className="grid size-14 snap-center place-items-center rounded-xl border border-[#1F1F1F] bg-[#0A0A0B] px-2.5 shadow-xs hover:bg-neutral-900"
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
            className="data-[state=delayed-open]:data-[side=top]:animate-slide-up-and-fade z-50 max-w-96 rounded-xl border border-[#1F1F1F] bg-[#0A0A0B] px-6 py-4 shadow-xs"
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
