import { Nav } from "@/components/nav"
import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next"
import { ViewTransitions } from "next-view-transitions"
import { Geist } from "next/font/google"
import type { PropsWithChildren } from "react"
import { Toaster } from "sonner"

import { getPosts } from "@/server/posts"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://wouterdb.nl"),
  title: "Wouter de Bruijn",
  description: "Portfolio of Wouter de Bruijn. A Fullstack Developer, largely self taught, and excited to learn new things.",
  twitter: {
    title: "Wouter de Bruijn",
    description: "Portfolio of Wouter de Bruijn. A Fullstack Developer, largely self taught, and excited to learn new things.",
    card: "summary_large_image",
    creator: "@wouterdebruijn",
  },
  openGraph: {
    siteName: "Wouter de Bruijn",
    url: "https://wouterdb.nl",
  },
}

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist",
})

export default async function RootLayout({ children }: PropsWithChildren) {
  const posts = await getPosts()

  return (
    <ViewTransitions>
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
        <Script defer data-site-id="wouterdb.nl" src="https://assets.onedollarstats.com/tracker.js" />

        <body
          className={`${geist.className} relative bg-[#0c0c0c] before:pointer-events-none before:absolute before:inset-0 before:bg-[url('/grain.png')] before:bg-repeat before:opacity-[3%]`}
        >
          <Nav posts={posts} />
          <div className="relative z-10">{children}</div>
          <Toaster richColors theme="dark" />
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  )
}
