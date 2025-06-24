'use client'
import { ThemeProvider, useTheme } from 'next-themes'
import { useEffect, type PropsWithChildren } from 'react'

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ThemeColor />
      <>{children}</>
    </ThemeProvider>
  )
}

const ThemeColor = () => {
  const { resolvedTheme } = useTheme()
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name=theme-color]')
    metaThemeColor?.setAttribute('content', resolvedTheme === 'dark' ? '#101010' : '#f9f9f9')
  }, [resolvedTheme])

  return null
}
