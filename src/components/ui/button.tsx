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
          `,
        default:
          'bg-black/70 text-white hover:bg-opacity-40 hover:outline-2 outline-neutral-600 hover:border-black focus-visible:border-black focus-visible:outline-2 ',
        primary: `border-1 border-neutral-200 bg-neutral-100 pr-1.5 text-label outline-neutral-600
          hover:border-white hover:outline-2
          focus-visible:border-white focus-visible:outline-2
          disabled:opacity-70 disabled:hover:outline-0 disabled:focus-visible:outline-0 disabled:focus-visible:border-slate-100 disabled:hover:border-slate-100
          `,
        // destructive: "bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",
        // outline: "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        // secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        // ghost: "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        // link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
      },
      size: {
        rounded: 'rounded-full py-1 px-2.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'rounded',
    },
  },
)

export type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    ref?: Ref<HTMLButtonElement>
  }

const Button = ({ className, variant, size, asChild = false, ref, ...props }: ButtonProps) => {
  const Comp = asChild ? Slot.Root : 'button'
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
}

export { Button, buttonVariants }
