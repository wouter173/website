import { Icon } from "@/components/icon"
import { getPosts } from "@/server/posts"
import Link from "next/link"

export const Footer = async () => {
  const posts = await getPosts()

  return (
    <footer className="border-t border-t-[#1f1f1f] bg-black pt-12 pb-16 text-white">
      <div className="mx-auto flex w-full max-w-4xl flex-col-reverse gap-4 px-6 lg:flex-row lg:gap-20">
        <div className="mt-6 flex flex-col gap-8">
          <Icon />
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <h2 className="text-neutral-200">Information</h2>
          <div className="text-sm text-neutral-500">
            <p>Wouter de Bruijn Development</p>
            <p>kvk. 87881608</p>
            <p>btw. NL004500923B33</p>
            <Link href="mailto:wouter@debruijn.dev" className="hover:text-neutral-200 hover:underline">
              mail. wouter@debruijn.dev
            </Link>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <h2 className="text-neutral-200">Work</h2>

          <ul className="flex flex-col text-sm text-neutral-500">
            {posts.slice(0, 4).map((post) => (
              <li key={post.slug}>
                <Link href={`/work/${post.slug}`} target="_blank" rel="noreferrer" className="hover:text-neutral-200 hover:underline">
                  {post.metadata.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <h2 className="text-neutral-200">Social media</h2>
          <div className="flex flex-col text-sm text-neutral-500">
            <Link href="https://x.com/wouterdebruijn" target="_blank" rel="noreferrer" className="hover:text-neutral-200 hover:underline">
              X (Twitter)
            </Link>
            <Link href="https://github.com/wouter173" target="_blank" rel="noreferrer" className="hover:text-neutral-200 hover:underline">
              Github
            </Link>
            <Link
              href="https://www.linkedin.com/in/wouter-de-bruijn-400355249/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-200 hover:underline"
            >
              Linkedin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
