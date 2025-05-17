import { ExternalIcon } from '@/components/icons/external-icon'
import { highlighter } from '@/lib/highlighter'

import Image from 'next/image'
import Link from 'next/link'
import { Children, type ComponentProps } from 'react'

const Code = ({ children }: ComponentProps<'code'>) => (
  <code className="text-label rounded-lg border border-neutral-200 bg-neutral-100 px-1 py-0.5 before:content-none after:content-none">
    {children}
  </code>
)

const Anchor = ({ href, ...props }: ComponentProps<'a'>) => {
  const className = 'group inline underline text-label font-normal hover:text-black relative'

  if (href?.startsWith('/'))
    return (
      <Link href={href} className={className} {...props}>
        {props.children}
      </Link>
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
      <Image
        src={src}
        alt={alt}
        className="block w-full overflow-hidden rounded-lg border border-neutral-200 bg-white"
        style={{ background: bg }}
        width={width}
        height={height}
      />
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
    theme: 'min-light',
    transformers: [
      {
        preprocess(code: string) {
          if (code.endsWith('\n')) code = code.slice(0, -1)
          return code
        },
      },
    ],
  })
  return <div className="my-4 overflow-clip rounded-xl border border-neutral-200 py-0" dangerouslySetInnerHTML={{ __html: code }} />
}

export const mdxComponents = {
  code: Code,
  a: Anchor,
  Image: MdxImage,
  pre: CodeBlock,
}
