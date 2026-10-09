'use client'

import { createLinkEmbed, getLinkEmbedUrlFromText, LinkEmbedPreview, linkEmbedQueryOptions } from '@/app/(devlog)/composer-link-embed'
import { Button } from '@/components/ui/button'
import { useDebounce } from '@/components/use-debounce'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Schema } from 'effect'
import { ImagePlus, Video, X } from 'lucide-react'
import { useEffect, useRef, type ChangeEvent } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import { createPostEmbed, getMediaError, MAX_IMAGES } from './composer-attachments'

import { atprotoAuthQueryOptions } from './devlog-atproto-auth'
import { attachmentSchema, mediaSchema } from './schema'

const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' })

const textSchema = Schema.String.check(Schema.isMaxLength(300))

const formSchema = Schema.Union([
  Schema.Struct({ text: textSchema.check(Schema.isNonEmpty()), attachments: Schema.optional(attachmentSchema) }),
  Schema.Struct({ text: textSchema, attachments: attachmentSchema }),
])

export function Composer() {
  const queryClient = useQueryClient()

  const { data } = useQuery(atprotoAuthQueryOptions)

  const imageInput = useRef<HTMLInputElement>(null)
  const videoInput = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    control,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
  } = useForm({ defaultValues: { text: '' }, resolver: standardSchemaResolver(Schema.toStandardSchemaV1(formSchema)) })

  const text = useWatch({ control, name: 'text' })
  const characterCount = Array.from(segmenter.segment(text)).length

  const attachments = useWatch({ control, name: 'attachments' })
  const embedHref = attachments ? undefined : getLinkEmbedUrlFromText(text)?.href

  const debouncedHref = useDebounce(embedHref)

  const { mutateAsync: postDevlog } = useMutation({
    mutationFn: async ({ fields }: { fields: typeof formSchema.Type }) => {
      if (!data?.writer) throw new Error('Please sign in before posting.')
      const writer = data.writer

      let videoPdsUrl: string | undefined
      if (fields.attachments?.type === 'video') {
        if (!data.session) throw new Error('Please sign in again before uploading a video.')

        const tokenInfo = await data.session!.getTokenInfo()
        videoPdsUrl = tokenInfo.aud
      }

      const metadata = !fields.attachments && embedHref ? await queryClient.query(linkEmbedQueryOptions(embedHref)) : undefined

      const embed = fields.attachments
        ? await createPostEmbed(writer, fields.attachments, videoPdsUrl)
        : metadata
          ? await createLinkEmbed(writer, metadata)
          : undefined

      return writer.createRecord(
        { $type: 'app.bsky.feed.post', text: fields.text, createdAt: new Date().toISOString(), ...(embed ? { embed } : {}) },
        undefined,
      )
    },
  })

  function selectMedia(event: ChangeEvent<HTMLInputElement>, type: 'images' | 'video') {
    const files = Array.from(event.target.files ?? [])
    event.target.value = ''
    if (!files.length) return

    const current = getValues('attachments')
    const attachmentType = type === 'images' ? 'image' : 'video'

    if (current && current.type !== attachmentType) {
      return setError('attachments', { type: 'manual', message: 'Remove the current attachment before choosing another type.' })
    }

    const existingImages = current?.type === 'image' ? current.images : []
    const error = getMediaError(files, type, existingImages.length)

    if (error) {
      return setError('attachments', { type: 'manual', message: error })
    }

    const items = files.map((file) => ({ id: crypto.randomUUID(), file }))

    clearErrors(['attachments'])
    setValue(
      'attachments',
      type === 'images' ? { type: 'image', images: [...existingImages, ...items] } : { type: 'video', video: items[0] },
      { shouldDirty: true, shouldValidate: true },
    )
  }

  function removeMedia(id: string) {
    const current = getValues('attachments')
    if (!current) return

    if (current.type === 'image') {
      const images = current.images.filter((item) => item.id !== id)

      setValue('attachments', images.length ? { type: 'image', images } : undefined, { shouldDirty: true, shouldValidate: true })
    } else if (current.video.id === id) {
      setValue('attachments', undefined, { shouldDirty: true, shouldValidate: true })
    }

    clearErrors(['attachments'])
  }

  const media = attachments?.type === 'image' ? attachments.images : attachments?.type === 'video' ? [attachments.video] : []

  const writer = data?.writer
  if (!writer) return null

  return (
    <form
      className="w-full rounded-2xl border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-black"
      onSubmit={handleSubmit(async (fields) => {
        clearErrors()
        console.log(fields)

        try {
          await postDevlog({ fields })
          reset()
          toast.success('Devlog posted.')
        } catch (error) {
          setError('root', { message: error instanceof Error ? error.message : 'Could not publish your post. Please try again.' })
        }
      })}
    >
      <fieldset disabled={isSubmitting} className="flex min-w-0 flex-col gap-3 disabled:opacity-70">
        <textarea
          {...register('text')}
          onKeyDown={(event) => event.stopPropagation()}
          placeholder="Share a devlog update…"
          className="bg-offwhite field-sizing-content min-h-24 w-full resize-y rounded-lg p-3 text-sm outline-offset-2 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500"
        />
        {errors.text && (
          <p id="composer-text-error" role="alert" className="text-sm text-red-400">
            {errors.text.message}
          </p>
        )}

        {media.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {media.map((item) => (
              <div key={item.id} className="flex min-w-0 flex-col gap-2 rounded-lg border border-neutral-800 p-2">
                <MediaPreview item={item} />
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-xs text-neutral-400">{item.file.name}</span>
                  <Button type="button" aria-label={`Remove ${item.file.name}`} onClick={() => removeMedia(item.id)}>
                    <X className="size-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {debouncedHref ? <LinkEmbedPreview url={debouncedHref} /> : null}

        {errors && (
          <p role="alert" className="text-sm text-red-400">
            {errors.root?.message}
            {errors.form?.message}
            {errors.attachments?.message}
            {errors.text?.message}
          </p>
        )}

        <input
          ref={imageInput}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(event) => selectMedia(event, 'images')}
        />
        <input ref={videoInput} type="file" accept="video/mp4" className="hidden" onChange={(event) => selectMedia(event, 'video')} />

        <div className="flex flex-wrap items-center gap-2">
          {!Boolean(attachments && (attachments.type !== 'image' || attachments.images.length >= MAX_IMAGES)) ? (
            <Button type="button" onClick={() => imageInput.current?.click()} className="gap-1.5">
              <ImagePlus className="size-4" aria-hidden="true" /> Images
            </Button>
          ) : null}

          {!Boolean(attachments) ? (
            <Button type="button" onClick={() => videoInput.current?.click()} className="gap-1.5">
              <Video className="size-4" aria-hidden="true" /> Video
            </Button>
          ) : null}

          <span className={`ml-auto text-xs ${characterCount > 300 ? 'text-red-400' : 'text-neutral-500'}`} aria-live="polite">
            {characterCount}/300
          </span>

          <Button type="submit">{isSubmitting ? 'Posting…' : 'Post'}</Button>
        </div>
      </fieldset>
    </form>
  )
}

function MediaPreview({ item }: { item: typeof mediaSchema.Type }) {
  const image = useRef<HTMLImageElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const isVideo = item.file.type === 'video/mp4'

  useEffect(() => {
    const element = isVideo ? video.current : image.current
    if (!element) return
    const url = URL.createObjectURL(item.file)
    element.src = url
    return () => {
      element.removeAttribute('src')
      URL.revokeObjectURL(url)
    }
  }, [item.file, isVideo])

  if (isVideo)
    return <video ref={video} controls preload="metadata" className="aspect-video w-full rounded-md bg-neutral-950 object-contain" />

  return <img ref={image} alt={item.file.name} className="aspect-video w-full rounded-md bg-neutral-950 object-contain" /> // eslint-disable-line @next/next/no-img-element
}
