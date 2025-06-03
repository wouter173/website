import Link from 'next/link'
import type { ComponentProps } from 'react'

export function InstantLink(props: ComponentProps<typeof Link>) {
  return <Link {...props} onPointerDown={(e) => e.currentTarget.click()} />
}
