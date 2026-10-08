'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider, useTheme } from 'next-themes'
import { useEffect, type PropsWithChildren } from 'react'
import { Toaster } from 'sonner'

const qc = new QueryClient()

export const Providers = ({ children }: PropsWithChildren) => {
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
