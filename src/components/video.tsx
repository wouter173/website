'use client'
import { cn } from '@/lib/utils'
import { useAnimate } from 'motion/react'
import { useTheme } from 'next-themes'
import { Activity, useRef, type ComponentProps } from 'react'
import { Observer } from './intersection-observer'
import { useIsMounted } from './use-is-mounted'

export function Video({
  darkSrc,
  lightSrc,
  width,
  height,
  className = '',
  mimeType = 'video/webm',
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
}: {
  darkSrc: string
  lightSrc: string
  width?: string
  height?: string
  className?: string
  mimeType?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  playsInline?: boolean
}) {
  const { resolvedTheme } = useTheme()
  const isMounted = useIsMounted()

  return (
    <div
      className={cn('relative aspect-video w-full overflow-hidden border border-neutral-200 dark:border-[#1f1f1f]', className)}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <Activity mode={isMounted && resolvedTheme === 'light' ? 'visible' : 'hidden'}>
        <VideoChrome
          className={cn('absolute inset-0 h-full w-full bg-white object-cover')}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
        >
          <source src={lightSrc} type={mimeType} />
        </VideoChrome>
      </Activity>
      <Activity mode={isMounted && resolvedTheme === 'dark' ? 'visible' : 'hidden'}>
        <VideoChrome
          className={cn('absolute inset-0 h-full w-full bg-black object-cover')}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
        >
          <source src={darkSrc} type={mimeType} />
        </VideoChrome>
      </Activity>
    </div>
  )
}

const VideoChrome = ({ className, autoPlay, loop, ...props }: ComponentProps<'video'>) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const [scope, animate] = useAnimate<HTMLProgressElement>()

  return (
    <Observer
      className={cn(className)}
      onChange={(visible) => {
        const video = videoRef.current
        if (!video) return

        if (visible && autoPlay) {
          void video.play().catch(() => {})
        } else {
          video.pause()
        }

        return () => video.pause()
      }}
    >
      <progress
        ref={scope}
        className="absolute bottom-0 left-0 z-20 h-0.5 w-full origin-left bg-white mix-blend-difference ease-linear"
        style={{ transform: 'scaleX(0)' }}
      />
      <video
        ref={videoRef}
        className={className}
        {...props}
        loop={false}
        onTimeUpdate={() => {
          if (!videoRef.current) return

          animate(scope.current, { scaleX: videoRef.current.currentTime / videoRef.current.duration }, { duration: 0.3, ease: 'linear' })
        }}
        onEnded={() => {
          if (loop) {
            setTimeout(() => {
              animate(scope.current, { scaleX: 0 }, { duration: 0 })
              setTimeout(() => {
                videoRef.current?.play()
              }, 50)
            }, 300)
          }
        }}
      />
    </Observer>
  )
}
