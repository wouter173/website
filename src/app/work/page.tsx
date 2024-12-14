import { Footer } from "@/components/footer"
import { PostCard } from "@/components/posts"
import { Title } from "@/components/title"
import { Post, getPosts } from "@/server/posts"

export default function Blog() {
  return (
    <div className="min-h-screen w-full">
      <div className="absolute -z-10 h-full w-full">
        <div className="mx-auto grid h-full max-w-[904px] grid-cols-2 gap-2">
          <div className="border-x-2 border-dashed border-[rgba(109,109,109,0.07)]" />
          <div className="border-x-2 border-dashed border-[rgba(109,109,109,0.07)]" />
        </div>
      </div>
      <div className="py-32 lg:py-56">
        <Posts />
      </div>
      <Footer />
    </div>
  )
}

const Posts = async () => {
  const posts = await getPosts()

  const postPerYear = posts.reduce(
    (acc, post) => {
      const year = new Date(post.metadata.publishedAt).getFullYear()
      if (acc[year]) acc[year].push(post)
      else acc[year] = [post]
      return acc
    },
    {} as Record<number, Post[]>,
  )

  return (
    <div className="mx-auto flex w-full flex-col gap-24 px-4 lg:px-0">
      {Object.entries(postPerYear)
        .reverse()
        .map(([key, posts]) => (
          <div key={key}>
            <div className="mx-auto max-w-4xl">
              <Title as="h2" className="text-3xl">
                {key}
              </Title>
            </div>

            <div className="my-2 w-full border-b-2 border-dashed border-[rgba(109,109,109,0.05)]"></div>

            <div className="mx-auto grid max-w-4xl gap-4 lg:grid-cols-2">
              {posts.map((post, i) => {
                return <PostCard post={post} key={post.slug} style={getSeededOffset(i)} />
              })}
            </div>
          </div>
        ))}
    </div>
  )
}

const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

// Function to generate a small rotation and translation based on seed (index `i`)
const getSeededOffset = (i: number) => {
  const rotation = seededRandom(i) * 1 - 0.5 // Rotation between -1deg and 1deg
  const translateX = seededRandom(i + 2) * 2 - 1 // TranslateX between -1px and 1px
  const translateY = seededRandom(i + 2) * 1 - 0.5 // TranslateY between -1px and 1px

  return {
    transform: `rotate(${rotation}deg) translate(${translateX}px, ${translateY}px)`,
  }
}
