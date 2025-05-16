import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Link } from 'next-view-transitions'

export default async function NotFound() {
  return (
    <>
      <main className="relative z-10 flex h-[90vh] flex-col items-center justify-center">
        <div className="rounded-lg border border-neutral-200 bg-white px-6 py-6">
          <h1 className="text-xl font-bold text-black">404 - Not Found</h1>
          <p className="mt-2 text-sm">The page you are looking for does not exist.</p>
          <Button variant={'primary'} className="mt-8" asChild>
            <Link href="/posts">Check out my posts</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  )
}
