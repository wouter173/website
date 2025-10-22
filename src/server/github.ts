import { cacheLife, unstable_cache } from 'next/cache'

import { FetchHttpClient, HttpBody, HttpClient, HttpClientRequest, HttpClientResponse } from '@effect/platform'
import { Config, Effect, Schema } from 'effect'

const baseUrl = 'https://api.github.com/graphql'
const query = `#graphql
  query {
    user(login: "wouter173") {
      url
      login
      repositories(visibility: PUBLIC) {
        totalCount
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
        }
      }
    }
  }
`

const payloadSchema = Schema.Struct({
  data: Schema.Struct({
    user: Schema.Struct({
      url: Schema.String,
      login: Schema.String,
      repositories: Schema.Struct({
        totalCount: Schema.Number,
      }),
      contributionsCollection: Schema.Struct({
        contributionCalendar: Schema.Struct({
          totalContributions: Schema.Number,
        }),
      }),
    }),
  }),
})

const fetchGithubUserDataEffect = Effect.gen(function* () {
  const httpClient = yield* HttpClient.HttpClient

  const githubToken = yield* Config.string('GITHUB_BEARER_TOKEN')
  const body = yield* HttpBody.json({ query }).pipe(Effect.catchTag('HttpBodyError', () => Effect.succeed(HttpBody.empty)))

  const payload = yield* HttpClientRequest.post(baseUrl, { body, acceptJson: true }).pipe(
    HttpClientRequest.bearerToken(githubToken),
    httpClient.execute,
    Effect.andThen(HttpClientResponse.filterStatusOk),
    Effect.andThen(HttpClientResponse.schemaBodyJson(payloadSchema)),
  )

  yield* Effect.logInfo('Fetched github user: ', payload.data.user.login)

  return payload.data
}).pipe(Effect.provide(FetchHttpClient.layer))

export async function getGithubUserDataCached() {
  'use cache'
  cacheLife('days')

  return Effect.runPromise(fetchGithubUserDataEffect)
}
