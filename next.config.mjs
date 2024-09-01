import nextMdx from "@next/mdx"
import createJiti from "jiti"
import { fileURLToPath } from "node:url"
const jiti = createJiti(fileURLToPath(import.meta.url))

// Import env here to validate during build. Using jiti we can import .ts files :)
jiti("./src/env")

const withMdx = nextMdx()

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({ test: /\.glsl/, type: "asset/source" })
    return config
  },
  images: {
    remotePatterns: [
      {
        hostname: "pbs.twimg.com",
      },
    ],
  },
}

export default withMdx(nextConfig)
