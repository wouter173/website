import 'client-only'
import { Client } from '@atproto/lex'
import { BrowserOAuthClient } from '@atproto/oauth-client-browser'
import { CONSTANTS } from '../constants'

let initialization: ReturnType<typeof initialize> | undefined

async function initialize() {
  const local = ['localhost', '127.0.0.1'].includes(location.hostname)

  const clientId = local
    ? `http://localhost?${new URLSearchParams({ redirect_uri: 'http://127.0.0.1:3000/devlog', scope: 'atproto transition:generic' })}`
    : `${CONSTANTS.canonicalUrl}/client-metadata.json`

  const oauth = await BrowserOAuthClient.load({
    clientId,
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
  await oauth.signIn(CONSTANTS.did, { scope: 'atproto transition:generic' })
}
