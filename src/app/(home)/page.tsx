import { ExternalLink } from "@/components/external-link"
import { ChevronRightIcon } from "@/components/icons/chevron-right-icon"
import { ExternalIcon } from "@/components/icons/external-icon"
import { Rays } from "@/components/rays"
import { tools } from "@/components/tools"
import { Button } from "@/components/ui/button"
import { getGithubUserData } from "@/server/github"
import { getXUserData } from "@/server/x"
import { Link as ViewTransitionLink } from "next-view-transitions"
import Link from "next/link"
import { Footer } from "../../components/footer"
import { Contact } from "./_contact/contact"
import { ContactButton } from "./contact-button"
import { MobileToolbelt, Toolbelt } from "./tool-belt"

export const revalidate = 86400
export const dynamic = "force-static"

export default async function Page() {
  const xUser = await getXUserData()
  const githubUser = await getGithubUserData()

  return (
    <div className="min-h-screen w-full">
      <div className="pointer-events-none absolute inset-0 h-[90vh] max-h-[1000px] min-h-[900px] w-full">
        <Rays />
      </div>
      <div className="pointer-events-none fixed bottom-0 left-0 z-50 h-16 w-full bg-linear-to-b from-transparent to-black/50"></div>
      <header className="relative flex h-[90vh] max-h-[1000px] w-full flex-col lg:min-h-[900px]">
        <div className="relative z-20 mx-auto -mt-6 grid h-full max-w-4xl place-items-center px-4 lg:mt-0">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <span className="font-semibold text-[#b4b5b7]/50">Hi, I&apos;m</span>
              <h1 className="block w-full bg-[linear-gradient(91deg,rgba(244,244,245,0.80)_45.8%,#000_113.79%);] bg-clip-text text-6xl font-black tracking-tight text-transparent opacity-50">
                Wouter de Bruijn
              </h1>
            </div>
            <div className="grid grid-cols-[116px_116px] gap-2 lg:mx-auto lg:gap-4">
              <ContactButton />

              <Button asChild variant="primary" className="group flex w-min items-center">
                <ViewTransitionLink href="/work">
                  Work <ChevronRightIcon className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </ViewTransitionLink>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex flex-col gap-20 lg:gap-40">
        {/* <div className="relative -mt-14">
          <Posts />
        </div> */}

        <div className="flex flex-col gap-8 px-4 text-center">
          {/* <span className="text-center font-medium text-[#6C6C6D]">The tools I use</span> */}

          <div className="relative z-20 mx-auto w-full max-w-4xl rounded-3xl border border-[#1F1F1F] bg-[#0A0A0B] py-8 shadow-xs">
            <div className="flex flex-col gap-6 px-8">
              {/* <h2 className="col-span-2 text-left text-4xl font-semibold text-neutral-100">Hey there, Wouter here!</h2> */}
              <div className="grid w-full gap-10 text-left lg:grid-cols-[1fr_1fr]">
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
                    <h2>
                      <span className="font-semibold">2023 - Today</span> —{" "}
                      <ExternalLink href="https://theblank.studio/">The Blank Studio</ExternalLink>
                    </h2>
                    <p className="text-sm text-neutral-500">
                      Building a bunch of awesome SaaS products with Next.js and other innovative technologies. Working with a team of
                      incredible software engineers.
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
                      Learned about a lot of basics in computer science. Specifically about Python and the JS ecocsystem. Also dabbled in a
                      lot of random tech like low level and iOS.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <hr className="my-6 border-[#1F1F1F]" />
              <Toolbelt tools={tools} />
            </div>
          </div>
          <div className="lg:hidden">
            <MobileToolbelt tools={tools} />
          </div>
        </div>
        <div className="flex flex-col gap-8 lg:pb-24">
          <h2 className="text-center text-lg text-neutral-400">Follow my work on X or Github &hellip;</h2>
          <div className="mx-auto grid w-full max-w-4xl gap-8 px-4 text-white lg:grid-cols-[1fr_1fr] lg:px-0">
            <Link
              rel="noopener noreferer"
              target="_blank"
              href={xUser.data.url}
              className="group relative z-20 mx-auto flex w-full items-center justify-between rounded-3xl border border-[#1F1F1F] bg-[#0A0A0B] px-6 py-4 text-white shadow-xs outline-[#2a2a2a] transition-all hover:border-black hover:bg-[#0A0A0B] hover:outline-2 focus-visible:border-black focus-visible:outline-2 active:scale-[98%]"
            >
              <div className="flex items-center gap-4">
                <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M24.8579 3.40625H29.2686L19.6326 14.4196L30.9686 29.4063H22.0926L15.1406 20.3169L7.18592 29.4063H2.77259L13.0793 17.6263L2.20459 3.40625H11.3059L17.5899 11.7143L24.8579 3.40625ZM23.3099 26.7663H25.7539L9.97792 5.90758H7.35526L23.3099 26.7663Z"
                    fill="white"
                  />
                </svg>
                <div className="flex flex-col justify-center gap-1 leading-none">
                  <span className="font-semibold">@{xUser.data.username}</span>
                  <div className="flex gap-2 leading-[0px]">
                    <span className="text-sm text-neutral-400">
                      <span className="text-white">{xUser.data.public_metrics.followers_count} </span>
                      Followers
                    </span>
                    <span className="text-sm text-neutral-400">
                      <span className="text-white">{xUser.data.public_metrics.tweet_count} </span>
                      Posts
                    </span>
                  </div>
                </div>
              </div>

              <ExternalIcon className="-mt-1 size-6 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <Link
              rel="noopener noreferer"
              target="_blank"
              href={githubUser.user.url}
              className="group relative z-20 mx-auto flex w-full items-center justify-between rounded-3xl border border-[#1F1F1F] bg-[#0A0A0B] px-6 py-4 text-white shadow-xs outline-[#2a2a2a] transition-all hover:border-black hover:bg-[#0A0A0B] hover:outline-2 focus-visible:border-black focus-visible:outline-2 active:scale-[98%]"
            >
              <div className="flex items-center gap-4">
                <svg width="33" height="33" viewBox="0 0 98 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                    fill="#fff"
                  />
                </svg>
                <div className="flex flex-col justify-center gap-1 leading-none">
                  <span className="font-semibold">{githubUser.user.login}</span>
                  <div className="flex gap-2 leading-[0px]">
                    <span className="text-sm text-neutral-400">
                      <span className="text-white">{githubUser.user.repositories.totalCount} </span>
                      Repositories
                    </span>
                    <span className="text-sm text-neutral-400">
                      <span className="text-white">{githubUser.user.contributionsCollection.contributionCalendar.totalContributions} </span>
                      Contributions
                    </span>
                  </div>
                </div>
              </div>

              <ExternalIcon className="-mt-1 size-6 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="mx-auto w-full max-w-4xl px-4 lg:px-0">
            <Contact />
          </div>
        </div>
        <Footer />
      </main>
    </div>
  )
}
