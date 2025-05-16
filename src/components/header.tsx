'use client'

import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { Link } from 'next-view-transitions'

export const Header = () => {
  return (
    <header className="mx-auto grid h-[80%] w-full max-w-4xl place-items-center">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-label text-center text-5xl font-bold">Wouter de Bruijn</h1>
        <Button variant={'cta'} onClick={() => console.log('test')} className="flex items-center px-4 py-1.5" asChild>
          <Link href="/work">
            See my work <ChevronRight size={16} className="-mr-1 ml-1" />
          </Link>
        </Button>
      </div>
    </header>
  )
}
