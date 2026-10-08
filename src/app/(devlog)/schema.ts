import { Schema } from 'effect'

export const attachmentSchema = Schema.Struct({
  type: Schema.Literals(['video', 'image']),
})

export const postSchema = Schema.Struct({
  topic: Schema.String,
  content: Schema.Struct({ text: Schema.String, attachments: Schema.optional(Schema.Array(attachmentSchema)) }),
  createdAt: Schema.DateTimeUtc,
})
