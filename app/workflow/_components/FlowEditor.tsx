"use client"
import { Workflow } from '@prisma/client'
import { Background, BackgroundVariant, Controls, ReactFlow, useNodesState, useReactFlow } from '@xyflow/react'
import React, { useEffect } from 'react'

import '@xyflow/react/dist/style.css'
import { createFlowNode } from '@/lib/workflow/createFlowNode'
import { TaskType } from '@/types/Task'
import NodeComponent from './nodes/NodeComponent'

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
  const [nodes, setNodes,onNodeChange] = useNodesState([ ]);
  const [edges, setEdges,onEdgesChange] = useNodesState([]);
  const {setViewport} = useReactFlow();

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
      >
        <Controls position='top-left' />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  )
}
