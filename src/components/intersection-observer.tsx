import { useEffect, useRef, type ReactNode } from 'react'

export function Observer({
  callback,
  onChange,
  rootMargin,
  threshold = 0,
  children,
  className,
}: {
  callback?: () => void
  onChange?: (visible: boolean) => void
  rootMargin?: string
  threshold?: number
  children?: ReactNode
  className?: string
}) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const visible = entry.isIntersecting && entry.intersectionRatio >= threshold

          onChange?.(visible)
          if (visible) callback?.()
        }
      },
      { rootMargin, threshold },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [callback, onChange, rootMargin, threshold])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}
