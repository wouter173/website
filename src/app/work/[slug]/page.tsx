import { ExternalIcon } from "@/components/icons/external-icon"
import { Title } from "@/components/title"
import { getPost, getPosts } from "@/server/service/posts"
import { MDXRemote } from "next-mdx-remote/rsc"
import { Link as ViewTransitionLink } from "next-view-transitions"
import Link from "next/link"

export async function generateStaticParams() {
  const posts = await getPosts()

  return posts.map((post) => ({ slug: post.slug }))
}

export const dynamic = "force-static"
export const dynamicParams = false

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug, content, metadata } = await getPost(params.slug)

  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute -z-10 h-full w-full">
        <div className="mx-auto grid h-full max-w-[904px] grid-cols-2 gap-2">
          <div className="border-x-2 border-dashed border-[rgba(109,109,109,0.07)]" />
          <div className="border-x-2 border-dashed border-[rgba(109,109,109,0.07)]" />
        </div>
      </div>
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-[65ch] pt-48">
          <Title className="w-full">{metadata.title}</Title>
          <div className="prose text-neutral-200 prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-white prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg">
            <MDXRemote
              source={content}
              components={{
                code: ({ children }) => (
                  <code className="rounded-lg border border-[rgba(109,109,109,0.07)] bg-[#2a2a2a] px-1 py-0.5 text-neutral-300 before:content-none after:content-none">
                    {children}
                  </code>
                ),
                a: ({ href, ...props }) => {
                  const className = "group inline-flex underline hover:text-white text-neutral-400"

                  if (href?.startsWith("/"))
                    return (
                      <ViewTransitionLink href={href} className={className} {...props}>
                        {props.children}
                      </ViewTransitionLink>
                    )
                  else
                    return (
                      <Link rel="noreferrer noopener" target="_blank" href={href ?? ""} className={className} {...props}>
                        {props.children}{" "}
                        <ExternalIcon className="mt-0.5 size-3 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
                      </Link>
                    )
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
