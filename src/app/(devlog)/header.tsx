'use client'

import { Composer } from './composer'
import { LoginDialog } from './login-dialog'

export function Header() {
  return (
    <div>
      <h1 className="text-label font-serif text-4xl font-bold dark:text-neutral-200">Devlog</h1>
      <Composer />
      <LoginDialog />
    </div>
  )
}
