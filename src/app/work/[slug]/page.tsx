import { Title } from "@/components/title"
import { getPost, getPosts } from "@/server/service/posts"
import { MDXRemote } from "next-mdx-remote/rsc"

export async function generateStaticParams() {
  const posts = await getPosts()

  return posts.map((post) => ({ slug: post.slug }))
}

export const dynamic = "force-static"
export const dynamicParams = false

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug, content, metadata } = await getPost(params.slug)

  return (
    <div className="mx-auto max-w-[65ch] pt-48">
      <Title className="w-full">{metadata.title}</Title>
      <div className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-white prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-a:text-white prose-a:visited:text-white text-neutral-200">
        <MDXRemote source={content} />
      </div>
    </div>
  )
}
