'use client'

import { cn } from '@/lib/utils'
import { motion, useMotionTemplate, useScroll, useTransform } from 'motion/react'
import { useViewportHeight } from './use-viewport-height'

export const BlurOverlay = () => {
  const height = useViewportHeight()

  const { scrollY } = useScroll()
  const start = height * 0.75
  const end = height

  const blurAmount = useTransform(scrollY, [start, end], [0, 64])

  return (
    <motion.div
      className={cn(
        "pointer-events-none fixed inset-0 bg-[#0c0c0c]/0 before:pointer-events-none before:absolute before:inset-0 before:bg-[url('/grain.png')] before:bg-repeat before:opacity-[3%]",
      )}
      style={{ backdropFilter: useMotionTemplate`blur(${blurAmount}px)` }}
    />
  )
}
