'use client'

import { login } from './devlog-atproto-oauth'

export function Header() {
  return (
    <div>
      <h1 className="text-label font-serif text-4xl font-bold dark:text-neutral-200">Devlog</h1>
      <button onClick={() => login()}>login</button>
    </div>
  )
}
