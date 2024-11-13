import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import {SquareDashedMousePointer} from "lucide-react"
export default function Logo({
  fontSize = 'text-2xl',
  iconSize = 20,
}:{fontSize?:string,iconSize?:number}) {
  return (
    <Link 
    href="/" 
    className={cn(
      "text-2xl font-extrabold flex items-center gap-2",
      fontSize,
    )}
    >
      <div className="rounded-xl bg-gradient-to-r from-purple-500 to bg-purple-600 p-2">
        <SquareDashedMousePointer size={iconSize} className='stroke-white' />
      </div>
      <div>
        <span className="bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">
          Scrapy
        </span>
        <span className="text-stone-700 dark:text-stone-300">AI</span>
      </div>
    </Link>
  )
}
