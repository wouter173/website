import { Link } from 'next-view-transitions'
import { cn } from '@/lib/utils'

const items = [
  {
    url: 'https://buildinamsterdam.com/',
    title: 'Build in Amsterdam',
    description:
      'Getting to work on high profile e-commerce projects as a fullstack intern. Building with an Awesome team, Next.js, Sanity, Shopify, and Firebase for Polaroid.',
    date: '2025',
  },
  {
    url: 'https://ecomflow.com/',
    title: 'Ecomflow @ The Blank Studio',
    description:
      'Building a bunch of awesome SaaS products with Next.js and other innovative technologies. Working with a team of incredible software engineers.',
    date: '2023 - 2025',
  },
  {
    url: 'https://stats.fm/',
    title: 'Stats.fm',
    description: 'Building a fullstack app with Next.js and Prisma. Working on the Spotify integration and the new web app.',
    date: '2022 - 2023',
  },
  {
    title: 'Self taught',
    description:
      'Learned about a lot of basics in computer science. Specifically about Python and the JS ecocsystem. Also dabbled in a lot of random tech like low level and iOS.',
    date: '2016 - 2021',
  },
]

export default function Page() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-4xl pt-24">
      <h1 className="text-label text-3xl font-bold">Work</h1>
      <ol className="flex flex-col gap-2 pt-8">
        {items.map((item, i) => (
          <li key={i}>
            <Link
              className={cn(
                '-mx-3.5 flex flex-col gap-1 rounded-xl p-4 transition-all hover:bg-white active:scale-[0.98]',
                item.url || 'pointer-events-none',
              )}
              href={item.url || ''}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-label shrink-0 text-lg font-semibold">{item.title}</h2>
                <hr className="mx-4 h-px w-full border-none bg-[#e0e2e6]" />
                <span className="shrink-0 text-right text-sm text-[#2D2F32]">{item.date}</span>
              </div>
              <p className="text-sm text-balance text-[#46474BB2]">{item.description}</p>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  )
}
