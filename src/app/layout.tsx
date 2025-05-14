import { Nav } from '@/components/nav'
import { Analytics as VercelAnalytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { ViewTransitions } from 'next-view-transitions'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import type { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://wouterdb.nl'),
  title: 'Wouter de Bruijn',
  description: 'Portfolio of Wouter de Bruijn. A Fullstack Developer, largely self taught, and excited to learn new things.',
  twitter: {
    title: 'Wouter de Bruijn',
    description: 'Portfolio of Wouter de Bruijn. A Fullstack Developer, largely self taught, and excited to learn new things.',
    card: 'summary_large_image',
    creator: '@wouterdebruijn',
  },
  openGraph: {
    siteName: 'Wouter de Bruijn',
    url: 'https://wouterdb.nl',
  },
}

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <ViewTransitions>
      <html lang="en" className="bg-offwhite">
        <Analytics />
        <body
          className={`${inter.className} relative bg-white text-neutral-600 before:pointer-events-none before:absolute before:inset-0 before:bg-[url('/grain.png')] before:bg-repeat before:opacity-50`}
        >
          <Nav />
          <div>{children}</div>
          <Toaster richColors theme="light" />
        </body>
      </html>
    </ViewTransitions>
  )
}

function Analytics() {
  return (
    <>
      <Script
        defer
        id="plausible"
        data-domain="wouterdb.nl"
        src="https://plausible.wouter.cloud/js/script.file-downloads.hash.outbound-links.pageview-props.revenue.tagged-events.js"
      />
      <Script
        id="inline-plausible"
        dangerouslySetInnerHTML={{
          __html: `window.plausible = window.plausible || function() {(window.plausible.q = window.plausible.q || []).push(arguments)}`,
        }}
      />
      <Script defer data-site-id="wouterdb.nl" src="https://assets.onedollarstats.com/tracker.js" />
      <VercelAnalytics />
    </>
  )
}
