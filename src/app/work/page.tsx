import { Footer } from '@/components/footer'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const items = [
  {
    url: 'https://buildinamsterdam.com/',
    title: 'Build in Amsterdam',
    role: 'Intern Fullstack Developer',
    description:
      'Getting to work on high profile e-commerce projects as a Intern Fullstack Developer. Building with a team of incredible designers and developers, Next.js, Sanity and Shopify.',
    date: '2025',
  },
  {
    url: 'https://ecomflow.com/',
    title: 'Ecomflow / The Blank Studio',
    role: 'Fullstack Developer',
    description:
      'Building a bunch of awesome SaaS products with Next.js and other innovative technologies. Working with a team of awesome software engineers.',
    date: '2023 - 2025',
  },
  {
    url: 'https://stats.fm/',
    title: 'Stats.fm',
    role: 'Fullstack Developer',
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

export const metadata = {
  title: 'Work',
  alternates: {
    canonical: '/work',
  },
}

function WorkItem({ title, date, description, role }: { title: string; date: string; description: string; role?: string }) {
  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-label shrink-0 text-lg font-semibold dark:text-neutral-300">{title}</h2>
        <hr className="mx-4 hidden h-px w-full border-none bg-[#e0e2e6] lg:block dark:bg-[#2d2d2d]" />
        <span className="shrink-0 text-left text-sm text-[#2D2F32] lg:text-right dark:text-neutral-500">{date}</span>
      </div>
      {role && <span className="text-label/80 mb-2 text-sm whitespace-nowrap dark:text-neutral-400">{role}</span>}
      <p className="mt-2 text-sm text-balance text-[#46474BB2] dark:text-neutral-500">{description}</p>
    </>
  )
}

export default function Page() {
  return (
    <>
      <main className="relative z-10 mx-auto min-h-[calc(100vh-var(--spacing)*24)] w-full max-w-4xl p-24 px-6 lg:px-0">
        <h1 className="text-label text-3xl font-bold dark:text-neutral-200">Experience</h1>

        <ol className="flex flex-col gap-2 pt-8">
          {items.map((item, i) => (
            <li
              key={i}
              className={cn(
                'has-focus-visible:ring-echo -mx-3.5 flex flex-col gap-1 rounded-xl p-4 transition-all',
                item.url
                  ? 'hover:border-stroke cursor-pointer border border-transparent hover:bg-white active:scale-[0.98] has-focus-visible:bg-white has-focus-visible:ring-2 has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-white has-focus-visible:outline-none dark:hover:border-[#1F1F1F] dark:hover:bg-black dark:has-focus-visible:bg-black dark:has-focus-visible:ring-offset-black'
                  : 'cursor-default',
              )}
            >
              {item.url ? (
                <Link href={item.url} target="_blank" rel="noopener noreferrer" className="outline-none">
                  <WorkItem key={i} date={item.date} description={item.description} title={item.title} role={item.role} />
                </Link>
              ) : (
                <WorkItem key={i} date={item.date} description={item.description} title={item.title} role={item.role} />
              )}
            </li>
          ))}
        </ol>
      </main>
      <Footer />
    </>
  )
}
