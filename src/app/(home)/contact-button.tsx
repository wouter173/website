"use client"

import { AtIcon } from "@/components/icons/at-icon"
import { Button } from "@/components/ui/button"

export const ContactButton = () => {
  return (
    <Button
      onClick={() => {
        document.getElementById("contact-form")!.scrollIntoView({ behavior: "smooth" })
      }}
      size="rounded"
      className="flex w-min items-center gap-1 border border-neutral-800"
    >
      <AtIcon className="size-3.5" />
      Contact me
    </Button>
  )
}
