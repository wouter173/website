import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

type TextareaProps = ComponentProps<'textarea'> & { label?: string; errorLine?: string; ref?: HTMLTextAreaElement }

const Textarea = ({ className, label, errorLine, ref, ...props }: TextareaProps) => {
  return (
    <label className="flex max-w-full flex-col gap-2">
      {label ? <span className="text-sm font-medium text-neutral-500">{label}</span> : null}
      <textarea
        className={cn(
          'text-label flex min-h-[80px] w-full rounded-lg border border-neutral-200 bg-neutral-100 px-3 py-2 ring-offset-neutral-50 placeholder:text-neutral-600 focus-visible:ring-2 focus-visible:ring-neutral-600 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
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
