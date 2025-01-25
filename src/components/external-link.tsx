import { cn } from "@/lib/utils"
import Link from "next/link"
import type { ComponentProps } from "react"
import { ExternalIcon } from "./icons/external-icon"

export const ExternalLink = ({ className, children, ...props }: ComponentProps<typeof Link>) => {
  return (
    <Link className={cn("group inline underline hover:text-white", className)} rel="noopener noreferer" target="_blank" {...props}>
      {children}
      <ExternalIcon className="-mt-3.5 -ml-0 inline size-3 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
    </Link>
  )
}
