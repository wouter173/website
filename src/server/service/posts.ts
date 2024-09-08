import fs from "fs/promises"
import { z } from "zod"
import { read as readMdx } from "zod-matter"

const POST_DIR = "src/content/posts"

export type Metadata = z.infer<typeof metadataSchema>
const metadataSchema = z.object({
  title: z.string(),
  summary: z.string(),
  publishedAt: z.date(),
  type: z.enum(["blog", "project"]),
  image: z.string().optional(),
})

export async function getPost(slug: string) {
  const { data: metadata, content } = readMdx(`${POST_DIR}/${slug}.mdx`, metadataSchema)

  return { slug, metadata, content }
}

export async function getPosts() {
  const files = await fs.readdir(POST_DIR)

  const posts = await Promise.all(files.map(async (file) => await getPost(file.replace(".mdx", ""))))
  return posts.toSorted((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())
}

export type Post = Awaited<ReturnType<typeof getPost>>
