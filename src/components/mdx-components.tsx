import { ExternalIcon } from "@/components/icons/external-icon"
import { MDXComponents } from "mdx/types"
import { Link as ViewTransitionLink } from "next-view-transitions"
import Image from "next/image"
import Link from "next/link"
import { Children, ComponentProps } from "react"
import { createHighlighter } from "shiki"

const Code = ({ children }: ComponentProps<"code">) => (
  <code className="rounded-lg border border-[rgba(109,109,109,0.07)] bg-[#2a2a2a] px-1 py-0.5 text-neutral-300 before:content-none after:content-none">
    {children}
  </code>
)

const Anchor = ({ href, ...props }: ComponentProps<"a">) => {
  const className = "group inline underline hover:text-white text-neutral-400"

  if (href?.startsWith("/"))
    return (
      <ViewTransitionLink href={href} className={className} {...props}>
        {props.children}
      </ViewTransitionLink>
    )
  else
    return (
      <Link rel="noreferrer noopener" target="_blank" href={href ?? ""} className={className} {...props}>
        {props.children}
        <ExternalIcon className="-ml-0 -mt-2.5 inline size-3 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
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

const langs = ["ts", "tsx", "css", "html", "json"]
const highlighter = await createHighlighter({ themes: ["slack-dark"], langs })

export const CodeBlock = async ({ children }: ComponentProps<"pre">) => {
  //@ts-expect-error
  const content = Children.toArray(children)[0].props.children as string
  //@ts-expect-error
  const lang = Children.toArray(children)[0].props.className?.replace("language-", "")

  const code = highlighter.codeToHtml(content, {
    lang,
    theme: "slack-dark",
    transformers: [
      {
        preprocess(code) {
          if (code.endsWith("\n")) code = code.slice(0, -1)
          return code
        },
      },
    ],
  })
  return <div dangerouslySetInnerHTML={{ __html: code }} />
}

export const mdxComponents: MDXComponents = {
  code: Code,
  a: Anchor,
  Image: MdxImage,

  pre: CodeBlock,
}
