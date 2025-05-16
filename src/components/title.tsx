import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

export const Title = ({
  children,
  className,
  as: componentAs,
  ...props
}: ComponentProps<'h1'> & { as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' }) => {
  const Component = componentAs ?? 'h1'

  return (
    <Component className={cn('block w-min text-4xl leading-normal font-extrabold', className)} {...props}>
      {children}
    </Component>
  )
}
