'use client'

import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="mx-auto grid h-[80%] w-full max-w-4xl place-items-center">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-label text-center text-5xl font-bold">Wouter de Bruijn</h1>
        <div className="flex gap-2">
          <Button
            variant={'cta'}
            onClick={() =>
              window.scrollTo({
                top: document.getElementById('contact')!.offsetTop + document.getElementById('contact')!.offsetHeight,
                behavior: 'smooth',
              })
            }
            className="flex items-center"
          >
            Reach out <ChevronDown size={16} className="-mr-1 ml-1" />
          </Button>
          <Button variant={'primary'} onClick={() => console.log('test')} className="flex items-center" asChild>
            <Link href="/work">
              My work <ChevronRight size={16} className="-mr-1 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
