"use server"

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"

export async function getWorkflowsForUser() {
  const {userId} = await auth();

  if(!userId) {
    throw new Error("Unauthenticated ");
  }
  
  return  prisma.workflow.findMany({
    where: {
      userId: userId
    },
    orderBy:{
      createdAt: "asc"
    }
  })
}