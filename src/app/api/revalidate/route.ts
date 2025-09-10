import { revalidatePath } from 'next/cache'

export function POST() {
  revalidatePath('/')
  return new Response('Revalidated', { status: 200 })
}
