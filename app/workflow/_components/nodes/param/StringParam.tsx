"use client"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'
import { ParamProps } from '@/types/appNode';
import React, { useId } from 'react'


export default function StringParam({param, value, updateNodeParamvalue}:ParamProps) {
  const [internalValue, setInternalValue] = React.useState(value);
  const id = useId();
  return (
    <div className='space-y-1 p-1 w-full'>
      <Label htmlFor={id} className='text-xs flex'>
        {param.name}
        {param.required && <p className='text-red-500 px-2'>*</p>}
      </Label>
      <Input 
        id={id}
        className='text-xs'
        value={internalValue}
        placeholder= "Enter value"
        onChange={(e)=>setInternalValue(e.target.value)}
        onBlur={(e)=>updateNodeParamvalue(e.target.value)}
      />
      {param.helperText && <p className='text-xs text-muted-foreground px-2'>{param.helperText}</p>}
    </div>
  )
}
