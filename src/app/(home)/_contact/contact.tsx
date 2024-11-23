"use client"

import { Spinner } from "@/components/spinner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getFormProps, getInputProps, getTextareaProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { SendHorizonalIcon } from "lucide-react"
import { ComponentProps, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner"
import { submitContactAction } from "./actions"
import { contactFormSchema } from "./schema"

export const Contact = () => {
  return (
    <>
      <div className="relative z-20 flex flex-col gap-6 rounded-3xl border border-[#1F1F1F] bg-[#0A0A0B] p-6 shadow-sm lg:p-8">
        <h2 className="col-span-2 text-left text-lg font-semibold text-neutral-200 lg:text-2xl">
          &hellip; or reach out to me with a message!
        </h2>
        <ContactForm />
      </div>
    </>
  )
}

const ContactForm = () => {
  const [lastResult, action] = useActionState(async (state: unknown, data: FormData) => {
    const result = await submitContactAction(state, data)
    if (result.status === "success") {
      toast.success("Message sent!")
      form.reset()
    }
    return result
  }, null)

  const [form, fields] = useForm({
    lastResult,
    onValidate: ({ formData }) => parseWithZod(formData, { schema: contactFormSchema }),
    shouldValidate: "onSubmit",
    shouldRevalidate: "onInput",
  })

  return (
    <form action={action} {...getFormProps(form)} className="flex flex-col gap-4" id="contact-form">
      <Fieldset className="flex flex-col gap-4 text-left">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Input
            label="Name"
            errorLine={fields.name.errors ? fields.name.errors.join(", ") : ""}
            {...getInputProps(fields.name, { type: "text" })}
            key={fields.name.key}
          />
          <Input
            label="Email"
            errorLine={fields.email.errors ? fields.email.errors.join(", ") : ""}
            {...getInputProps(fields.email, { type: "text" })}
            key={fields.email.key}
          />
        </div>
        <Textarea
          label="Message"
          errorLine={fields.message.errors ? fields.message.errors.join(", ") : ""}
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

const Fieldset = (props: ComponentProps<"fieldset">) => {
  const { pending } = useFormStatus()
  return <fieldset disabled={pending} {...props} />
}

const SubmitButton = (props: ComponentProps<"button">) => {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" variant={"primary"} className="ml-auto w-fit min-w-24 rounded-lg" {...props}>
      {pending ? (
        <Spinner />
      ) : (
        <>
          Send
          <SendHorizonalIcon className="ml-2 size-4" />
        </>
      )}
    </Button>
  )
}
