import { Button } from '@/components/ui/button'
import { Dialog } from 'radix-ui'
import { useEffect, useState } from 'react'
import { login } from './devlog-atproto-auth'

export function LoginDialog() {
  const [open, setOpen] = useState<boolean>(false)

  const onKeyDown = (ev: KeyboardEvent) => {
    if (ev.key === 'l') setOpen((open) => !open)
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-10 bg-black/40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-20 flex max-h-[85vh] min-w-3xs -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-3xl border border-neutral-900 bg-black p-4 shadow-lg focus:outline-none">
          <Dialog.Title className="text-sm font-semibold text-white">Login to PDS</Dialog.Title>
          <Button onClick={() => login()}>Login</Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
