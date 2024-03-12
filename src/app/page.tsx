import Image from "next/image";
import cloudsSrc from "@/../public/clouds.png";

import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "@/components/icons/chevron-right-icon";
import Link from "next/link";
import { AtIcon } from "@/components/icons/at-icon";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <main className="relative flex h-[90vh] max-h-[1000px] min-h-[900px] w-full flex-col before:absolute before:inset-0 before:bg-[url('/grain.png')] before:bg-repeat">
        <div className="absolute inset-0 -z-10 h-full w-full  bg-gradient-to-t from-[#4D77BB] to-[#8FACC0] opacity-80">
          <Image fill alt="cloud background" src={cloudsSrc} className="object-cover object-center mix-blend-screen" />
        </div>

        <div className="relative z-20 mx-auto grid h-full max-w-4xl place-items-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-6xl font-extrabold leading-relaxed text-black opacity-70">Wouter de Bruijn</h1>
            <div className="flex justify-center gap-2">
              <Button asChild size="rounded" className="flex w-min items-center gap-1">
                <a href="mailto:wouter@debruijn.dev">
                  <AtIcon className="size-3.5" />
                  Contact me
                </a>
              </Button>

              <Button asChild size="rounded" className="flex w-min items-center bg-slate-100 pr-1.5 text-black hover:bg-slate-100/80">
                <Link href="/blog">
                  Blog <ChevronRightIcon className="size-4 shrink-0" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <div className="relative h-screen bg-white before:absolute before:inset-0 before:bg-[url('/grain.png')] before:bg-repeat">
        <div className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-4">
          <article className="relative z-20 -mt-10 rounded-lg bg-slate-100 py-20 shadow-sm"></article>
          <article className="relative z-20 -mt-10 rounded-lg bg-slate-100 py-20 shadow-sm"></article>
        </div>
      </div>
    </div>
  );
}
