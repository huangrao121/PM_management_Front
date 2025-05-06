"use client"

import { useParams } from "next/navigation"

const useTaskId = ()=>{
  const{taskId} = useParams()
  return taskId as string
}

export {useTaskId}