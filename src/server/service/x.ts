import { env } from "@/env"
import { unstable_cache } from "next/cache"
import { z } from "zod"

export const getXUserData = unstable_cache(
  async () => {
    const response = await fetch(
      `https://api.twitter.com/2/users/by/username/wouterdebruijn?user.fields=public_metrics,profile_image_url,url`,
      {
        headers: {
          Authorization: `Bearer ${env.X_BEARER_TOKEN}`,
          // "User-Agent": "v2UserTweetsNodeJS",
        },
      },
    )

    if (!response.ok) {
      console.error(await response.text())
      throw new Error("Failed to fetch x user")
    }

    const json = await response.json()

    const payload = z
      .object({
        data: z.object({
          id: z.string(),
          name: z.string(),
          username: z.string(),
          public_metrics: z.object({
            followers_count: z.number(),
            following_count: z.number(),
            tweet_count: z.number(),
            listed_count: z.number(),
          }),
          profile_image_url: z.string(),
          url: z.string(),
        }),
      })
      .parse(json)

    console.log("Fetched twitter user: ", payload.data.username)
    return payload
  },
  ["x", "user", "data"],
  {
    revalidate: 60 * 60 * 24,
  },
)
