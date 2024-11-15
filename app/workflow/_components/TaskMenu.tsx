"use client"
import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
}from "@/components/ui/accordion"
import { TaskType } from '@/types/Task'
import { TaskRegistry } from '@/lib/workflow/task/registry'
import { Button } from '@/components/ui/button'
export default function TaskMenu() {
  return (
    <aside className="w-[340px] min-w-[340px] max-w[340px]
    border-r-2 border-separate h-full p-2 px-4 overflow-auto"
    >
      <Accordion type='multiple'className='w-full' defaultValue={["extraction"]}>
        <AccordionItem value='extraction'>
          <AccordionTrigger className='font-bold'>Extraction</AccordionTrigger>
          <AccordionContent className='flex flex-col gap-1'>
            <TaskMenuBtn taskType={TaskType.PAGE_TO_HTML}/>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  )
}


function TaskMenuBtn({taskType}:{taskType:TaskType}) {
  const task = TaskRegistry[taskType];

  // Allow drag and drop
  const onDragStart = (event:React.DragEvent,type:TaskType)=>{
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  }
  return (
    <Button 
    variant={"secondary"} 
    className='flex justify-between items-center gap-2 w-full border' 
    draggable={true}
    onDragStart={(event)=> onDragStart(event,taskType)}
    >
      <div className='flex gap-2'>
        <task.icon size={20}/>
        {task.label}
      </div>
    </Button>
  )
}