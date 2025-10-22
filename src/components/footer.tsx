import { getPosts } from '@/server/posts'
import Link from 'next/link'
import { Logo } from './logo'
import { cacheLife } from 'next/cache'

export const Footer = async () => {
  'use cache'
  cacheLife('max')

  const posts = await getPosts()

  return (
    <footer className="border-t-stroke relative z-20 border-t bg-white pt-12 pb-16 text-white dark:border-[#1F1F1F] dark:bg-black dark:text-neutral-200">
      <div className="mx-auto flex w-full max-w-4xl flex-col-reverse gap-4 px-6 lg:flex-row lg:gap-20">
        <div className="mt-6 flex flex-col gap-8">
          <Logo />
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <h2 className="text-label text-sm font-medium dark:text-neutral-400">Information</h2>
          <div className="text-sm text-neutral-500">
            <p>Wouter de Bruijn Development</p>
            <p>kvk. 87881608</p>
            <p>btw. NL004500923B33</p>
            <Link href="mailto:wouter@debruijn.dev" className="hover:text-label hover:underline dark:hover:text-neutral-400">
              mail. wouter@debruijn.dev
            </Link>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <h2 className="text-label text-sm font-medium dark:text-neutral-400">Posts</h2>

          <ul className="flex flex-col text-sm text-neutral-500">
            {posts.slice(0, 4).map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/posts/${post.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-label hover:underline dark:hover:text-neutral-400"
                >
                  {post.metadata.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <h2 className="text-label text-sm font-medium dark:text-neutral-400">Social media</h2>
          <div className="flex flex-col text-sm text-neutral-500">
            <Link
              href="https://x.com/wouterdebruijn"
              target="_blank"
              rel="noreferrer"
              className="hover:text-label hover:underline dark:hover:text-neutral-400"
            >
              X (Twitter)
            </Link>
            <Link
              href="https://github.com/wouter173"
              target="_blank"
              rel="noreferrer"
              className="hover:text-label hover:underline dark:hover:text-neutral-400"
            >
              Github
            </Link>
            <Link
              href="https://www.linkedin.com/in/wouter-de-bruijn-400355249/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-label hover:underline dark:hover:text-neutral-400"
            >
              Linkedin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
