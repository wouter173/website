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
  rewrites: () => [
    { source: '/x/js/script.js', destination: 'https://plausible.wouterdb.com/js/pa-5BXxZKR9w5nLeGIxFaAXM.js' },
    { source: '/x/api/event', destination: 'https://plausible.wouterdb.com/api/event' },
  ],
}

export default nextConfig
