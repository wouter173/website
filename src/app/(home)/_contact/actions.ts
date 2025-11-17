'use server'

import { env } from '@/env'
import { setTimeout } from 'node:timers/promises'
import { contactFormSchema } from './schema'

export async function submitContactAction(data: unknown): Promise<{ success: true } | { success: false }> {
  try {
    const payload = contactFormSchema.parse(data)

    await setTimeout(1000)

    await fetch(env.WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [
          {
            fields: [
              { name: 'Name', value: payload.name, inline: true },
              { name: '', value: '', inline: true },
              { name: 'Email', value: payload.email, inline: true },
              { name: 'Message', value: `\`\`\`${payload.message}\`\`\``, inline: false },
            ],
          },
        ],
      }),
    })

    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}
