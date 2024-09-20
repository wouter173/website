import { ExternalIcon } from "@/components/icons/external-icon"
import { MDXComponents } from "mdx/types"
import { Link as ViewTransitionLink } from "next-view-transitions"
import Image from "next/image"
import Link from "next/link"
import { ComponentProps } from "react"

const Code = ({ children }: ComponentProps<"code">) => (
  <code className="rounded-lg border border-[rgba(109,109,109,0.07)] bg-[#2a2a2a] px-1 py-0.5 text-neutral-300 before:content-none after:content-none">
    {children}
  </code>
)

const Anchor = ({ href, ...props }: ComponentProps<"a">) => {
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
}

const MdxImage = ({ src, alt, bg, width, height }: { src: string; alt: string; bg: `#${number}`; width: number; height: number }) => {
  return (
    <div className="relative">
      <Image src={src} alt={alt} className="block w-full rounded-lg bg-black" style={{ background: bg }} width={width} height={height} />
    </div>
  )
}

export const mdxComponents: MDXComponents = {
  code: Code,
  a: Anchor,
  Image: MdxImage,
}
