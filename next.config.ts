import { NextConfig } from "next"
import "./src/env"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "pbs.twimg.com" }],
  },
  experimental: {
    reactCompiler: true,
    turbo: {
      rules: { "*.glsl": { loaders: ["raw-loader"], as: "*.js" } },
    },
  },

  webpack: (config) => {
    config.module.rules.push({ test: /\.glsl/, type: "asset/source" })
    return config
  },
}

export default nextConfig
