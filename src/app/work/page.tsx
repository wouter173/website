import { ExternalLink } from '@/components/external-link'

export default function Page() {
  return (
    <div className="flex flex-col gap-4 text-neutral-600">
      <div className="flex flex-col gap-1">
        <h2>
          <span className="font-semibold">2023 - Today</span> —{' '}
          <ExternalLink href="https://theblank.studio/">The Blank Studio</ExternalLink>
        </h2>
        <p className="text-sm text-neutral-500">
          Building a bunch of awesome SaaS products with Next.js and other innovative technologies. Working with a team of incredible
          software engineers.
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <h2>
          <span className="font-semibold">2022 - 2023</span> — <ExternalLink href="https://stats.fm/">Stats.fm</ExternalLink>
        </h2>
        <p className="text-sm text-neutral-500">Moved a Vue.js spa to a Next.js fullstack app @ Stats.fm.</p>
      </div>

      <div className="flex flex-col gap-1">
        <h2>
          <span className="text-neutra font-semibold">2016 - 2021</span> — Self taught
        </h2>
        <p className="text-sm text-neutral-500">
          Learned about a lot of basics in computer science. Specifically about Python and the JS ecocsystem. Also dabbled in a lot of
          random tech like low level and iOS.
        </p>
      </div>
    </div>
  )
}
