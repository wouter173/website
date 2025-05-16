import type { MetadataRoute } from 'next'
import { CONSTANTS } from './constants'
import { getPosts } from '@/server/posts'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()

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
    ...posts.map((post) => ({
      url: `${CONSTANTS.canonicalUrl}/posts/${post.slug}`,
      lastModified: new Date(post.metadata.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
