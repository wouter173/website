import { Schema } from 'effect'

export const mediaSchema = Schema.Struct({
  id: Schema.String,
  file: Schema.File,
})

export const attachmentSchema = Schema.Union([
  Schema.Struct({ type: Schema.Literal('video'), video: mediaSchema }),
  Schema.Struct({ type: Schema.Literal('image'), images: Schema.Array(mediaSchema).check(Schema.isNonEmpty()) }),
])

export const postSchema = Schema.Struct({
  topic: Schema.String,
  content: Schema.Struct({ text: Schema.String, attachments: Schema.optional(Schema.Array(attachmentSchema)) }),
  createdAt: Schema.String,
})
