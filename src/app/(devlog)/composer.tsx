'use client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getAuth } from './devlog-atproto-oauth'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { Schema } from 'effect'

export function Composer() {
  const { data } = useQuery({ queryKey: ['user'], queryFn: async () => getAuth() })
  const { mutateAsync: postDevlog } = useMutation({
    mutationFn: async ({ text }: { text: string }) => {
      if (!data?.writer) return
      const writer = data.writer

      return writer.createRecord({ $type: 'app.bsky.feed.post', text, createdAt: new Date().toISOString() })
    },
  })

  const { register, handleSubmit } = useForm({
    resolver: standardSchemaResolver(Schema.toStandardSchemaV1(Schema.Struct({ text: Schema.String }))),
  })

  const writer = data?.writer
  if (!writer) return null

  return (
    <div className="mb-2 w-full">
      <form
        className="flex flex-col bg-black"
        onSubmit={handleSubmit(async (fields) => {
          console.log(fields)

          await postDevlog({ text: fields.text })
        })}
      >
        <textarea {...register('text')} className="field-sizing-content h-full w-full bg-neutral-950" />

        <div className="h-fit self-end">
          <Button>Post</Button>
        </div>
      </form>
    </div>
  )
}
