import { cn } from '@/lib/utils'
import { useEffect, useState, type ComponentProps } from 'react'

export const Kbd = ({ keybind, onPress, className }: { keybind?: string; onPress?: () => void } & ComponentProps<'kbd'>) => {
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === keybind) {
        setPressed(true)
        onPress?.()
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === keybind) setPressed(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [keybind, onPress])

  return (
    <kbd
      className={cn(
        'grid aspect-square w-5 place-items-center rounded-md border border-b-2 border-neutral-200 bg-neutral-100 text-center font-mono text-xs font-bold dark:border-[#1f1f1f] dark:bg-black',
        pressed && 'translate-y-px text-black dark:text-white',
        className,
      )}
    >
      {keybind}
    </kbd>
  )
}
