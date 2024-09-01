"use server"

import { parseWithZod } from "@conform-to/zod"
import { setTimeout } from "node:timers/promises"
import { contactFormSchema } from "./schema"

export async function submitContactAction(_prevState: unknown, data: FormData) {
  const submission = parseWithZod(data, { schema: contactFormSchema })

  if (submission.status === "success") {
    console.log("success", submission.payload)
  }

  await setTimeout(1000)

  return submission.reply()
}
