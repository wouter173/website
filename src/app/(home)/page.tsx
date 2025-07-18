import { Header } from '@/components/header'
import { ExternalIcon } from '@/components/icons/external-icon'
import { tools } from '@/components/tools'
import { getGithubUserData } from '@/server/github'
import { getXUserData } from '@/server/x'
import Link from 'next/link'
import { Footer } from '../../components/footer'
import { Contact } from './_contact/contact'
import { MobileToolbelt, Toolbelt } from './tool-belt'

export const revalidate = 86400
export const dynamic = 'force-static'

export const metadata = {
  alternates: {
    canonical: '/',
  },
}

export default async function Page() {
  const xUser = await getXUserData()
  const githubUser = await getGithubUserData()

  return (
    <div className="min-h-screen w-full">
      <div className="relative h-[60vh] max-h-[1000px] lg:h-[80vh] lg:min-h-[80vh]">
        <Header />
      </div>

      <main className="relative z-10 flex flex-col gap-20 lg:gap-40">
        <div className="flex flex-col gap-8 px-4 text-center">
          <div className="border-stroke relative z-20 mx-auto w-full max-w-4xl rounded-3xl border bg-[#FFF] py-8 dark:border-[#1F1F1F] dark:bg-black">
            <div className="flex flex-col gap-6 px-8">
              <div className="grid w-full gap-10 text-left lg:grid-cols-[1fr_1fr]">
                <p className="mt-0.5 text-neutral-600 dark:text-neutral-400">
                  Hi I&apos;m <span className="font-semibold text-black dark:text-neutral-200">Wouter</span> — a Fullstack Developer,
                  largely self taught, and excited to learn new things.
                  <br />
                  <br />
                  At the moment, my focus is finishing uni and exploring ways to build the most user friendly and coolest interactions on
                  the web.
                </p>
                <p>
                  {' '}
                  Through my journey I&apos;ve picked up and mastered a bunch of tools that I use daily and have been using for the past
                  couple of years — listed down below!
                </p>
              </div>
            </div>

            <div className="hidden lg:block">
              <hr className="border-stroke my-6 dark:border-[#1F1F1F]" />
              <Toolbelt tools={tools} />
            </div>
          </div>
          <div className="lg:hidden">
            <MobileToolbelt tools={tools} />
          </div>
        </div>
        <div className="flex flex-col gap-8 lg:pb-24" id="contact">
          <div className="text-label mx-auto grid w-full max-w-4xl gap-4 px-4 lg:grid-cols-[1fr_1fr] lg:gap-8 lg:px-0 dark:text-neutral-200">
            <Link
              rel="noopener noreferer"
              target="_blank"
              href={xUser.data.url}
              className="group text-label border-stroke focus-visible:ring-echo hover:ring-echo relative z-20 mx-auto flex w-full items-center justify-between rounded-3xl border bg-[#FFF] px-6 py-4 transition-all hover:ring-2 hover:ring-offset-2 hover:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden active:scale-[98%] dark:border-[#1F1F1F] dark:bg-black dark:text-neutral-200 dark:hover:ring-offset-black dark:focus-visible:ring-offset-black"
            >
              <div className="flex items-center gap-4">
                <svg
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  className="fill-label dark:fill-neutral-200"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24.8579 3.40625H29.2686L19.6326 14.4196L30.9686 29.4063H22.0926L15.1406 20.3169L7.18592 29.4063H2.77259L13.0793 17.6263L2.20459 3.40625H11.3059L17.5899 11.7143L24.8579 3.40625ZM23.3099 26.7663H25.7539L9.97792 5.90758H7.35526L23.3099 26.7663Z" />
                </svg>
                <div className="flex flex-col justify-center gap-1 leading-none">
                  <span className="font-semibold">@{xUser.data.username}</span>
                  <div className="flex gap-2 leading-[0px]">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      <span className="text-label dark:text-neutral-200">{xUser.data.public_metrics.followers_count} </span>
                      Followers
                    </span>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      <span className="text-label dark:text-neutral-200">{xUser.data.public_metrics.tweet_count} </span>
                      Posts
                    </span>
                  </div>
                </div>
              </div>

              <ExternalIcon className="-mt-1 size-6 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              rel="noopener noreferer"
              target="_blank"
              href={githubUser.user.url}
              className="group text-label border-stroke focus-visible:ring-echo hover:ring-echo relative z-20 mx-auto flex w-full items-center justify-between rounded-3xl border bg-[#FFF] px-6 py-4 transition-all hover:ring-2 hover:ring-offset-2 hover:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden active:scale-[98%] dark:border-[#1F1F1F] dark:bg-black dark:text-neutral-200 dark:hover:ring-offset-black dark:focus-visible:ring-offset-black"
            >
              <div className="flex items-center gap-4">
                <svg
                  width="33"
                  height="33"
                  viewBox="0 0 98 96"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-label dark:fill-neutral-200"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                  />
                </svg>
                <div className="flex flex-col justify-center gap-1 leading-none">
                  <span className="font-semibold">{githubUser.user.login}</span>
                  <div className="flex gap-2 leading-[0px]">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      <span className="text-label dark:text-neutral-200">{githubUser.user.repositories.totalCount} </span>
                      Repositories
                    </span>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      <span className="text-label dark:text-neutral-200">
                        {githubUser.user.contributionsCollection.contributionCalendar.totalContributions}{' '}
                      </span>
                      Contributions
                    </span>
                  </div>
                </div>
              </div>

              <ExternalIcon className="-mt-1 size-6 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
