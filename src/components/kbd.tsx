import { cn } from '@/lib/utils'
import { useEffect, useEffectEvent, useState, type ComponentProps } from 'react'

export const Kbd = ({
  label,
  keybind,
  onPress,
  className,
}: { label?: string; keybind?: string; onPress?: () => void } & ComponentProps<'kbd'>) => {
  const [pressed, setPressed] = useState(false)

  const handleKeyDown = useEffectEvent((e: KeyboardEvent) => {
    if (e.key !== keybind) return
    setPressed(true)
    onPress?.()
  })

  const handleKeyUp = useEffectEvent((e: KeyboardEvent) => {
    if (e.key !== keybind) return
    setPressed(false)
  })

  useEffect(() => {
    const controller = new AbortController()
    window.addEventListener('keydown', handleKeyDown, { signal: controller.signal })
    window.addEventListener('keyup', handleKeyUp, { signal: controller.signal })

    return () => {
      controller.abort()
    }
  }, [keybind])

  return (
    <kbd
      className={cn(
        'grid h-5 min-w-5 place-items-center rounded-md border border-b-2 border-neutral-200 bg-neutral-100 px-1 text-center font-mono text-xs font-bold dark:border-[#1f1f1f] dark:bg-black',
        pressed && 'translate-y-px text-black dark:text-white',
        className,
      )}
    >
      {label ? label : keybind}
    </kbd>
  )
}
