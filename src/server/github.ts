import { unstable_cache } from "next/cache"
import { z } from "zod"

const baseUrl = "https://api.github.com/graphql"
const query = `
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
}`

export const getGithubUserData = unstable_cache(
  async () => {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      console.error(await response.text())
      throw new Error("Failed to fetch github user")
    }

    const json = await response.json()

    const payload = z
      .object({
        data: z.object({
          user: z.object({
            url: z.string(),
            login: z.string(),
            repositories: z.object({
              totalCount: z.number(),
            }),
            contributionsCollection: z.object({
              contributionCalendar: z.object({
                totalContributions: z.number(),
              }),
            }),
          }),
        }),
      })
      .parse(json)

    console.log("Fetched github user: ", payload.data.user.login)
    return payload.data
  },
  ["github", "user", "data"],
  { revalidate: 60 * 60 * 24 },
)
