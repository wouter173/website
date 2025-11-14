import { Header } from '@/app/(home)/header'
import { tools } from '@/components/tools'
import type { Metadata } from 'next'
import { Footer } from '../../components/footer'
import { Contact } from './_contact/contact'
import { MobileToolbelt, Toolbelt } from './tool-belt'
import { Suspense } from 'react'
import { SocialLinks } from './social-links'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

export default async function Page() {
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
            <Suspense>
              <SocialLinks />
            </Suspense>
          </div>
          <div className="mx-auto w-full max-w-4xl px-4 lg:px-0">
            <Contact />
          </div>
        </div>
        <Suspense>
          <Footer />
        </Suspense>
      </main>
    </div>
  )
}
