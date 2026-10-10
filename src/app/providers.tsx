'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider, useTheme } from 'next-themes'
import { useEffect, useState, type PropsWithChildren } from 'react'
import { Toaster } from 'sonner'

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import('@tanstack/react-query').QueryClient
  }
}

export const Providers = ({ children }: PropsWithChildren) => {
  const [qc] = useState(() => new QueryClient())

  useEffect(() => {
    window.__TANSTACK_QUERY_CLIENT__ = qc
  }, [qc])

  return (
    <QueryClientProvider client={qc}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <ThemeColor />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}

const ThemeColor = () => {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name=theme-color]')
    metaThemeColor?.setAttribute('content', resolvedTheme === 'dark' ? '#101010' : '#f9f9f9')
  }, [resolvedTheme])

  return <Toaster richColors theme={resolvedTheme === 'dark' ? 'dark' : 'light'} />
}
