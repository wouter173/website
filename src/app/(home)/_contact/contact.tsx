'use client'

import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CheckIcon, SendHorizonalIcon } from 'lucide-react'
import { useState, type ComponentProps } from 'react'
import { submitContactAction } from './actions'
import { contactFormSchema } from './schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'motion/react'

export const Contact = () => {
  return (
    <>
      <div
        className="border-stroke relative z-20 flex flex-col gap-6 rounded-3xl border bg-[#FFF] p-6 lg:p-8 dark:border-[#1F1F1F] dark:bg-black"
        id="contact-form"
      >
        <ContactForm />
      </div>
    </>
  )
}

type FormState = 'idle' | 'pending' | 'success' | 'error'
const ContactForm = () => {
  const form = useForm({
    resolver: zodResolver(contactFormSchema),
  })

  const [formState, setFormState] = useState<FormState>('idle')

  return (
    <form
      onSubmit={form.handleSubmit(async (data) => {
        setFormState('pending')
        const result = await submitContactAction(data)
        if (result.success) {
          form.reset()
          setFormState('success')
          setTimeout(() => setFormState('idle'), 3000)
        } else {
          setFormState('error')
          setTimeout(() => setFormState('idle'), 3000)
        }
        return result
      })}
      className="flex flex-col gap-4"
    >
      <fieldset className="flex flex-col gap-4 text-left" disabled={formState !== 'idle'}>
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Input label="Name" {...form.register('name')} errorLine={form.formState.errors.name?.message} />
          <Input label="Email" {...form.register('email')} errorLine={form.formState.errors.email?.message} />
        </div>
        <Textarea
          label="Message"
          className="w-full max-w-full resize-none"
          rows={8}
          {...form.register('message')}
          errorLine={form.formState.errors.message?.message}
        />
        <SubmitButton formState={formState} />
      </fieldset>
    </form>
  )
}

const SubmitButton = ({ formState, ...props }: ComponentProps<'button'> & { formState: FormState }) => {
  return (
    <Button disabled={formState !== 'idle'} type="submit" variant={'primary'} asChild {...props}>
      <motion.button
        className="group ml-auto h-10 w-fit min-w-24 rounded-full px-4 py-2"
        style={{
          borderColor: formState === 'success' ? 'var(--color-emerald-900)' : undefined,
          backgroundColor: formState === 'success' ? 'var(--color-emerald-800)' : undefined,
          opacity: formState === 'success' ? 1 : undefined,
        }}
        transition={{ duration: 0.2 }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {formState === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="flex items-center"
            >
              Send
              <SendHorizonalIcon className="ml-2 size-4 origin-[35%_50%] -rotate-0 transition-transform ease-out group-hover:-rotate-35 group-focus-visible:rotate-0" />
            </motion.div>
          )}
          {formState === 'pending' && (
            <motion.div
              key="pending"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Spinner />
            </motion.div>
          )}
          {formState === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="flex items-center gap-2 text-emerald-200"
            >
              Sent
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <CheckIcon className="size-5" />
              </motion.div>
            </motion.div>
          )}
          {formState === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              Error!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </Button>
  )
}
