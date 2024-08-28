import { AtIcon } from "@/components/icons/at-icon"
import { ChevronRightIcon } from "@/components/icons/chevron-right-icon"
import { ExternalIcon } from "@/components/icons/external-icon"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { Link } from "next-view-transitions"
import { readFile } from "node:fs/promises"
import { Contact } from "./contact"
import { Footer } from "./footer"
import { Rays } from "./rays"
import { Tool, Tools } from "./tools"

export default async function Page() {
  const tools = await getTools()

  return (
    <div className="min-h-screen w-full ">
      <header className="relative flex h-[90vh] max-h-[1000px] min-h-[900px] w-full flex-col">
        <div className="absolute inset-0 h-full w-full">
          <Rays />
        </div>

        <div className="relative z-20 mx-auto grid h-full max-w-4xl place-items-center">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <span className="font-semibold text-[#b4b5b7]/50">Hi, I&apos;m</span>
              <h1 className="block w-full bg-[linear-gradient(91deg,rgba(244,244,245,0.80)_45.8%,#000_113.79%);] bg-clip-text text-6xl font-extrabold text-transparent opacity-50">
                Wouter de Bruijn
              </h1>
            </div>
            <div className="flex justify-center gap-2">
              <Button
                asChild
                size="rounded"
                className="flex w-min items-center gap-1 overflow-hidden border border-neutral-800 active:scale-100"
              >
                <a href="mailto:wouter@debruijn.dev">
                  <AtIcon className="size-3.5" />
                  Contact me
                </a>
              </Button>

              <Button
                asChild
                size="rounded"
                className="flex w-min items-center border-2 border-slate-100 bg-slate-100 pr-1.5 text-black transition-all hover:border-black hover:bg-slate-100 hover:outline hover:outline-2 hover:outline-white/40"
              >
                <Link href="/work">
                  Work <ChevronRightIcon className="size-4 shrink-0" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex flex-col gap-40">
        <div className="relative">
          <Posts />
        </div>

        <div className=" flex flex-col gap-8 text-center">
          {/* <span className="text-center font-medium text-[#6C6C6D]">The tools I use</span> */}

          <div className="relative z-20 mx-auto  w-full max-w-4xl rounded-3xl border border-[#1F1F1F] bg-[#0A0A0B] py-8 shadow-sm">
            <div className="flex flex-col gap-6 px-8">
              {/* <h2 className="col-span-2 text-left text-4xl font-semibold text-neutral-100">Hey there, Wouter here!</h2> */}
              <div className="grid w-full grid-cols-[1fr_1fr] gap-10 text-left">
                <p className="mt-0.5 text-neutral-400">
                  — a Fullstack Developer, largely self taught, and excited to learn new things.
                  <br />
                  <br />
                  At the moment, my focus is finishing school and exploring ways to build the most user friendly and coolest interactions on
                  the web.
                  <br />
                  <br />
                  Through my journey I&apos;ve picked up and mastered a bunch of tools that I use daily and have been using for the past
                  couple of years — listed down below!
                </p>

                <div className="flex flex-col gap-4 text-neutral-400">
                  <div className="flex flex-col gap-1">
                    <h3>
                      <span className="text-neutra font-semibold">2016 - 2021</span> — Self taught
                    </h3>
                    <p className="text-sm text-neutral-500">
                      Learned about a lot of basics in computer science. Specifically about Python and the JS ecocsystem. Also dabbled in a
                      lot of random tech like low level and iOS.
                    </p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3>
                      <span className="font-semibold">2022 - 2023</span> —{" "}
                      <a
                        href="https://stats.fm/"
                        className="group inline-flex underline hover:text-white"
                        rel="noopener noreferer"
                        target="_blank"
                      >
                        Stats.fm
                        <ExternalIcon className="mt-0.5 size-3 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
                      </a>
                    </h3>
                    <p className="text-sm text-neutral-500">Moved a Vue.js spa to a Next.js fullstack app @ Stats.fm.</p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3>
                      <span className="font-semibold">2023 - Today</span> —{" "}
                      <a
                        href="https://theblank.studio/"
                        className="group inline-flex underline hover:text-white"
                        rel="noopener noreferer"
                        target="_blank"
                      >
                        The Blank Studio
                        <ExternalIcon className="mt-0.5 size-3 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
                      </a>
                    </h3>
                    <p className="text-sm text-neutral-500">
                      Building a bunch of awesome SaaS products with Next.js and other innovative technologies. Working with a team of
                      incredible software engineers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-6 border-[#1F1F1F]" />
            <div className="">
              <Tools tools={tools} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 pb-24 text-center">
          <Contact />
        </div>
        <Footer />
      </main>
    </div>
  )
}

const Posts = async () => {
  // const payload = await getPayload({ config: payloadConfig })
  // const result = await payload.find({
  //   collection: "posts",
  // })

  const post = {
    title: "Hello world",
    description: "This is a test",
  }

  return (
    <div className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-4">
      <article className="relative z-20 -mt-10 flex -rotate-1 flex-col gap-6 overflow-hidden rounded-lg px-6 py-6 shadow-sm transition-all hover:-rotate-2">
        <div className="absolute inset-0 -z-10 bg-[#171718] [clip-path:polygon(0_0,calc(100%-32px)_0,100%_32px,100%_100%,0_100%)]" />
        <div className="absolute right-0 top-0 -z-10 size-8 rounded-bl-lg bg-gradient-to-tr from-[#242425] to-[#141415] shadow-lg [clip-path:polygon(-100%_0%,0%_0%,100%_100%,100%_200%,-100%_200%)]" />
        <div className="flex flex-col gap-4 pr-8">
          <h2 className="text-2xl font-semibold text-neutral-300">{post.title}</h2>
          <p className="text text-neutral-400">{post.description}</p>
        </div>
        <div className="flex justify-end">
          <Button
            asChild
            size="rounded"
            className="flex w-min items-center gap-1 bg-[#2a2a2c] px-2.5 py-1.5 pl-3 text-neutral-100 hover:bg-[#242425]/40"
          >
            <Link href="/work">
              Read more <PlusIcon className="size-4 shrink-0" />
            </Link>
          </Button>
        </div>
      </article>
      <article className="relative z-20 -mt-10 rounded-lg bg-[#0A0A0B] py-20 shadow-sm"></article>
    </div>
  )
}

async function getTools() {
  const json = JSON.parse(await readFile("./content/tools.json", "utf-8")) as Tool[]
  return json
}
