import { Footer } from "@/components/footer"
import { mdxComponents } from "@/components/mdx-components"
import { Title } from "@/components/title"
import { Button } from "@/components/ui/button"
import { getPost, getPosts } from "@/server/posts"
import { ExternalLinkIcon, Undo2Icon } from "lucide-react"
import { MDXRemote } from "next-mdx-remote/rsc"
import { Link as ViewTransitionLink } from "next-view-transitions"
import Link from "next/link"

export async function generateStaticParams() {
  const posts = await getPosts()

  return posts.map((post) => ({ slug: post.slug }))
}

export const dynamic = "force-static"
export const dynamicParams = false

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const { content, metadata } = await getPost(params.slug)

  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute -z-10 h-full w-full">
        <div className="mx-auto grid h-full max-w-[904px]">
          <div className="border-x-2 border-dashed border-[rgba(109,109,109,0.07)]" />
        </div>
      </div>

      <div className="min-h-screen py-32 lg:py-48">
        <div className="mx-auto w-full max-w-[65ch] px-4 lg:max-w-[calc(65ch+128px)] lg:px-0">
          <div className="flex flex-col lg:-ml-16 lg:flex-row">
            <div className="mt-2 w-32 shrink-0 pl-4 text-neutral-500 hover:text-neutral-300">
              <ViewTransitionLink
                href="/work"
                className="sticky top-[75.5px] my-4 -ml-6 flex w-fit items-center gap-2 rounded-full px-2.5 py-0.5 transition-all hover:bg-white/10 active:scale-95 lg:my-0 lg:ml-2.5"
              >
                <Undo2Icon className="mb-0.5 size-4" />
                Back
              </ViewTransitionLink>
            </div>
            <div className="flex flex-col gap-2">
              <Title className="w-fit">{metadata.title}</Title>
              {metadata.externalLink || metadata.githubLink ? (
                <ul className="flex gap-2 pb-6 pt-2">
                  {metadata.externalLink && (
                    <li>
                      <Button
                        asChild
                        size="rounded"
                        className="flex w-min items-center gap-1 bg-[#2a2a2c] px-2.5 py-1 text-neutral-100 group-hover:bg-[#242425]"
                      >
                        <Link href={metadata.externalLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLinkIcon className="size-4 shrink-0" />
                          Live Site
                        </Link>
                      </Button>
                    </li>
                  )}
                  {metadata.githubLink && (
                    <li>
                      <Button
                        asChild
                        size="rounded"
                        className="flex w-min items-center gap-1 bg-[#2a2a2c] px-2 py-1 text-neutral-100 group-hover:bg-[#242425]"
                      >
                        <Link href={metadata.githubLink} target="_blank" rel="noopener noreferrer">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className="size-4 fill-white">
                            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                          </svg>
                          GitHub
                        </Link>
                      </Button>
                    </li>
                  )}
                </ul>
              ) : null}
              <div className="prose text-neutral-300 prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-neutral-100 prose-h1:text-3xl prose-h2:mt-16 prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-h5:text-lg prose-h6:text-lg prose-pre:my-0">
                <MDXRemote source={content} components={mdxComponents} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
