import type { NextConfig } from 'next'
import './src/env.ts'

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [{ hostname: 'pbs.twimg.com' }, { hostname: 'uqvgufujds.ufs.sh' }],
  },
}

export default nextConfig
