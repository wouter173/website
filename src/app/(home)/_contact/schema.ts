import { z } from 'zod'

export const contactFormSchema = z.object({
  email: z
    .string({ required_error: 'Please enter your email.' })
    .email({ message: 'Please enter a valid email.' })
    .max(50, { message: 'Email is too long.' }),
  name: z.string({ required_error: 'Please enter your name.' }).max(50, { message: 'Your name is too long. (max: 50)' }),
  message: z
    .string({ required_error: 'Please enter a message' })
    .min(10, { message: 'Your message is too short. (min: 10)' })
    .max(1750, { message: 'Your message is too long. (max: 1750)' }),
})
