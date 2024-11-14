"use client"
import CustomDialogHeader from '@/components/CustomDialogHeader';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { DialogContent, DialogTrigger } from '@radix-ui/react-dialog';
import { Layers2Icon } from 'lucide-react';
import React, { useState } from 'react'

export default function CreateWorkflowDialog({triggerText}:{triggerText?:string}) {
  const [open, setOpen] = useState(false);
  return (
   <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button>{triggerText ?? "Create Workflow"}</Button>
    </DialogTrigger>
    <DialogContent className="px-0">
     <CustomDialogHeader 
      icon={Layers2Icon} 
      title= "Create Workflow" 
      subtitle="Start building your workflow"
     />
    </DialogContent>
   </Dialog>
  )
}
