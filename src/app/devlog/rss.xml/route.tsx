import { Feed } from 'feed'
import { cacheLife, cacheTag } from 'next/cache'
import { CONSTANTS } from '@/app/constants'
import { getPdsPosts } from '../_devlog/get-pds-posts'

async function getFeedXml() {
  'use cache'
  cacheLife('minutes')
  cacheTag(CONSTANTS.cacheTags.devlog)

  const posts = await getPdsPosts({ limit: 50 })
  const url = `${CONSTANTS.canonicalUrl}/devlog`

  const feed = new Feed({
    title: 'Wouter de Bruijn — Devlog',
    description: 'Updates from my devlog.',
    id: url,
    link: url,
    copyright: 'Wouter de Bruijn',
    feedLinks: { rss: `${url}/rss.xml` },
  })

  for (const post of posts) {
    const link = `${url}/${encodeURIComponent(post.rkey)}`
    const attachment = post.attachments

    const media = attachment?.type === 'images' ? attachment.images[0] : attachment?.type === 'video' ? attachment : undefined

    feed.addItem({
      title: post.content.text.trim().split('\n')[0]?.slice(0, 100) || 'Devlog update',
      id: link,
      link,
      description: post.content.text,
      date: new Date(post.createdAt),
      enclosure: media ? { url: media.url, type: media.mimeType } : undefined,
    })
  }

  return feed.rss2()
}

export async function GET() {
  return new Response(await getFeedXml(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}
