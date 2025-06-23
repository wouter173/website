import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

type TextareaProps = ComponentProps<'textarea'> & { label?: string; errorLine?: string; ref?: HTMLTextAreaElement }

const Textarea = ({ className, label, errorLine, ref, ...props }: TextareaProps) => {
  return (
    <label className="flex max-w-full flex-col gap-2">
      {label ? <span className="text-label text-sm font-medium dark:text-neutral-200">{label}</span> : null}
      <textarea
        className={cn(
          'text-label focus-visible:ring-echo flex min-h-[80px] w-full rounded-lg border border-neutral-200 bg-neutral-100 px-3 py-2 ring-offset-neutral-50 placeholder:text-neutral-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
          'dark:border-[#2d2d2d] dark:bg-[#171717] dark:text-neutral-200 dark:placeholder:text-neutral-400 dark:focus-visible:ring-offset-black',
          className,
        )}
        ref={ref}
        {...props}
      />
      {errorLine ? <span className="text-sm text-red-500">{errorLine}</span> : null}
    </label>
  )
}

export { Textarea }
