"use server"

import prisma from "@/lib/prisma";
import { createFlowNode } from "@/lib/workflow/createFlowNode";
import { createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflows";
import { AppNode } from "@/types/appNode";
import { TaskType } from "@/types/Task";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { Edge } from "@xyflow/react";
import { redirect } from "next/navigation";

 export async function CreateWorkflows(form:createWorkflowSchemaType) {
  const {success, data} = createWorkflowSchema.safeParse(form);
  if(!success) {
    throw new Error("Invalid form");
  }
  const { userId} = await auth();
  if(!userId) {
    throw new Error("Unauthenticated ");
  }

  const initialFlow : {nodes:AppNode[],edges:Edge[]}={
    nodes:[],
    edges:[]
  }
  // Let's add the flow entry point
  initialFlow.nodes.push(createFlowNode(TaskType.LAUNCH_BROWSER));
  const result = await prisma.workflow.create({
    data: {
      userId: userId,
      status: WorkflowStatus.DRAFT,
      definition:JSON.stringify(initialFlow),
      ...data
    }
  })

  if(!result) {
    throw new Error("Failed to create workflow");
  }
  redirect(`/workflow/editor/${result.id}`);
 }