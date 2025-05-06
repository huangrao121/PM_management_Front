import { TaskStatus } from "@/app/schema/taskSchema"
import {cn} from "@/app/lib/utils"
import MemberAvatar from "@/app/components/avatar/member-avatar"
import ProjectAvatar from "@/app/components/project/ProjectAvatar"
import { useWorkspaceId } from "@/app/lib/hooks/useWorkspaceId"
import { useRouter } from "next/navigation"
interface EventCardProps{
  id: string
  title: string
  project: string
  assignee: string
  status: TaskStatus
}

const statusColors: Record<TaskStatus, string> = {
  [TaskStatus.BACKLOG]: "border-l-pink-400",
  [TaskStatus.TODO]: "border-l-red-400",
  [TaskStatus.IN_PROGRESS]: "border-l-green-400",
  [TaskStatus.IN_REVIEW]: "border-l-blue-400",
  [TaskStatus.DONE]: "border-l-emerald-400",
  [TaskStatus.BLOCKED]: "border-l-black-400",
}

const EventCard = ({id, title, project, assignee, status}: EventCardProps)=>{
  
  const workspaceId = useWorkspaceId()
  const router = useRouter()

  const onClick = ()=>{
    router.push(`/workspace/${workspaceId}/task/${id}`)
  }
  
  return (
    <div className="px-2">
      <div
        onClick={onClick}
        className={cn(
          "p-1.5 text-xs bg-white text-primary border rounded-md border-l-4 flex flex-col gap-y-1.5 cursor-pointer hover:opacity-75 transition",
          statusColors[status]
        )}
      >
        <p>{title}</p>
        <div className="flex items-center gap-x-1">
          <MemberAvatar name={assignee} />
          <div className="size-1 rounded-full bg-neutral-300" />
          <ProjectAvatar name={project} />
        </div>
      </div>
    </div>
  )
}
export default EventCard