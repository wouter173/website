import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { ComponentProps, forwardRef } from "react"

const buttonVariants = cva(
  "active:scale-95 transition-all inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default:
          "bg-black/70 text-white hover:bg-opacity-40 hover:outline hover:outline-2 outline-neutral-600 hover:border-black focus-visible:border-black focus-visible:outline focus-visible:outline-2 ",
        primary:
          "border-2 border-slate-100 bg-slate-100 pr-1.5 text-black hover:border-black hover:bg-slate-100 hover:outline hover:outline-2 outline-[#6F6F70] focus-visible:border-black focus-visible:outline focus-visible:outline-2 disabled:opacity-70 disabled:hover:outline-none disabled:focus-visible:outline-none disabled:focus-visible:border-slate-100 disabled:hover:border-slate-100",
        // destructive: "bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",
        // outline: "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        // secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        // ghost: "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        // link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
      },
      size: {
        rounded: "rounded-full py-1 px-2.5",
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
})
Button.displayName = "Button"

export { Button, buttonVariants }
