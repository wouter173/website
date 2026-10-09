import { Client } from '@atproto/lex'
import { CONSTANTS } from '../constants'

const reader = new Client(CONSTANTS.devlogUrl)

export async function getDevlogPosts() {
  return reader.listRecords('app.bsky.feed.post', { repo: CONSTANTS.did, limit: 100 })
}
