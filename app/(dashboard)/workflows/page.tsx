import { getWorkflowsForUser } from '@/actions/workflows/getWorkflowsForUser'
import { Skeleton } from '@/components/ui/skeleton'
import React, { Suspense } from 'react'
import {Alert, AlertDescription,AlertTitle} from "@/components/ui/alert"
import { AlertCircle, InboxIcon } from 'lucide-react'

function page() {
  return (
    <div className="flex-1 flex flex-col h-full p-8">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="text-3xl font-bold">Workflows</div>
          <p className="text-muted-foreground">Manage your workflows</p>
        </div>
      </div>

      <div className="h-full py-6">
        <Suspense fallback={<UserWorkFlowsSkeleton />}>
        <UserWorkFlows />
        </Suspense>
      </div>
    </div>
  )
}

function UserWorkFlowsSkeleton() {
  return (
    <div className="space-y-2">
      {
        [1,2,3,4].map(i=>(
          <Skeleton key={i} className="h-32 w-full "/>
        ))
      }
    </div>
  )
}

async function UserWorkFlows() {
  const workflows = await getWorkflowsForUser();
  console.log(workflows)
  if(!workflows) {
    return(
      <Alert variant={"destructive"}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
        Something went wrong. Please try again later
        </AlertDescription>
      </Alert>
    )
  }

  if(workflows.length === 0) {
    return(
      <div className="flex flex-col gap-4 h-full items-center justify-center py-4">
        <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
          <InboxIcon size={40} className='stroke-primary'/>
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">No workflows created yet</p>
          <p className="text-sm text-muted-foreground">
            Click the button below to create your first workflow
          </p>
        </div>
      </div>
    )
  }
  return (
    <div className=""></div>
  )
}

export default page