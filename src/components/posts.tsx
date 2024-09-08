import { cn } from "@/lib/utils"
import { Post, getPosts } from "@/server/service/posts"
import { ExternalLinkIcon, PlusIcon } from "lucide-react"
import { Link as ViewTransitionLink } from "next-view-transitions"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

export const Posts = async ({ max }: { max?: number }) => {
  const posts = await getPosts()

  return (
    <div className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-4">
      {posts.slice(0, max ?? posts.length).map((post, i) => {
        const Element = post.metadata.type === "blog" ? BlogCard : ProjectCard
        return <Element post={post} key={post.slug} />
      })}
    </div>
  )
}

const ProjectCard = ({ post, className }: { post: Post; className?: string }) => {
  return (
    <article
      className={cn(
        "group relative z-20 flex min-h-[220px] gap-6 overflow-hidden rounded-3xl border border-[#1F1F1F] bg-[#0A0A0B] shadow-sm transition-all",
        className,
      )}
    >
      <div className="relative h-[80%] w-full rounded-md">
        <Image src={"/images/statsfm.webp"} alt={""} fill className="object-cover"></Image>
      </div>
      <div className="absolute bottom-0 flex w-full flex-col justify-between bg-[linear-gradient(to_top,black_40%,transparent_100%)] p-6 pt-10">
        <div className="flex flex-row justify-between gap-4">
          <h2 className="text-2xl font-semibold text-neutral-200">{post.metadata.title}</h2>
          <div className="flex flex-row gap-2">
            <Button
              asChild
              size="rounded"
              className="flex w-min items-center gap-1 bg-[#2a2a2c] px-2.5 py-1.5 pl-3 text-neutral-100 group-hover:bg-[#242425]"
            >
              <ViewTransitionLink href={`/work/${post.slug}`}>
                Read more <PlusIcon className="size-4 shrink-0" />
              </ViewTransitionLink>
            </Button>
            <Button
              asChild
              size="rounded"
              className="flex size-8  items-center gap-1 bg-[#2a2a2c] p-2 text-neutral-100 group-hover:bg-[#242425]"
            >
              <Link href={""}>
                <ExternalLinkIcon className="size-4 shrink-0" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="mt-0 h-0 opacity-0 transition-all group-hover:mt-2 group-hover:h-[55px] group-hover:opacity-100">
          <p className="text text-neutral-400">{post.metadata.summary}</p>
        </div>
      </div>
    </article>
  )
}

const BlogCard = ({ post, className }: { post: Post; className?: string }) => {
  return (
    <article className={cn("relative z-20 flex flex-col gap-6 overflow-hidden rounded-lg px-6 py-6 shadow-sm transition-all", className)}>
      <div className="absolute inset-0 -z-10 bg-[#171718] [clip-path:polygon(0_0,calc(100%-32px)_0,100%_32px,100%_100%,0_100%)]" />
      <div className="absolute right-0 top-0 -z-10 size-8 rounded-bl-lg bg-gradient-to-tr from-[#242425] to-[#141415] shadow-lg [clip-path:polygon(-100%_0%,0%_0%,100%_100%,100%_200%,-100%_200%)]" />
      <div className="flex flex-col gap-4 pr-8">
        <h2 className="text-2xl font-semibold text-neutral-300">{post.metadata.title}</h2>
        <p className="text text-neutral-400">{post.metadata.summary}</p>
      </div>
      <div className="mt-auto flex justify-end">
        <Button
          asChild
          size="rounded"
          className="flex w-min items-center gap-1 bg-[#2a2a2c] px-2.5 py-1.5 pl-3 text-neutral-100 group-hover:bg-[#242425]"
        >
          <ViewTransitionLink href={`/work/${post.slug}`}>
            Read more <PlusIcon className="size-4 shrink-0" />
          </ViewTransitionLink>
        </Button>
      </div>
    </article>
  )
}
