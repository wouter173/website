import { cn } from "@/lib/utils"
import { Post } from "@/server/service/posts"
import { format } from "date-fns"
import { ExternalLinkIcon, PlusIcon } from "lucide-react"
import { Link as ViewTransitionLink } from "next-view-transitions"
import Image from "next/image"
import Link from "next/link"
import { ComponentProps } from "react"
import { Button } from "./ui/button"

export const PostCard = ({ post, className, ...props }: { post: Post } & ComponentProps<"div">) => {
  return (
    <article
      className={cn("group relative z-20 flex flex-col gap-6 overflow-hidden rounded-lg px-6 py-6 shadow-sm transition-all", className)}
      {...props}
    >
      <div className="absolute inset-0 -z-10 bg-[#171718] transition-all [clip-path:polygon(0_0,calc(100%-32px)_0,100%_32px,100%_100%,0_100%)] group-hover:[clip-path:polygon(0_0,calc(100%-40px)_0,100%_40px,100%_100%,0_100%)]" />
      <div className="absolute right-0 top-0 -z-10 size-8 rounded-bl-lg bg-gradient-to-tr from-[#242425] to-[#141415] shadow-lg transition-all [clip-path:polygon(-100%_0%,0%_0%,100%_100%,100%_200%,-100%_200%)] group-hover:size-10" />
      <div className="flex flex-col gap-3 pr-8">
        <div className="flex items-center gap-3">
          {post.metadata.previewImage && (
            <Image src={post.metadata.previewImage} alt={""} width={64} height={64} className="size-9 rounded-lg" />
          )}
          <h2 className="text-2xl font-semibold leading-tight text-neutral-300">{post.metadata.title}</h2>
        </div>
        <div className="relative pb-3">
          <p className="text leading-8 text-neutral-400">{post.metadata.summary}</p>
          <div className="absolute inset-0 -z-10 bg-[url('/line.png')]" />
        </div>
      </div>
      <div className="mt-auto flex justify-between">
        <div className="flex items-end gap-2">
          <span className="text-sm text-neutral-600">
            {format(post.metadata.publishedAt, "MMMM yyy")} - {post.metadata.type === "blog" ? "Blog" : "Project"}
          </span>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            asChild
            size="rounded"
            className="flex w-min items-center gap-1 bg-[#2a2a2c] px-2.5 py-1.5 pl-3 text-neutral-100 group-hover:bg-[#242425]"
          >
            <ViewTransitionLink href={`/work/${post.slug}`}>
              Read more <PlusIcon className="size-4 shrink-0" />
            </ViewTransitionLink>
          </Button>
          {post.metadata.externalLink && (
            <Button
              asChild
              size="rounded"
              className="flex size-8  items-center gap-1 bg-[#2a2a2c] p-2 text-neutral-100 group-hover:bg-[#242425]"
            >
              <Link href={post.metadata.externalLink} target="_blank" rel="noopener noreferrer">
                <ExternalLinkIcon className="size-4 shrink-0" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}
