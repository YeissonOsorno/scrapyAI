"use client"
import React from 'react'

export default function NodeCard({children,nodeId}:{children:React.ReactNode,nodeId:string}) {
  return (
    <div>{children}</div>
  )
}
