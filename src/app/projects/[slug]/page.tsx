import { Footer } from '@/components/footer'
import { mdxComponents } from '@/components/mdx/components'
import { Button } from '@/components/ui/button'
import { getProject, getProjects } from '@/server/projects'
import { ExternalLinkIcon, Undo2Icon } from 'lucide-react'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { cacheLife } from 'next/cache'
import Link from 'next/link'

export async function generateStaticParams() {
  'use cache'
  cacheLife('max')

  const projects = await getProjects()

  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  'use cache'
  cacheLife('max')

  const { slug } = await params
  const { metadata } = await getProject(slug)
  return {
    title: `${metadata.title}`,
    description: `${metadata.summary}...`,
    alternates: { canonical: `/projects/${slug}` },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  'use cache'
  cacheLife('max')

  const { slug } = await params
  const { content, metadata } = await getProject(slug)

  return (
    <div className="relative z-20 min-h-screen w-full">
      <div className="min-h-screen py-24">
        <div className="mx-auto w-full max-w-[65ch] px-4 lg:max-w-[calc(65ch+128px)] lg:px-0">
          <div className="flex flex-col lg:-ml-16 lg:flex-row">
            <div className="mt-2 ml-6 w-32 shrink-0 text-neutral-500 hover:text-neutral-700 lg:ml-0">
              <Button asChild elevation={1}>
                <Link href="/work" className="sticky top-[75.5px] my-4 -ml-6 flex w-fit items-center gap-2 lg:my-0 lg:ml-2.5">
                  <Undo2Icon className="mb-0.5 size-4" />
                  Back
                </Link>
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-label font-serif text-4xl font-bold dark:text-neutral-200">{metadata.title}</h1>
              {metadata.externalLink || metadata.githubLink ? (
                <ul className="flex gap-2 pt-2 pb-6">
                  {metadata.externalLink && (
                    <li>
                      <Button asChild className="flex w-min items-center gap-1 px-2 py-1 pl-3" elevation={1}>
                        <Link href={metadata.externalLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLinkIcon className="size-4 shrink-0" />
                          Live Site
                        </Link>
                      </Button>
                    </li>
                  )}
                  {metadata.githubLink && (
                    <li>
                      <Button variant={'primary'} asChild className="flex w-min items-center gap-1 px-2 py-1 pl-3" elevation={1}>
                        <Link href={metadata.githubLink} target="_blank" rel="noopener noreferrer">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className="fill-label size-4 dark:fill-neutral-200">
                            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                          </svg>
                          GitHub
                        </Link>
                      </Button>
                    </li>
                  )}
                </ul>
              ) : null}

              <div className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-neutral-800 dark:prose-headings:text-neutral-200 prose-h1:text-3xl prose-h2:mt-16 prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-h5:text-lg prose-h6:text-lg prose-pre:my-0 text-label prose-sm lg:prose-base prose-p:leading-relaxed prose-video:m-0 dark:text-neutral-400">
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
