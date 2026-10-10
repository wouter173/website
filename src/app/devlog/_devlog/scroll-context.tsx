'use client'

import { usePathname } from 'next/navigation'
import { createContext, useCallback, useContext, useMemo, useState, type PropsWithChildren } from 'react'

const ScrollContext = createContext<{
  readyPath: string | null
  markReady: (path: string) => void
  markPending: (path: string) => void
} | null>(null)

export function DevlogScrollProvider({ children }: PropsWithChildren) {
  const [readyPath, setReadyPath] = useState<string | null>(null)

  const markReady = useCallback((path: string) => setReadyPath(path), [])
  const markPending = useCallback((path: string) => setReadyPath((current) => (current === path ? null : current)), [])

  const value = useMemo(() => ({ readyPath, markReady, markPending }), [readyPath, markReady, markPending])

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
}

export function useDevlogScrollVisibility() {
  const pathname = usePathname()

  const context = useContext(ScrollContext)
  if (!context) throw new Error('DevlogScrollProvider is missing')

  const pending = /^\/devlog\/[^/]+\/?$/.test(pathname) && context.readyPath !== pathname

  return { ...context, pending }
}
