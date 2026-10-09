import { Nav } from '@/components/nav'
import type { Metadata, Viewport } from 'next'

import { Inter, Frank_Ruhl_Libre } from 'next/font/google'
import Script from 'next/script'
import { Suspense, type PropsWithChildren } from 'react'
import { CONSTANTS } from './constants'
import './globals.css'
import { Providers } from './providers'

export const viewport: Viewport = {
  initialScale: 1,
  viewportFit: 'cover',
  width: 'device-width',
}

export const metadata: Metadata = {
  metadataBase: new URL(CONSTANTS.canonicalUrl),
  title: {
    template: '%s | Wouter de Bruijn',
    default: 'Wouter de Bruijn',
  },
  description: 'Portfolio of Wouter de Bruijn. A Fullstack Developer, largely self taught, and excited to learn new things.',
  twitter: {
    title: 'Wouter de Bruijn',
    description: 'Portfolio of Wouter de Bruijn. A Fullstack Developer, largely self taught, and excited to learn new things.',
    card: 'summary_large_image',
    creator: '@wouterdebruijn',
    images: [{ url: '/opengraph-image' }],
  },
  openGraph: {
    siteName: 'Wouter de Bruijn',
    images: [{ url: '/opengraph-image' }],
  },
}

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

const frankRuhlLibre = Frank_Ruhl_Libre({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-serif',
})

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <Analytics />
      <head>
        <meta name="theme-color" content="#f9f9f9" />
        <script>
          {`
            (() => {
              let a, theme = localStorage?.getItem("theme");
              a = "dark" === theme || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "#0d0d0d" : "#f9f9f9";
              let c = Array.from(document.querySelectorAll('meta[name="theme-color"]'));
              c.forEach((b) => {b.setAttribute("content", a)});
            })();
          `}
        </script>
      </head>
      <body
        className={`${inter.className} ${frankRuhlLibre.variable} dark:bg-graphite relative bg-white text-neutral-600 before:pointer-events-none before:absolute before:inset-0 before:bg-[url('/noise.png')] before:bg-repeat before:opacity-5 dark:text-neutral-400 dark:before:opacity-3`}
      >
        <Providers>
          <Suspense>
            <Nav />
          </Suspense>
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  )
}

function Analytics() {
  return (
    <>
      <Script async src="/x/js/script.js" />
      <Script
        id="inline-plausible"
        dangerouslySetInnerHTML={{
          __html: `window.plausible=window.plausible||function(){(plausible.q = plausible.q || []).push(arguments)},plausible.init=plausible.init||function(i){(plausible.o = i || {})}; plausible.init();plausible.init({endpoint: "/x/api/event"})`,
        }}
      />
    </>
  )
}
