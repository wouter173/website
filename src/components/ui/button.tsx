import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'

import { cn } from '@/lib/utils'
import type { ComponentProps, Ref } from 'react'

const buttonVariants = cva(
  'active:scale-95 transition-all inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium cursor-pointer',
  {
    variants: {
      variant: {
        cta: `bg-[#1E1D1F] border-1 border-black pr-1.5 text-white outline-black shadow-[0px_4px_4px_0px_rgba(156,156,156,0.25),0px_0px_0px_1px_rgba(255,255,255,0.20)_inset]
          active:scale-95 transition-all active:translate-y-[1px]
          hover:border-white hover:outline-2
          focus-visible:border-white focus-visible:outline-2
          disabled:opacity-70 disabled:hover:outline-0 disabled:focus-visible:outline-0 disabled:focus-visible:border-slate-100 disabled:hover:border-slate-100
          dark:bg-white dark:text-label dark:hover:border-black dark:focus-visible:border-black dark:outline-echo
          `,
        primary: `border-1 border-neutral-200 bg-neutral-100 pr-1.5 text-label outline-echo outline-offset-2 transition-all
          active:scale-95 active:translate-y-[1px] disabled:active:scale-100 disabled:active:translate-y-0
          focus-visible:outline-2 hover:outline-2 disabled:hover:outline-0 disabled:focus-visible:outline-0
          disabled:opacity-70 disabled:cursor-not-allowed
          dark:text-neutral-200 dark:outline-echo dark:border-[#2d2d2d] dark:bg-[#171717]
          `,
      },
      size: {
        rounded: 'rounded-full py-1 px-2.5',
      },
      elevation: {
        none: 'shadow-none',
        1: 'shadow-[0px_4px_4px_0px_rgba(156,156,156,0.05)] dark:shadow-2xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'rounded',
      elevation: 'none',
    },
  },
)

export type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    ref?: Ref<HTMLButtonElement>
  }

const Button = ({ className, variant, size, elevation, asChild = false, ref, ...props }: ButtonProps) => {
  const Comp = asChild ? Slot.Root : 'button'
  return <Comp className={cn(buttonVariants({ variant, size, elevation, className }))} ref={ref} {...props} />
}

export { Button, buttonVariants }
