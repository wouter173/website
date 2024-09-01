import { env } from "@/env"
import { unstable_cache } from "next/cache"
import { z } from "zod"

export const getXUserData = unstable_cache(
  async () => {
    return {
      data: {
        id: "1464550547306987520",
        username: "wouterdebruijn",
        name: "Wouter",
        public_metrics: {
          followers_count: 173,
          following_count: 306,
          tweet_count: 150,
          listed_count: 0,
          like_count: 1354,
        },
        profile_image_url: "https://pbs.twimg.com/profile_images/1564019601981194241/Ba2IT3R1_normal.jpg",
        url: "https://twitter.com/wouterdebruijn",
      },
    }

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

    const data = z.object({
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

    return data.parse(json)
  },
  ["x", "user", "data"],
  {
    revalidate: 60 * 60 * 24,
  },
)
