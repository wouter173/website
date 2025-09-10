import type { MetadataRoute } from 'next'
import { CONSTANTS } from './constants'
import { getPosts } from '@/server/posts'

const posts = await getPosts()

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: CONSTANTS.canonicalUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${CONSTANTS.canonicalUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CONSTANTS.canonicalUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...posts
      .filter((post) => !post.metadata.hidden)
      .map((post) => ({
        url: `${CONSTANTS.canonicalUrl}/posts/${post.slug}`,
        lastModified: new Date(post.metadata.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
  ]
}
