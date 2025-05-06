"use client"

import {useTaskId} from "@/app/lib/hooks/useTaskId"
import { useGetTask } from "@/app/components/task/hooks/useGetTask"
import PageLoading from "@/app/components/page_state/PageLoading"
import PageError from "@/app/components/page_state/PageError"
import { Separator } from "@/components/ui/separator"

import TaskBreadcrumbs from "@/app/components/task/taskpagecomponent/TaskBreadcrumbs"
import TaskDetails from "@/app/components/task/taskpagecomponent/TaskDetails"


const TaskIdClient = ()=>{
  const taskId = useTaskId()
  const {data: task, isPending} = useGetTask({taskId})
  if(isPending){
    return <PageLoading/>
  }
  if(!task){
    return <PageError message="Task not found"/>
  }
  return (
    <div className="flex flex-col gap-4">
      <TaskBreadcrumbs task={task} projectId={task.project_id} projectName={task.project_name}/>
      <Separator/>
      <TaskDetails task={task}/>
    </div>
  )
}
export default TaskIdClient