"use server"

import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";

export async function UpdateWorkflow({
  id,
  definition
}:{
  id:string
  definition:string
}) {
  const {userId} = await auth();

  if(!userId) {
    throw new Error("Unauthenticated ");
  }
  // Search first
  const workflow = await prisma.workflow.findUnique({
    where: {
      id: id,
      userId: userId
    }
  })

  // Check if the workflow exists
  if(!workflow) throw new Error("Workflow not found");
  if(workflow.status !== WorkflowStatus.DRAFT) throw new Error("Workflow is not in draft mode");

  await prisma.workflow.update({
    data:{
      definition:definition
    },
    where: {
      id,
      userId
    },
    
  })


}