import { Node } from "@xyflow/react";
import { TaskParam, TaskType } from "./Task";

/*
this is the data that will be stored in the node
{
  type: "LAUNCH_BROWSER",
  input:{
    "website url":"https://www.google.com"
  }
}
*/
export interface AppNodeData {
  type: TaskType;
  inputs: Record<string,string>;
  [key:string]:any;
}

export interface AppNode extends Node {
  data:AppNodeData
}

export interface ParamProps {
  param:TaskParam
  value:string
  updateNodeParamvalue:(newValue:string)=>void
}