import { ExternalLink } from '@/components/external-link'

export const tools = [
  {
    name: 'Lucide',
    thumbnail: '/tools/lucide.svg',
    description:
      'Lucide is my preferred icon library for UI development. It has good React and Figma integrations for modern web applications.',
    url: 'https://lucide.dev',
    tags: [],
  },
  {
    name: 'Sanity',
    thumbnail: '/tools/sanity.svg',
    description: (
      <>
        Sanity is a headless CMS that works well with Next.js for content management. I used it for the{' '}
        <ExternalLink href="https://bluethrone.io">Bluethrone website</ExternalLink> project.
      </>
    ),
    url: 'https://sanity.io',
    tags: [],
  },
  {
    name: 'Node',
    thumbnail: '/tools/node.svg',
    description: (
      <>
        Node.js is my main JavaScript runtime for most projects. I learned a lot about how computers work from{' '}
        <ExternalLink href="https://www.youtube.com/watch?v=8aGhZQkoFbQ">this presentation</ExternalLink> on the event loop.
      </>
    ),
    url: 'https://nodejs.org',
    tags: [],
  },
  {
    name: 'Figma',
    thumbnail: '/tools/figma.svg',
    description:
      'Figma is my design tool for UI/UX work. The collaboration features, plugins, and interface make it great for design projects.',
    url: 'https://figma.com',
    tags: ['design', 'ui'],
  },
  {
    name: 'Vue',
    thumbnail: '/tools/vue.svg',
    description:
      'Vue.js is a framework I have experience with from various projects. While not my main choice, it provides good tooling for building web applications.',
    url: 'https://vuejs.org',
    tags: [],
  },
  {
    name: 'Tailwind',
    thumbnail: '/tools/tailwind.svg',
    description:
      'Tailwind CSS is my preferred styling solution for most projects. I like how it keeps styles close to markup for faster development.',
    url: 'https://tailwindcss.com',
    tags: ['ui', 'css'],
  },
  {
    name: 'React',
    thumbnail: '/tools/react.svg',
    description: 'React is my main framework for web development. I have built many personal and professional applications using React.',
    url: 'https://react.dev',
    tags: ['ui'],
  },
  {
    name: 'Vercel',
    thumbnail: '/tools/vercel.svg',
    description:
      'Vercel is my preferred platform for hosting projects, especially those built with Next.js. The deployment process and performance are excellent.',
    url: 'https://vercel.com',
    tags: ['cloud', 'hosting', 'serverless'],
  },
  {
    name: 'Next',
    thumbnail: '/tools/next.svg',
    description:
      'Next.js is the most innovative framework I have worked with. While I may not agree with every decision, it provides the best solution for building interactive web applications.',
    url: 'https://nextjs.org',
    tags: ['ui', 'framework'],
  },
  {
    name: 'Framer motion',
    thumbnail: '/tools/motion.svg',
    description:
      'Framer Motion is my go-to animation library for React applications. Its API and features make it easy to create smooth user experiences.',
    url: 'https://www.framer.com/motion',
    tags: ['ui', 'animation'],
  },
  {
    name: 'Angular',
    thumbnail: '/tools/angular.svg',
    description:
      'Angular is a framework I learned during school projects. While I prefer other patterns, I recognize its contributions to web development.',
    url: 'https://angular.io',
    tags: [],
  },
  {
    name: 'Github',
    thumbnail: '/tools/github.svg',
    description: (
      <>
        GitHub is essential for code collaboration and version control. I use it for all my projects, including{' '}
        <ExternalLink href="https://github.com/wouter173/website">this website</ExternalLink>.
      </>
    ),
    url: 'https://github.com',
    tags: [],
  },
  {
    name: 'Three',
    thumbnail: '/tools/threejs.svg',
    description:
      'Three.js is a library I am exploring for creating 3D and shader-based web experiences. The rays animation on this page shows its capabilities.',
    url: 'https://threejs.org',
    tags: [],
  },
  {
    name: 'Payload',
    thumbnail: '/tools/payload.svg',
    description:
      'Payload CMS would be my recommendation for headless content management if it were out of beta. The upcoming Next.js integration looks promising.',
    url: 'https://payloadcms.com',
    tags: [],
  },
  {
    name: 'Astro',
    thumbnail: '/tools/astro.svg',
    description: 'Astro is a static site generator I occasionally use as an alternative to Vite + React for content-focused applications.',
    url: 'https://astro.build',
    tags: ['static', 'generator'],
  },
  {
    name: 'Deno',
    thumbnail: '/tools/deno.svg',
    description: (
      <>
        Deno is the evolution of Node.js, as described by{' '}
        <ExternalLink href="https://www.youtube.com/watch?v=M3BM9TB-8yA">Ryan Dahl</ExternalLink>. I have found it useful for{' '}
        <ExternalLink href="https://github.com/wouter173/Advent-of-Code">Advent of Code</ExternalLink> solutions.
      </>
    ),
    url: 'https://deno.land',
    tags: ['runtime', 'web'],
  },
  {
    name: 'Docker',
    thumbnail: '/tools/docker.svg',
    description:
      'Docker is my preferred solution for containerizing applications for deployment. It provides consistent environments across development and production.',
    url: 'https://www.docker.com',
    tags: ['containerization', 'tool'],
  },
  {
    name: 'Python',
    thumbnail: '/tools/python.svg',
    description:
      'Python was my first programming language, learned at age 12. I still use it for quick scripts, automation, and embedded development with MicroPython.',
    url: 'https://www.python.org',
    tags: ['web', 'framework'],
  },
  {
    name: 'Radix ui',
    thumbnail: '/tools/radix-ui.svg',
    description: 'Radix UI provides accessible, unstyled UI components that I use in professional projects for building design systems.',
    url: 'https://www.radix-ui.com',
    tags: ['ui', 'library'],
  },
  {
    name: 'Rust',
    thumbnail: '/tools/rust.svg',
    description:
      'Rust is a systems programming language focused on memory safety and performance. I am learning it for embedded development projects, particularly ESP32-based home automation with Zigbee.',
    url: 'https://www.rust-lang.org',
    tags: ['systems', 'language'],
  },
  {
    name: 'Stripe',
    thumbnail: '/tools/stripe.svg',
    description:
      'Stripe is a payment platform I have worked with extensively. It provides good APIs for implementing subscriptions and one-time payments in SaaS applications.',
    url: 'https://stripe.com',
    tags: ['payment', 'platform'],
  },
  {
    name: 'Turborepo',
    thumbnail: '/tools/turborepo.png',
    description:
      'Turborepo is a monorepo tool I have recently started using. It helps manage shared code and multiple applications in one repository.',
    url: 'https://turborepo.org',
    tags: ['monorepo', 'tool'],
  },
  {
    name: 'TypeScript',
    thumbnail: '/tools/typescript.svg',
    description:
      'TypeScript is a JavaScript superset that adds static typing and other features. It is my preferred choice for building maintainable applications.',
    url: 'https://www.typescriptlang.org',
    tags: ['static', 'typing'],
  },
]
