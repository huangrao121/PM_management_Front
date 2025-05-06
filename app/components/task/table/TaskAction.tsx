"use client"
import { useConfirm } from "@/app/lib/hooks/useConfirm"
import{
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react"
import { useDeleteTask } from "../hooks/useDeleteTask"
import { useEditTaskModal } from "@/features/zustand/useEditTaskModal"
import { useWorkspaceParams } from "@/app/lib/hooks/useWorkspaceId"
import { useRouter } from "next/navigation"

interface TaskActionProps{
  taskId: string
  projectId: string
  children: React.ReactNode
}

const TaskAction = ({taskId, projectId, children}: TaskActionProps)=>{
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Task",
    "This action cannot be reverse",
    "destructive"
  )
  
  const router = useRouter()
  const workspaceParams = useWorkspaceParams()

  const {taskId: editTaskId, onOpen} = useEditTaskModal()

  const {mutate, isPending} = useDeleteTask()

  const handleDelete = async () => {
    const ok = await confirm()
    if(!ok){
      return
    }
    mutate({taskId })
  }
  
  return (
    <div className="flex justify-end">
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {children}
          {/* Trigger element here */}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={()=>{router.push(`/workspaces/${workspaceParams}/tasks/${taskId}`)}} disabled={false} className="font-medium p-[10px]">
            <ExternalLinkIcon className="size-4 mr-2 stroke-2"/>
            Task Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=>{router.push(`/workspaces/${workspaceParams}/projects/${projectId}`)}} disabled={false} className="font-medium p-[10px]">
            <ExternalLinkIcon className="size-4 mr-2 stroke-2"/>
            Open Project
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=>onOpen(taskId)} disabled={false} className="font-medium p-[10px]">
            <PencilIcon className="size-4 mr-2 stroke-2"/>
            Edit Task
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete} disabled={isPending} className="font-medium text-amber-700 focus:text-amber-700/80 p-[10px]">
            <TrashIcon className="size-4 mr-2 stroke-2"/>
            Delete Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default TaskAction