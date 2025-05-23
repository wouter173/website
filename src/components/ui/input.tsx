import { cn } from "@/lib/utils"
import type { ComponentProps, Ref } from "react"

type InputProps = ComponentProps<"input"> & { label?: string; errorLine?: string; ref?: Ref<HTMLInputElement> }

const Input = ({ className, type, label, errorLine, ref, ...props }: InputProps) => {
  return (
    <label className="flex max-w-full flex-col gap-2">
      {label ? <span className="text-sm font-medium text-neutral-500">{label}</span> : null}
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-white ring-offset-neutral-950 placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-[#6F6F70] focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
      {errorLine ? (
        <span aria-errormessage={errorLine} className="text-sm text-red-500">
          {errorLine}
        </span>
      ) : null}
    </label>
  )
}

export { Input }
