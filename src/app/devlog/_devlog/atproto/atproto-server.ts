import 'server-only'
import { IdResolver } from '@atproto/identity'
import { verifyJwt } from '@atproto/xrpc-server'
import { CONSTANTS } from '../../../constants'

export async function verifyToken(token: string) {
  const resolver = new IdResolver()
  return await verifyJwt(token, 'did:web:wouterdb.com', 'com.wouterdb.devlog.revalidate', async (issuer, forceRefresh) => {
    if (issuer !== CONSTANTS.did) {
      throw new Error('Unauthorized')
    }

    return resolver.did.resolveAtprotoKey(issuer, forceRefresh)
  })
}
