import { Nav } from "@/components/nav"
import { Analytics } from "@vercel/analytics/react"
import { GeistSans } from "geist/font/sans"
import type { Metadata } from "next"
import { ViewTransitions } from "next-view-transitions"
import { PropsWithChildren } from "react"
import { Toaster } from "sonner"

import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  title: "Wouter de Bruijn",
  description: "Portfolio of Wouter de Bruijn. A Fullstack Developer, largely self taught, and excited to learn new things.",
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="bg-black">
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

      <body
        className={`${GeistSans.className} relative bg-[#0c0c0c] before:pointer-events-none before:absolute before:inset-0 before:bg-[url('/grain.png')] before:bg-repeat before:opacity-[3%]`}
      >
        <Nav />
        <ViewTransitions>
          <div className="relative z-10">{children}</div>
        </ViewTransitions>
        <Toaster richColors theme="dark" />
        <Analytics />
      </body>
    </html>
  )
}
