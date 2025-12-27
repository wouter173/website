import fs from 'fs/promises'
import { cacheLife, cacheTag } from 'next/cache'
import path from 'path'
import { z } from 'zod'
import { read as readMdx } from 'zod-matter'

const PROJECTS_DIR = path.join(process.cwd(), 'public/content/projects')

export type Metadata = z.infer<typeof metadataSchema>
const metadataSchema = z.object({
  title: z.string(),
  summary: z.string(),
  publishedAt: z.date(),
  previewImage: z.string().optional(),
  externalLink: z.string().optional(),
  githubLink: z.string().optional(),
  hidden: z.boolean().optional().default(false),
})

export async function getProject(slug: string) {
  'use cache'
  cacheLife('max')
  cacheTag('posts', slug)
  const { data: metadata, content } = readMdx(`${PROJECTS_DIR}/${slug}.mdx`, metadataSchema)

  return { slug, metadata, content }
}

export async function getProjects() {
  'use cache'
  cacheLife('max')
  cacheTag('posts')

  const files = await fs.readdir(PROJECTS_DIR)

  const posts = await Promise.all(files.map(async (file) => await getProject(file.replace('.mdx', ''))))
  return posts
    .filter((post) => !post.metadata.hidden)
    .toSorted((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())
}

export type Project = Awaited<ReturnType<typeof getProject>>
