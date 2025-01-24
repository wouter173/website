import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { ComponentProps, Ref } from "react"

const buttonVariants = cva(
  "active:scale-95 transition-all inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default:
          "bg-black/70 text-white hover:bg-opacity-40 hover:outline-2 outline-neutral-600 hover:border-black focus-visible:border-black focus-visible:outline-2 ",
        primary: `border-2 border-slate-100 bg-slate-100 pr-1.5 text-black outline-[#6F6F70]
          hover:border-black hover:bg-slate-100 hover:outline-2
          focus-visible:border-black focus-visible:bg-slate-100 focus-visible:outline-2
          disabled:opacity-70 disabled:hover:outline-0 disabled:focus-visible:outline-0 disabled:focus-visible:border-slate-100 disabled:hover:border-slate-100
          `,
        // destructive: "bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",
        // outline: "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        // secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        // ghost: "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        // link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
      },
      size: {
        rounded: "rounded-full py-1 px-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "rounded",
    },
  },
)

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    ref?: Ref<HTMLButtonElement>
  }

const Button = ({ className, variant, size, asChild = false, ref, ...props }: ButtonProps) => {
  const Comp = asChild ? Slot.Root : "button"
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
}

export { Button, buttonVariants }
