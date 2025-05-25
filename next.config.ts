import type { NextConfig } from 'next'
import './src/env'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: 'pbs.twimg.com' }, { hostname: 'uqvgufujds.ufs.sh' }],
  },
}

export default nextConfig
