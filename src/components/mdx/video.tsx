'use client'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function Video({
  darkSrc,
  lightSrc,
  width,
  height,
  className = '',
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
}: {
  darkSrc: string
  lightSrc: string
  width: string
  height: string
  className?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  playsInline?: boolean
}) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <div
      className={cn('relative aspect-video w-full overflow-hidden rounded-lg', className)}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <video
        className={cn('absolute inset-0 h-full w-full object-cover', mounted && resolvedTheme === 'light' ? 'opacity-100' : 'opacity-0')}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
      >
        <source src={lightSrc} type="video/webm" />
      </video>
      <video
        className={cn('absolute inset-0 h-full w-full object-cover', mounted && resolvedTheme === 'dark' ? 'opacity-100' : 'opacity-0')}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
      >
        <source src={darkSrc} type="video/webm" />
      </video>
    </div>
  )
}
