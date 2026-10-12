import { Schema } from 'effect'

export const mediaSchema = Schema.Struct({
  id: Schema.String,
  file: Schema.File,
})

export const attachmentSchema = Schema.Union([
  Schema.Struct({ type: Schema.Literal('video'), video: mediaSchema }),
  Schema.Struct({ type: Schema.Literal('image'), images: Schema.Array(mediaSchema).check(Schema.isNonEmpty()) }),
])

export const aspectRatioSchema = Schema.Struct({
  width: Schema.Number,
  height: Schema.Number,
})

export const postSchema = Schema.Struct({
  rkey: Schema.String,
  topic: Schema.String,
  content: Schema.Struct({ text: Schema.String, attachments: Schema.optional(Schema.Array(attachmentSchema)) }),
  createdAt: Schema.String,
  attachments: Schema.optional(
    Schema.Union([
      Schema.Struct({
        type: Schema.Literal('video'),
        mimeType: Schema.String,
        url: Schema.String,
        aspectRatio: Schema.optional(aspectRatioSchema),
      }),
      Schema.Struct({
        type: Schema.Literal('images'),
        images: Schema.Array(
          Schema.Struct({
            mimeType: Schema.String,
            url: Schema.String,
            aspectRatio: Schema.optional(aspectRatioSchema),
          }),
        ),
      }),
      Schema.Struct({
        type: Schema.Literal('embed'),
        title: Schema.String,
        uri: Schema.String,
        imageUrl: Schema.String,
        description: Schema.String,
      }),
    ]),
  ),
})
