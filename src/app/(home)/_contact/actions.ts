'use server'

import { env } from '@/env'
import { parseWithZod } from '@conform-to/zod'
import { setTimeout } from 'node:timers/promises'
import { contactFormSchema } from './schema'

export async function submitContactAction(_prevState: unknown, data: FormData) {
  const submission = parseWithZod(data, { schema: contactFormSchema })

  await setTimeout(1000)

  await fetch(env.WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      embeds: [
        {
          fields: [
            { name: 'Name', value: submission.payload.name, inline: true },
            { name: '', value: '', inline: true },
            { name: 'Email', value: submission.payload.email, inline: true },
            { name: 'Message', value: `\`\`\`${submission.payload.message}\`\`\``, inline: false },
          ],
        },
      ],
    }),
  })

  return submission.reply()
}
