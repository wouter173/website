import { cn } from '@/lib/utils'
import './zoom-in-transitions.css'
import { Dialog } from 'radix-ui'
import {
  createContext,
  startTransition,
  useContext,
  useId,
  useState,
  type PropsWithChildren,
  ViewTransition,
  type ComponentProps,
  addTransitionType,
} from 'react'

const ZoomContext = createContext<{ open: boolean; name: string } | null>(null)

export function useZoom() {
  const context = useContext(ZoomContext)
  if (!context) throw new Error('useZoom outside of <ZoomIn.Root />')
  return context
}

function Root({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false)

  const name = useId()

  return (
    <ZoomContext value={{ open, name }}>
      <Dialog.Root
        open={open}
        onOpenChange={(next) => {
          startTransition(() => {
            addTransitionType(next ? 'zoom-open' : 'zoom-close')
            setOpen(next)
          })
        }}
      >
        {children}
      </Dialog.Root>
    </ZoomContext>
  )
}

function Trigger({ children, className, ...props }: PropsWithChildren & ComponentProps<typeof Dialog.Trigger>) {
  const { open, name } = useZoom()

  return (
    <Dialog.Trigger {...props} className={cn(`h-full w-full`, open ? 'invisible' : '', className)}>
      {open ? (
        children
      ) : (
        <ViewTransition name={name} share="zoom">
          {children}
        </ViewTransition>
      )}
    </Dialog.Trigger>
  )
}

function Content({ children }: PropsWithChildren) {
  const { open, name } = useZoom()

  return (
    <Dialog.Portal forceMount>
      {open && (
        <>
          <Dialog.Overlay className="fixed inset-0 z-10 bg-black/40 backdrop-blur-xs" />
          <Dialog.Content className="fixed top-1/2 left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 shadow-lg focus:outline-none">
            <ViewTransition name={name} share="zoom">
              {children}
            </ViewTransition>
          </Dialog.Content>
        </>
      )}
    </Dialog.Portal>
  )
}

export const ZoomIn = Object.assign(Root, { Root, Trigger, Content })
