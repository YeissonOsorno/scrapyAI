import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./NodeCard";
import NodeHeader from "./NodeHeader";
import { AppNodeData } from "@/types/appNode";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import NodeInputs, { NodeInput } from "./NodeInputs";
import NodeOutputs, { NodeOutput } from "./NodeOutputs";

const NodeComponent = memo((props:NodeProps)=>{
  const nodeData = props.data as AppNodeData;
  const task = TaskRegistry[nodeData.type];
  return (
    <NodeCard nodeId={props.id} isSelected={!!props.selected} >
      <NodeHeader taskType={nodeData.type} />
      <NodeInputs>
        {task.inputs.map((input,index)=>(
          <NodeInput nodeId={props.id} key={input.name} input={input}/>
        ))}
      </NodeInputs>
      <NodeOutputs>
        {task.outputs.map((output,index)=>(
          <NodeOutput key={output.name} output={output}/>
        ))}
      </NodeOutputs>
    </NodeCard>
  )
})

export default NodeComponent
NodeComponent.displayName = "NodeComponent"