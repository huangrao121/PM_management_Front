"use client"

import { useRouter } from "next/navigation"
import { useWorkspaceParams } from "@/app/lib/hooks/useWorkspaceId"
import { useConfirm } from "@/app/lib/hooks/useConfirm"
import { useDeleteTask } from "@/app/components/task/hooks/useDeleteTask"
import { TaskInfo } from "@/app/lib/types/taskType"
import { ProjectType } from "@/app/lib/types/projectType"

import Link from "next/link"
import { ChevronRightIcon, Trash2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProjectAvatar from "@/app/components/project/ProjectAvatar"

interface TaskBreadcrumbsProps{
  task: TaskInfo
  projectName: string
  projectId: string
}

const TaskBreadcrumbs = ({task, projectName, projectId}: TaskBreadcrumbsProps)=>{
  const router = useRouter()
  const workspaceParams = useWorkspaceParams()

  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Task",
    "Are you sure you want to delete this task?",
    "destructive"
  )

  const {mutate, isPending} = useDeleteTask()

  const onDelete = async ()=>{
    const ok = await confirm()
    if(!ok) return
    mutate({taskId: task.id}, {
      onSuccess: ()=>{
        router.push(`/workspaces/${workspaceParams}/tasks`)
      }
    })
  }
  //console.log("project name is: ", projectName)
  return (
    <div className="flex items-center gap-2">
      <ConfirmDialog/>
      <ProjectAvatar name={projectName}/>
      <Link href={`/workspaces/${workspaceParams}/projects/${projectId}`}>
        {projectName}
      </Link>
      <ChevronRightIcon className="size-4"/>
      <p className="text-sm font-medium">{task.name}</p>
      <Button
        className="ml-auto"
        variant="destructive"
        size="sm"
        onClick={onDelete}
        disabled={isPending}
      >
        <Trash2Icon className="size-4"/>
        <span className="hidden lg:block">Delete</span>
      </Button>

    </div>
  )
}

export default TaskBreadcrumbs