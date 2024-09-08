import { Posts } from "@/components/posts"

export default function Blog() {
  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto max-w-4xl pt-48">
        <h1 className="block w-min bg-white bg-clip-text text-4xl font-extrabold leading-normal text-transparent opacity-50">Work</h1>
        <div className="pt-10">
          <Posts />
        </div>
      </div>
    </div>
  )
}
