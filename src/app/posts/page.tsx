import { Footer } from '@/components/footer'
import { PostCard } from '@/components/posts'
import { getPosts } from '@/server/posts'
import type { Metadata } from 'next'

const posts = await getPosts()

export const metadata: Metadata = {
  title: 'Posts',
  alternates: {
    canonical: '/posts',
  },
}

export default async function Blog() {
  return (
    <>
      <main className="relative z-10 mx-auto min-h-[calc(100vh-var(--spacing)*24)] w-full max-w-4xl p-24 px-6 lg:px-0">
        <h1 className="text-label text-3xl font-bold dark:text-neutral-200">Posts</h1>
        <div className="-mx-2 grid max-w-4xl gap-4 pt-8 lg:grid-cols-2">
          {posts.map((post, i) => (
            <PostCard post={post} key={post.slug} style={getSeededOffset(i)} />
          ))}
        </div>
      </main>
      <Footer />
    </>
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
