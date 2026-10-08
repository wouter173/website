import 'client-only'
import { Client } from '@atproto/lex'
import { BrowserOAuthClient } from '@atproto/oauth-client-browser'
import { CONSTANTS } from '../constants'

let initialization: ReturnType<typeof initialize> | undefined

async function initialize() {
  const oauth = await BrowserOAuthClient.load({
    clientId: `${CONSTANTS.canonicalUrl}/client-metadata.json`,
    handleResolver: CONSTANTS.devlogUrl,
  })

  const result = await oauth.init()

  return { oauth, writer: result ? new Client(result.session) : undefined }
}

export function getAuth() {
  return (initialization ??= initialize())
}

export async function login() {
  const { oauth } = await getAuth()
  await oauth.signIn(CONSTANTS.did, {
    scope: 'atproto transition:generic',
  })
}
