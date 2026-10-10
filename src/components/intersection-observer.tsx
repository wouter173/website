import { useEffect, useRef } from 'react'

export function Observer({ callback, rootMargin }: { callback: () => void; rootMargin?: string }) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) callback()
      },
      { rootMargin, threshold: 0 },
    )
    observer.observe(elementRef.current)

    return () => {
      observer.disconnect()
    }
  }, [callback, rootMargin])

  return <div ref={elementRef}></div>
}
