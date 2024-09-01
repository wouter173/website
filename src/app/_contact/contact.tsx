"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getFormProps, getInputProps, getTextareaProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { SendHorizonalIcon } from "lucide-react"
import { ComponentProps } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { submitContactAction } from "./actions"
import { contactFormSchema } from "./schema"

export const Contact = () => {
  return (
    <>
      <div className="relative z-20 mx-auto  w-full max-w-4xl rounded-3xl border border-[#1F1F1F] bg-[#0A0A0B] py-8 shadow-sm">
        <div className="flex flex-col gap-6 px-8">
          <h2 className="col-span-2 text-left text-2xl font-semibold text-neutral-200">&hellip; or reach out to me with a message!</h2>
          <ContactForm />
        </div>
      </div>
    </>
  )
}

const ContactForm = () => {
  const [lastResult, action] = useFormState(submitContactAction, null)
  const [form, fields] = useForm({
    lastResult,

    onValidate: ({ formData }) => parseWithZod(formData, { schema: contactFormSchema }),

    shouldValidate: "onSubmit",
    shouldRevalidate: "onInput",
  })

  return (
    <form action={action} {...getFormProps(form)} className="flex flex-col gap-4">
      <PendingDisabledFielset className="flex flex-col gap-4 text-left">
        <div className="grid grid-cols-[1fr_1fr] gap-4">
          <Input
            label="Name"
            errorLine={fields.name.errors ? fields.name.errors.join(", ") : ""}
            {...getInputProps(fields.name, { type: "text" })}
          />
          <Input
            label="Email"
            errorLine={fields.email.errors ? fields.email.errors.join(", ") : ""}
            {...getInputProps(fields.email, { type: "text" })}
            name="email"
          />
        </div>
        <Textarea
          label="Message"
          errorLine={fields.message.errors ? fields.message.errors.join(", ") : ""}
          className="w-full max-w-full resize-none"
          {...getTextareaProps(fields.message)}
          rows={8}
        />
        <Button type="submit" variant={"primary"} className="ml-auto w-fit rounded-lg">
          Send
          <SendHorizonalIcon className="ml-2 size-4" />
        </Button>
      </PendingDisabledFielset>
    </form>
  )
}

const PendingDisabledFielset = (props: ComponentProps<"fieldset">) => {
  const { pending } = useFormStatus()
  return <fieldset {...props} disabled={pending} />
}
