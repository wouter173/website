'use server'
import { updateTag } from 'next/cache'
import { verifyToken } from './atproto/atproto-server'
import { CONSTANTS } from '../../constants'

export async function invalidateDevlogAction({ token }: { token: string }) {
  await verifyToken(token)

  updateTag(CONSTANTS.cacheTags.devlog)
}
