"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader } from "lucide-react"

import { useWorkspaceId } from "@/app/lib/hooks/useWorkspaceId"
import { useProjectId } from "@/app/lib/hooks/useProjectId"
import { useGetProjects } from "../project/hooks/useGetProjects"
import { useGetMembers } from "../member/hooks/useGetMembers"
import { useGetTask } from "./hooks/useGetTask"
import { ProjectType } from "@/app/lib/types/projectType"
import { MemberType } from "@/app/lib/types/memberType"
import EditTaskForm from "./EditTaskForm"
import { TaskInfo } from "@/app/lib/types/taskType"

interface EditTaskFormWrapperProps{
  onCancel: ()=>void
  taskId: string
}

const EditTaskFormWrapper = ({onCancel, taskId}:EditTaskFormWrapperProps)=>{
  const workspaceId = useWorkspaceId()
  const {data: task, isLoading: isTaskLoading} = useGetTask({taskId})
  const {data: projects, isLoading: isProjectsLoading} = useGetProjects({workspaceId})
  const {data: members, isLoading: isMembersLoading} = useGetMembers({workspaceId})

  const projectOptions = projects?.map((project: ProjectType)=>({
    id: project.id,
    name: project.name
  }))

  const memberOptions = members?.map((member: MemberType)=>({
    id: member.user_id,
    name: member.username
  }))
  
  if(isProjectsLoading || isMembersLoading || isTaskLoading){
    return (
      <Card className="w-full h-[700px] border-none shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <div className="flex items-center justify-center h-full">
            <Loader className="size-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <EditTaskForm initialValues={task} taskId={taskId} onCancel={onCancel} projectOptions={projectOptions} memberOptions={memberOptions}/>
  )
}

export default EditTaskFormWrapper;