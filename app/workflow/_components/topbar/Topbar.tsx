"use client"
import TooltipWrapper from '@/components/TooltipWrapper'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon, Workflow } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import SaveBtn from './SaveBtn'

interface Props {
  title:string
  subtitle?:string
  WorkflowId:string
}
export default function Topbar({title,subtitle,WorkflowId}:Props) {
  return (
    <header className='flex p-2 border-b-2 border-separate 
    justify-between w-full h-[60px] sticky top-0 bg-background z-10'>
      <div className="flex gap-1 flex-1">
        <TooltipWrapper content="Back">
         <Link href="/workflows">
         <Button variant="ghost" size="icon"
          >
            <ChevronLeftIcon size={20}/>
          </Button>
         </Link>
        </TooltipWrapper>
        <div className="">
          <p className="font-bold text-ellipsis truncate">{title}</p>
          {subtitle && <p className="text-xs text-muted-foreground truncate text-ellipsis">{subtitle}</p>}
        </div>
      </div>
      <div className="flex gap-1 flex-1 justify-end">
        <SaveBtn workflowId={WorkflowId}/>
      </div>
    </header>
  )
}
