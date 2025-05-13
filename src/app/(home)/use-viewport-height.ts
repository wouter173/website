'use client'
import { useEffect, useState } from 'react'

export const useViewportHeight = () => {
  const [height, setHeight] = useState(900)

  useEffect(() => {
    const controller = new AbortController()

    const updateHeight = () => setHeight(window.innerHeight)
    window.addEventListener('resize', updateHeight, { signal: controller.signal })

    return () => {
      controller.abort()
    }
  }, [])

  return height
}
