"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { PencilIcon, XIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"

import { TaskInfo } from "@/app/lib/types/taskType"
import { ReqType } from "@/app/components/task/hooks/useUpdateTask"
import { TaskStatus } from "@/app/schema/taskSchema"
import MemberAvatar from "@/app/components/avatar/member-avatar"
import OverviewProperty from "@/app/components/task/taskpagecomponent/OverviewProperty"
import TaskDate from "@/app/components/task/TaskDate"

import { useState } from "react"

import { useUpdateTask } from "@/app/components/task/hooks/useUpdateTask"
import { useEditTaskModal } from "@/features/zustand/useEditTaskModal"

interface TaskDetailsProps{
  task: TaskInfo
}

const TaskDetails = ({task}:TaskDetailsProps)=>{

  const [isEditing, setIsEditing] = useState(false)

  const {mutate: updateTask, isPending} = useUpdateTask()

  const [description, setDescription] = useState(task.description)

  const {onOpen} = useEditTaskModal()

  const handleUpdate = ()=>{
    const updatedTask: ReqType = {
      name: task.name,
      status: task.status,
      workspace_id: Number(task.workspace_id),
      project_id: Number(task.project_id),
      assignee_id: Number(task.assignee_id),
      due_date: task.due_date ? new Date(task.due_date) : new Date(),
      description: description
    }
    updateTask({value: updatedTask, taskId: task.id})
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="flex flex-col gap-y-4 col-span-1">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">Overview</p>
            <Button onClick={()=>{onOpen(task.id)}}>
              <PencilIcon/>
              Edit
            </Button>
          </div>
          <Separator className="my-4"/>
          <div className="flex flex-col gap-y-4">
            <OverviewProperty label="Assignee">
              <MemberAvatar name={task.assignee_name}/>
              <p className="text-sm font-medium"></p>
            </OverviewProperty>
            <OverviewProperty label="Due Date">
              <TaskDate value={task.due_date}/>
            </OverviewProperty>
            <OverviewProperty label="Status">
              <Badge variant={task.status as TaskStatus}>{task.status}</Badge>
            </OverviewProperty>
          </div>
        </div>
      </div>
      <div className="p-4 border rounded-lg">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold ">Overview</p>
          <Button size="sm" variant="secondary" onClick={()=>{setIsEditing((prev)=>!prev)}}>
            {isEditing?( 
              <>
                <XIcon/>
                Cancel
              </>
            ):(
              <>
                <PencilIcon/>
                Edit
              </>
            )}
          </Button>
        </div>
        <Separator className="my-4"/>
        {isEditing ? (
          <div className="flex flex-col gap-y-4">
            <Textarea
              placeholder="Task Description"
              value={task.description}
              className="h-[200px]"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=>{setDescription(e.target.value)}}
            />
            <Button
              size="sm"
              variant="default"
              onClick={handleUpdate}
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </div>
        ) : (
          <div>
            {task.description=="" || task.description==null ? <span className="text-muted-foreground">No description yet</span> : task.description}
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskDetails