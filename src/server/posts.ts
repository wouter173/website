import fs from 'fs/promises'
import path from 'path'
import { z } from 'zod'
import { read as readMdx } from 'zod-matter'

const POST_DIR = path.join(process.cwd(), 'public/content')

export type Metadata = z.infer<typeof metadataSchema>
const metadataSchema = z.object({
  title: z.string(),
  summary: z.string(),
  publishedAt: z.date(),
  type: z.enum(['blog', 'project']),
  previewImage: z.string().optional(),
  externalLink: z.string().optional(),
  githubLink: z.string().optional(),
  hidden: z.boolean().optional().default(false),
})

export async function getPost(slug: string) {
  const { data: metadata, content } = readMdx(`${POST_DIR}/${slug}.mdx`, metadataSchema)

  return { slug, metadata, content }
}

export async function getPosts() {
  const files = await fs.readdir(POST_DIR)

  const posts = await Promise.all(files.map(async (file) => await getPost(file.replace('.mdx', ''))))
  return posts
    .filter((post) => !post.metadata.hidden)
    .toSorted((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())
}

export type Post = Awaited<ReturnType<typeof getPost>>
