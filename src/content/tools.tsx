import { ExternalLink } from "@/components/external-link"

export const tools = [
  {
    name: "Lucide",
    thumbnail: "/tools/lucide.svg",
    description:
      "Lucide is my go to icon set for building ui. It has great integrations with React and Figma which are my daily drivers for ui.",
    url: "https://lucide.dev",
    tags: [],
  },
  {
    name: "Sanity",
    thumbnail: "/tools/sanity.svg",
    description: (
      <p>
        Sanity is a headless CMS that integrates with Next.js to create a custom content dashboard for your application. I used it building
        the <ExternalLink href="https://bluethrone.io">Bluethrone website</ExternalLink>
      </p>
    ),
    url: "https://sanity.io",
    tags: [],
  },
  {
    name: "Node",
    thumbnail: "/tools/node.svg",
    description: (
      <p>
        Node is THE js runtime I use with almost every project nowadays. A real game changer in understanding how fragile computers are, was{" "}
        <ExternalLink href="https://www.youtube.com/watch?v=8aGhZQkoFbQ">this talk</ExternalLink> about the event loop.
      </p>
    ),
    url: "https://nodejs.org",
    tags: [],
  },
  {
    name: "Figma",
    thumbnail: "/tools/figma.svg",
    description:
      "Figma is my tool of choice for doing design work, although I don't do design that often. The community, plugins and usability is just great. (and free) (mostly)",
    url: "https://figma.com",
    tags: ["design", "ui"],
  },
  {
    name: "Vue",
    thumbnail: "/tools/vue.svg",
    description:
      "Vue is not a framework I'm the biggest fan of, however I have worked and built projects on vue in the past. It's a great tool for building web applications.",
    url: "https://vuejs.org",
    tags: [],
  },
  {
    name: "Tailwind",
    thumbnail: "/tools/tailwind.svg",
    description:
      "I'm a very big tailwind fan, I use it in almost every project at work and at home. I love how to colocates my styles with my logic.",
    url: "https://tailwindcss.com",
    tags: ["ui", "css"],
  },
  {
    name: "React",
    thumbnail: "/tools/react.svg",
    description:
      "React is my go to framework for building anything web related. I have built many personal and profesional products with it.",
    url: "https://react.dev",
    tags: ["ui"],
  },
  {
    name: "Vercel",
    thumbnail: "/tools/vercel.svg",
    description:
      "Vercel is the cloud provider I usually go to for hosting my projects, especially when using Next. The deployment experience is absolutely amazing!",
    url: "https://vercel.com",
    tags: ["cloud", "hosting", "serverless"],
  },
  {
    name: "Next",
    thumbnail: "/tools/next.svg",
    description:
      "Next is the most forward thinking framework I have used to date. Although I'm not completely behind every choice it makes, I believe it to be the most competent framework for building highly interactive and performant web apps.",
    url: "https://nextjs.org",
    tags: ["ui", "framework"],
  },
  {
    name: "Framer motion",
    thumbnail: "/tools/framer-motion.svg",
    description:
      "Framer motion is my favorite library to use for animations, it's simple and powerful. I have used it in my projects to create awesome user experiences.",
    url: "https://www.framer.com/motion",
    tags: ["ui", "animation"],
  },
  {
    name: "Angular",
    thumbnail: "/tools/angular.svg",
    description:
      "Angular is a framework I picked up while doing school projects. Even though I don't like MVC, I appreciate the future it has given us.",
    url: "https://angular.io",
    tags: [],
  },
  {
    name: "Github",
    thumbnail: "/tools/github.svg",
    description: (
      <p>
        Github is of course the way to share and collaborate on code. I use it for everything{" "}
        <ExternalLink href="https://github.com/wouter173/website">even this site!</ExternalLink>
      </p>
    ),
    url: "https://github.com",
    tags: [],
  },
  {
    name: "Three",
    thumbnail: "/tools/threejs.svg",
    description:
      "Three is a tool that I've been experimenting with lately to build 3d and shader based experiences on the web. The rays on the top of this page are made with three.",
    url: "https://threejs.org",
    tags: [],
  },
  {
    name: "Payload",
    thumbnail: "/tools/payload.svg",
    description:
      "Payload would be my advise for a headless CMS if it weren't in beta at the moment. It's building a tight integration with Next.js at the moment and can't wait to see where it goes.",
    url: "https://payloadcms.com",
    tags: [],
  },
  {
    name: "Astro",
    thumbnail: "/tools/astro.svg",
    description: "Astro is a tool that I've occasionally been using as a replacement for Vite + React.",
    url: "https://astro.build",
    tags: ["static", "generator"],
  },
  {
    name: "Deno",
    thumbnail: "/tools/deno.svg",
    description: (
      <p>
        Deno is the natural succesor of node, according to{" "}
        <ExternalLink href="https://www.youtube.com/watch?v=M3BM9TB-8yA">Ryan Dahl</ExternalLink>. Personally, I've found it to be the best{" "}
        <ExternalLink href="https://github.com/wouter173/Advent-of-Code"> Advent of Code tool</ExternalLink>.
      </p>
    ),
    url: "https://deno.land",
    tags: ["runtime", "web"],
  },
  {
    name: "Docker",
    thumbnail: "/tools/docker.svg",
    description: "Docker is the best way of containerizing your applications for deployment.",
    url: "https://www.docker.com",
    tags: ["containerization", "tool"],
  },
  {
    name: "Python",
    thumbnail: "/tools/python.svg",
    description:
      "Python is the very first programming language I learned when I was 12. I still use it when I have to create a quick program, and even some embedded with micropython",
    url: "https://www.python.org",
    tags: ["web", "framework"],
  },
  {
    name: "Radix ui",
    thumbnail: "/tools/radix-ui.svg",
    description: "Radix ui is a set of headless ui components which I use for all my professional projects.",
    url: "https://www.radix-ui.com",
    tags: ["ui", "library"],
  },
  {
    name: "Rust",
    thumbnail: "/tools/rust.svg",
    description:
      "Rust is a language focussed on memory safety and performance, I am currently learning and using it to build embedded projects on esp32's for home automations with zigbee.",
    url: "https://www.rust-lang.org",
    tags: ["systems", "language"],
  },
  {
    name: "Stripe",
    thumbnail: "/tools/stripe.svg",
    description:
      "Stripe is a payment provider I've worked with a bunch. It's a great tool for doing subscriptions and one time payments for SaaS products.",
    url: "https://stripe.com",
    tags: ["payment", "platform"],
  },
  {
    name: "Turborepo",
    thumbnail: "/tools/turborepo.png",
    description:
      "Turborepo is one of the newest tools in my stack. It's a monorepo tool to manage all your shared code and applications in one repository.",
    url: "https://turborepo.org",
    tags: ["monorepo", "tool"],
  },
  {
    name: "TypeScript",
    thumbnail: "/tools/typescript.svg",
    description:
      "TypeScript is a superset of JavaScript that adds static typing and other features to the language. It is a popular choice for creating scalable and maintainable applications.",
    url: "https://www.typescriptlang.org",
    tags: ["static", "typing"],
  },
]
