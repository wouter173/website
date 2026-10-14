'use client'

import { isOnScreen } from '@/lib/is-on-screen'
import { easeInOut, motion, useAnimationControls, useScroll, useTransform } from 'motion/react'
import { useEffect, useLayoutEffect, useRef, useState, type JSX, type RefObject } from 'react'

export type Tool = {
  name: string
  thumbnail: string
  description: string | JSX.Element
  url: string
  tags: string[]
}

function wrapToolbelt(list: HTMLUListElement, pairCount: number) {
  const first = list.children.item(0)
  const repeated = list.children.item(pairCount)
  if (!first || !repeated) return

  const cycleWidth = repeated.getBoundingClientRect().left - first.getBoundingClientRect().left

  if (cycleWidth <= 0) return

  if (list.scrollLeft < cycleWidth) {
    list.scrollLeft += cycleWidth
  } else if (list.scrollLeft >= cycleWidth * 2) {
    list.scrollLeft -= cycleWidth
  }
}

export const Toolbelt = ({ tools }: { tools: Tool[] }) => {
  const ref = useRef<HTMLUListElement>(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current && isOnScreen(ref.current) && !hovering) ref.current.scrollBy({ left: 70, behavior: 'smooth' })
    }, 1500)

    return () => clearInterval(interval)
  }, [hovering])

  useLayoutEffect(() => {
    if (ref.current) wrapToolbelt(ref.current, Math.floor(tools.length / 2))
  }, [tools.length])

  return (
    <ul
      tabIndex={-1}
      ref={ref}
      className="relative mx-auto flex w-full max-w-5xl scrollbar-none gap-3 overflow-scroll px-8 py-1 [mask:linear-gradient(to_right,rgba(255,255,255,0)_0%,rgba(255,255,255,1)_12.5%,rgba(255,255,255,1)_87.5%,rgba(255,255,255,0)_100%)]"
      aria-hidden="true"
      onScroll={(event) => wrapToolbelt(event.currentTarget, Math.floor(tools.length / 2))}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseOver={() => {
        if (!hovering) setHovering(true)
      }}
    >
      {[1, 2, 3, 4].map(() =>
        Array(Math.floor(tools.length / 2))
          .fill(null)
          .map((_, i) => <ToolPair key={i} tool1={tools[i * 2]} tool2={tools[i * 2 + 1]} index={i} containerRef={ref} />),
      )}
    </ul>
  )
}

const ToolPair = ({
  tool1,
  tool2,
  index,
  containerRef,
}: {
  tool1: Tool
  tool2: Tool
  index: number
  containerRef: RefObject<HTMLElement | null>
}) => {
  const yOffsets = [16, 0, 28, 12, 32, 4, 24, 16, 28]
  const yRef = useRef(0)

  const controls = useAnimationControls()

  useEffect(() => {
    const delays = [0.9, 0.1, 1.1, 0.2, 0.95, 0.1, 1, 0]

    controls.start({
      y: [-2, 2],
      transition: {
        delay: 2 * delays[index % delays.length],
        duration: 2,
        repeat: Infinity,
        repeatDelay: 0.2,
        repeatType: 'reverse',
        ease: easeInOut,
      },
    })
  }, [controls, index])

  return (
    <motion.li
      key={index}
      className="flex flex-col gap-3"
      onUpdate={(latest) => (yRef.current = +latest.y)}
      animate={controls}
      style={{ marginTop: yOffsets[index % yOffsets.length] }}
    >
      <Bauble tool={tool1} containerRef={containerRef} />
      <Bauble tool={tool2} containerRef={containerRef} />
    </motion.li>
  )
}

const Bauble = ({ tool, containerRef }: { tool: Tool; containerRef: RefObject<HTMLElement | null> }) => {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollXProgress } = useScroll({
    container: containerRef,
    target: ref,
    axis: 'x',
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollXProgress, [0, 0.125, 0.875, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={ref}
      initial={false}
      style={{ scale }}
      className="border-stroke dark:bg-graphite grid size-14 snap-center place-items-center rounded-xl border bg-white px-2.5 shadow-xs hover:bg-neutral-50 dark:border-[#1F1F1F]"
    >
      <span className="block size-8 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url("${tool.thumbnail}")` }} />
    </motion.div>
  )
}
