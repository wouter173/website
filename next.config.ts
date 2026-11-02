import createWithVercelToolbar from '@vercel/toolbar/plugins/next'

import type { NextConfig } from 'next'
import './src/env.ts'

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  partialPrefetching: true,
  typedRoutes: true,
  allowedDevOrigins: ['127.0.0.1'],
  images: {
    remotePatterns: [{ hostname: 'pbs.twimg.com' }, { hostname: 'uqvgufujds.ufs.sh' }],
  },
  rewrites: () => [{ source: '/y/:match*', destination: 'https://umami.wouterdb.com/:match*' }],
}

const withVercelToolbar = createWithVercelToolbar()

export default withVercelToolbar(nextConfig)
