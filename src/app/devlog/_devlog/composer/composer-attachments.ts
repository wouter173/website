import type { Client, LexMap } from '@atproto/lex'
import type { attachmentSchema } from '../schema'
import { uploadVideo } from './composer-video-upload'

export const MAX_IMAGES = 4
export const MAX_IMAGE_BYTES = 2_000_000
export const MAX_VIDEO_BYTES = 300_000_000

export function getMediaError(files: File[], type: 'images' | 'video', existingImages = 0): string | undefined {
  const isImage = type === 'images'

  if (isImage && files.length + existingImages > MAX_IMAGES) {
    return 'You can attach up to four images.'
  }
  if (!isImage && files.length !== 1) return 'You can attach one video.'
  if (!files.length) return 'Choose at least one image.'

  const acceptedTypes = isImage ? ['image/jpeg', 'image/png', 'image/webp'] : ['video/mp4']
  const maxBytes = isImage ? MAX_IMAGE_BYTES : MAX_VIDEO_BYTES

  for (const file of files) {
    if (!file.size) return `${file.name} is empty.`
    if (!acceptedTypes.includes(file.type)) {
      return isImage ? 'Choose a JPEG, PNG, or WebP image.' : 'Choose an MP4 video.'
    }
    if (file.size > maxBytes) {
      return `${file.name} exceeds the ${isImage ? '2 MB image' : '300 MB video'} limit.`
    }
  }
}

async function getImageDimensions(file: File) {
  const url = URL.createObjectURL(file)
  const image = new Image()

  try {
    image.src = url
    await image.decode()

    return { width: image.naturalWidth, height: image.naturalHeight }
  } finally {
    URL.revokeObjectURL(url)
  }
}

async function getVideoDimensions(file: File) {
  const url = URL.createObjectURL(file)
  const video = document.createElement('video')

  try {
    video.preload = 'metadata'

    await new Promise<void>((resolve, reject) => {
      video.onloadedmetadata = () => resolve()
      video.onerror = () => reject(new Error('Could not read video dimensions.'))
      video.src = url
    })

    if (!video.videoWidth || !video.videoHeight) {
      throw new Error('The file has no video dimensions.')
    }

    return { width: video.videoWidth, height: video.videoHeight }
  } finally {
    video.onloadedmetadata = null
    video.onerror = null
    video.removeAttribute('src')
    video.load()
    URL.revokeObjectURL(url)
  }
}

export async function createPostEmbed(writer: Client, attachment: typeof attachmentSchema.Type, videoPdsUrl?: string): Promise<LexMap> {
  const files = attachment.type === 'image' ? attachment.images.map(({ file }) => file) : [attachment.video.file]

  const error = getMediaError(files, attachment.type === 'image' ? 'images' : 'video')
  if (error) throw new Error(error)

  if (attachment.type === 'video') {
    if (!videoPdsUrl) {
      throw new Error('Could not determine your PDS for video upload.')
    }

    const file = attachment.video.file
    const aspectRatio = await getVideoDimensions(file)
    const video = await uploadVideo(writer, file, videoPdsUrl)

    return { $type: 'app.bsky.embed.video', video, aspectRatio }
  }

  const images = await Promise.all(
    attachment.images.map(async ({ file }) => {
      const aspectRatio = await getImageDimensions(file)
      const { body } = await writer.uploadBlob(file)

      return { image: body.blob, alt: '', aspectRatio }
    }),
  )

  return { $type: 'app.bsky.embed.images', images }
}
