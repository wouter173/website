import { z } from 'zod'

export const contactFormSchema = z.object({
  email: z.email({ message: 'Please enter a valid email.' }).max(50, { message: 'Email is too long.' }),
  name: z
    .string({ error: 'Please enter your name.' })
    .min(2, { error: 'Your name is too short. (min: 2)' })
    .max(50, { message: 'Your name is too long. (max: 50)' }),
  message: z
    .string({ error: 'Please enter a message' })
    .min(10, { message: 'Your message is too short. (min: 10)' })
    .max(1750, { message: 'Your message is too long. (max: 1750)' }),
})
