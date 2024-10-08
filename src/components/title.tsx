import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

export const Title = ({
  children,
  className,
  as: componentAs,
  ...props
}: ComponentProps<"h1"> & { as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" }) => {
  const Component = componentAs ?? "h1"

  return (
    <Component
      className={cn(
        "block w-min bg-[linear-gradient(91deg,rgba(244,244,245,0.80)_45.8%,#232323_160%);] bg-clip-text text-4xl font-extrabold leading-normal text-transparent opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
