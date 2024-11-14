import { AppNode } from "@/types/appNode";
import { TaskType } from "@/types/Task";

/**
 * This function covert a task into a flow node valid for react-flow
 * @param task 
 */
export function createFlowNode(
  nodeType:TaskType,
  position:{x:number,y:number},
):AppNode{
  return {
    id:crypto.randomUUID(),
    type:"FlowScrapeNode",
    data:{
      type:nodeType,
      inputs:{}
    },
    position:position ?? {x:0,y:0},
  }
}