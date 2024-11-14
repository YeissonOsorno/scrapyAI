"use client"
import { Workflow } from '@prisma/client'
import { Background, BackgroundVariant, Controls, ReactFlow, useNodesState, useReactFlow } from '@xyflow/react'
import React, { useCallback, useEffect } from 'react'

import '@xyflow/react/dist/style.css'
import { createFlowNode } from '@/lib/workflow/createFlowNode'
import { TaskType } from '@/types/Task'
import NodeComponent from './nodes/NodeComponent'
import { AppNode } from '@/types/appNode'

const nodeTypes = {
  FlowScrapeNode : NodeComponent
}

// Snap to grid, in pixels (x,y), where the movement of the node is locked to
const snapGrid :[number,number] = [50,50];

// Fit view options icon [], to center the view on the node
const fitViewOptions = {
  padding: 1
};


export default function FlowEditor({workflow}:{workflow:Workflow}) {
  const [nodes, setNodes,onNodeChange] = useNodesState<AppNode>([ ]);
  const [edges, setEdges,onEdgesChange] = useNodesState([]);
  const {setViewport,screenToFlowPosition} = useReactFlow();

  useEffect(()=>{
    try{
      const flow = JSON.parse(workflow.definition);
      if(!flow) return;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);

      // Set the viewport to be insert into the Database
      if(!flow.viewport) return;
      const {x=0,y=0,zoom=1} = flow.viewport;
      setViewport({x,y,zoom});
    }catch(e){}
  },[workflow.definition,setNodes,setEdges,setViewport])


  const onDragOver = useCallback((event:React.DragEvent)=>{
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  },[]);

  const onDrop = useCallback((event:React.DragEvent)=>{
    event.preventDefault();
    const taskType = event.dataTransfer.getData("application/reactflow");
    if(typeof taskType === undefined || !taskType) return;

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode = createFlowNode(taskType as TaskType,position);
    setNodes((nds)=> nds.concat(newNode));
  },[])

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodeChange}
        nodeTypes={nodeTypes}
        snapToGrid={true}
        snapGrid={snapGrid}
        fitViewOptions={fitViewOptions}
        fitView
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <Controls position='top-left' />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  )
}
