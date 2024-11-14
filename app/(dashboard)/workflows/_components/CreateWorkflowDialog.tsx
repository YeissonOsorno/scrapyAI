"use client"
import CustomDialogHeader from '@/components/CustomDialogHeader';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem } from '@/components/ui/form';
import { createWorkflowSchema, createWorkflowSchemaType } from '@/schema/workflows';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Layers2Icon, Loader2 } from 'lucide-react';
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CreateWorkflows } from '@/actions/workflows/createWorkflows';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function CreateWorkflowDialog({triggerText}:{triggerText?:string}) {
  const [open, setOpen] = useState(false);

  const form = useForm<createWorkflowSchemaType>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues:{}
  });

  const {mutate,isPending} = useMutation({
    mutationFn: CreateWorkflows,
    onSuccess: () => {
      toast.success("Workflow created",{id:"create-workflow"});
    },
    onError: (error) => {
      toast.error("Failed to create workflow",{id:"create-workflow"});
    }
  }); 

  const onSubmit = useCallback((values:createWorkflowSchemaType)=>{
    toast.loading("Creating workflow...",{id:"create-workflow"});
    mutate(values);
  },[mutate])

  return (
   <Dialog open={open} onOpenChange={(open) =>{
    form.reset();
    setOpen(open);
   }}>
    <DialogTrigger asChild>
      <Button>{triggerText ?? "Create Workflow"}</Button>
    </DialogTrigger>
    <DialogContent className="px-0 sm:max-w-md">
     <CustomDialogHeader 
      icon={Layers2Icon} 
      title= "Create Workflow" 
      subtitle="Start building your workflow"
     />
     <div className="p-6">
      <Form {...form}>
        <form className='space-y-8 w-full' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField 
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex gap-1 items-center'>
                  Name
                  <p className="text-xs text-primary">(required)</p>
                </FormLabel>
                <FormControl>
                  <Input {...field} className="input input-bordered w-full" />
                </FormControl>
                <FormDescription>
                  Choose a descriptive and unique name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField 
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex gap-1 items-center'>
                  Description
                  <p className="text-xs text-muted-foreground">(optional)</p>
                </FormLabel>
                <FormControl>
                  <Textarea {...field} className="rezise-none" />
                </FormControl>
                <FormDescription>
                  Provide a brief description of what your workflow does.
                  <br/> This is optional but can help you remember the 
                  workflow&apos;s purpose.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full' disabled={isPending}>
            {!isPending && "Proceed"}
            {isPending && <Loader2 className='animate-spin'/>}
          </Button>
        </form>
      </Form>
     </div>
    </DialogContent>
   </Dialog>
  )
}
