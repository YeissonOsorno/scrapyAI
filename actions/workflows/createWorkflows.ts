"use server"

import prisma from "@/lib/prisma";
import { createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflows";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

 export async function createWorkflows(form:createWorkflowSchemaType) {
  const {success, data} = createWorkflowSchema.safeParse(form);
  if(!success) {
    throw new Error("Invalid form");
  }
  const { userId} = await auth();
  if(!userId) {
    throw new Error("Unauthenticated ");
  }

  const result = await prisma.workflow.create({
    data: {
      userId: userId,
      status: WorkflowStatus.DRAFT,
      definition:"TODO",
      ...data
    }
  })

  if(!result) {
    throw new Error("Failed to create workflow");
  }
  redirect(`/workflows/editor/${result.id}`);
 }