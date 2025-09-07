'use client'
import { cn } from '@/lib/utils'
import { useAnimate } from 'motion/react'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState, type ComponentProps } from 'react'

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
      <VideoChrome
        className={cn('absolute inset-0 h-full w-full object-cover', mounted && resolvedTheme === 'light' ? 'opacity-100' : 'opacity-0')}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
      >
        <source src={lightSrc} type="video/webm" />
      </VideoChrome>
      <VideoChrome
        className={cn('absolute inset-0 h-full w-full object-cover', mounted && resolvedTheme === 'dark' ? 'opacity-100' : 'opacity-0')}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
      >
        <source src={darkSrc} type="video/webm" />
      </VideoChrome>
    </div>
  )
}

const VideoChrome = ({ className, ...props }: { className?: string } & ComponentProps<'video'>) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [scope, animate] = useAnimate<HTMLProgressElement>()

  useEffect(() => {
    const controller = new AbortController()

    const onTimeUpdate = () => {
      if (!videoRef.current) return
      const progress = videoRef.current?.currentTime
      const duration = videoRef.current?.duration

      animate(scope.current, { scaleX: progress / duration }, { duration: 0.3, ease: 'linear' })
    }

    const onEnded = () => {
      if (props.loop && videoRef.current) {
        setTimeout(() => {
          animate(scope.current, { scaleX: 0 }, { duration: 0 })
          setTimeout(() => {
            videoRef.current?.play()
          }, 50)
        }, 300)
      }
    }

    if (videoRef.current) {
      videoRef.current.addEventListener('timeupdate', onTimeUpdate, { signal: controller.signal })
      videoRef.current.addEventListener('ended', onEnded, { signal: controller.signal })
    }

    return () => {
      controller.abort()
    }
  })

  return (
    <div className={cn(className)}>
      <progress
        ref={scope}
        className="absolute bottom-0 left-0 z-20 h-0.5 w-full origin-left bg-white mix-blend-difference ease-linear"
        style={{ transform: 'scaleX(0)' }}
      />
      <video ref={videoRef} className={className} {...props} loop={false} />
    </div>
  )
}
