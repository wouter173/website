import { cn } from '@/lib/utils'
import './zoom-in-transitions.css'
import { Dialog } from 'radix-ui'
import {
  createContext,
  startTransition,
  useContext,
  useId,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
  ViewTransition,
  type ComponentProps,
  addTransitionType,
  useLayoutEffect,
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

  const rootSnapshotCleanup = useRef<(() => void) | null>(null)
  const previousOpen = useRef(open)

  useLayoutEffect(() => {
    if (previousOpen.current === open) return
    previousOpen.current = open

    // Keep the root snapshot before React measures the committed transition.
    // Without it, Chromium fails to paint the live fixed overlay at deep scroll.
    const root = document.documentElement
    const previousName = root.style.viewTransitionName
    root.style.viewTransitionName = 'root'
    rootSnapshotCleanup.current = () => {
      root.style.viewTransitionName = previousName
    }
  }, [open])

  useEffect(() => {
    // Release after snapshot capture, or if the component unmounts.
    rootSnapshotCleanup.current?.()
    rootSnapshotCleanup.current = null

    return () => {
      rootSnapshotCleanup.current?.()
      rootSnapshotCleanup.current = null
    }
  }, [open])

  return (
    <ZoomContext value={{ open, name }}>
      <Dialog.Root
        open={open}
        onOpenChange={(next) =>
          startTransition(() => {
            addTransitionType(next ? 'zoom-open' : 'zoom-close')
            setOpen(next)
          })
        }
      >
        {children}
      </Dialog.Root>
    </ZoomContext>
  )
}

function Trigger({ children, ...props }: PropsWithChildren & ComponentProps<typeof Dialog.Trigger>) {
  const { open, name } = useZoom()

  return (
    <Dialog.Trigger {...props} className={cn(`h-full w-full`, open ? 'invisible' : '', props.className)}>
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
