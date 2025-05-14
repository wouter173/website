import { cn } from '@/lib/utils'
import type { ComponentProps, Ref } from 'react'

type InputProps = ComponentProps<'input'> & { label?: string; errorLine?: string; ref?: Ref<HTMLInputElement> }

const Input = ({ className, type, label, errorLine, ref, ...props }: InputProps) => {
  return (
    <label className="flex max-w-full flex-col gap-2">
      {label ? <span className="text-label text-sm font-medium">{label}</span> : null}
      <input
        type={type}
        className={cn(
          'text-label flex h-10 w-full rounded-lg border border-neutral-200 bg-neutral-100 px-3 py-2 ring-offset-neutral-50 placeholder:text-neutral-600 focus-visible:ring-2 focus-visible:ring-neutral-600 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
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
