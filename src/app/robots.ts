import { CONSTANTS } from './constants'

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${CONSTANTS.canonicalUrl}/sitemap.xml`,
  }
}
