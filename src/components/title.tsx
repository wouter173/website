import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

export const Title = ({ children, className, ...props }: ComponentProps<"h1">) => {
  return (
    <h1
      className={cn(
        "block w-min bg-[linear-gradient(91deg,rgba(244,244,245,0.80)_45.8%,#000_160%);] bg-clip-text text-4xl font-extrabold leading-normal text-transparent opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  )
}
