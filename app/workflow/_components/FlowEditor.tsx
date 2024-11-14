"use client"
import { Workflow } from '@prisma/client'
import { Background, BackgroundVariant, Controls, ReactFlow, useNodesState } from '@xyflow/react'
import React from 'react'

import '@xyflow/react/dist/style.css'
import { createFlowNode } from '@/lib/workflow/createFlowNode'
import { TaskType } from '@/types/Task'
import NodeComponent from './nodes/NodeComponent'

const nodeTypes = {
  FlowScrapeNode : NodeComponent
}

export default function FlowEditor({workflow}:{workflow:Workflow}) {
  const [nodes, setNodes,onNodeChange] = useNodesState([
    createFlowNode(TaskType.LAUNCH_BROWSER,{x:0,y:0})
  ]);
  const [edges, setEdges,onEdgesChange] = useNodesState([]);



  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodeChange}
        nodeTypes={nodeTypes}
      >
        <Controls position='top-left' />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  )
}
