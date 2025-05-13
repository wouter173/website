import { ExternalIcon } from '@/components/icons/external-icon'
import { highlighter } from '@/lib/highlighter'
import { Link as ViewTransitionLink } from 'next-view-transitions'
import Image from 'next/image'
import Link from 'next/link'
import { Children, type ComponentProps } from 'react'

const Code = ({ children }: ComponentProps<'code'>) => (
  <code className="rounded-lg border border-[rgba(109,109,109,0.07)] bg-[#2a2a2a] px-1 py-0.5 text-neutral-300 before:content-none after:content-none">
    {children}
  </code>
)

const Anchor = ({ href, ...props }: ComponentProps<'a'>) => {
  const className = 'group inline underline hover:text-white text-neutral-400'

  if (href?.startsWith('/'))
    return (
      <ViewTransitionLink href={href} className={className} {...props}>
        {props.children}
      </ViewTransitionLink>
    )
  else
    return (
      <Link rel="noreferrer noopener" target="_blank" href={href ?? ''} className={className} {...props}>
        {props.children}
        <ExternalIcon className="-mt-2.5 -ml-0 inline size-3 transition-transform group-hover:translate-x-px group-hover:-translate-y-px" />
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

export const CodeBlock = async ({ children }: ComponentProps<'pre'>) => {
  //@ts-expect-error - children is a string
  const content = Children.toArray(children)[0].props.children as string
  //@ts-expect-error - className is a string
  const lang = Children.toArray(children)[0].props.className?.replace('language-', '')

  const code = highlighter.codeToHtml(content, {
    lang,
    theme: 'my-theme',
    transformers: [
      {
        preprocess(code: string) {
          if (code.endsWith('\n')) code = code.slice(0, -1)
          return code
        },
      },
    ],
  })
  return <div className="my-4 overflow-clip rounded-xl border border-neutral-800 py-0" dangerouslySetInnerHTML={{ __html: code }} />
}

export const mdxComponents = {
  code: Code,
  a: Anchor,
  Image: MdxImage,
  pre: CodeBlock,
}
