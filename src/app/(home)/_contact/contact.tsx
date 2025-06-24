'use client'

import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { getFormProps, getInputProps, getTextareaProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { SendHorizonalIcon } from 'lucide-react'
import { type ComponentProps, useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { toast } from 'sonner'
import { submitContactAction } from './actions'
import { contactFormSchema } from './schema'

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

const ContactForm = () => {
  const [lastResult, action] = useActionState(async (state: unknown, data: FormData) => {
    const result = await submitContactAction(state, data)
    if (result.status === 'success') {
      toast.success('Message sent!')
      form.reset()
    }
    return result
  }, null)

  const [form, fields] = useForm({
    lastResult,
    onValidate: ({ formData }) => parseWithZod(formData, { schema: contactFormSchema }),
    shouldValidate: 'onSubmit',
    shouldRevalidate: 'onInput',
  })

  return (
    <form action={action} {...getFormProps(form)} className="flex flex-col gap-4">
      <Fieldset className="flex flex-col gap-4 text-left">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Input
            label="Name"
            errorLine={fields.name.errors ? fields.name.errors.join(', ') : ''}
            {...getInputProps(fields.name, { type: 'text' })}
            key={fields.name.key}
          />
          <Input
            label="Email"
            errorLine={fields.email.errors ? fields.email.errors.join(', ') : ''}
            {...getInputProps(fields.email, { type: 'text' })}
            key={fields.email.key}
          />
        </div>
        <Textarea
          label="Message"
          errorLine={fields.message.errors ? fields.message.errors.join(', ') : ''}
          className="w-full max-w-full resize-none"
          rows={8}
          {...getTextareaProps(fields.message)}
          key={fields.message.key}
        />
        <SubmitButton />
      </Fieldset>
    </form>
  )
}

const Fieldset = (props: ComponentProps<'fieldset'>) => {
  const { pending } = useFormStatus()
  return <fieldset disabled={pending} {...props} />
}

const SubmitButton = (props: ComponentProps<'button'>) => {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" variant={'primary'} className="group ml-auto h-10 w-fit min-w-24 rounded-full px-4 py-2" {...props}>
      {pending ? (
        <Spinner />
      ) : (
        <>
          Send
          <SendHorizonalIcon className="ml-2 size-4 -rotate-35 transition-transform ease-out group-hover:-rotate-0 group-focus-visible:rotate-0 dark:fill-neutral-600" />
        </>
      )}
    </Button>
  )
}
