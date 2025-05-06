import { TaskStatus } from "@/app/schema/taskSchema"
import {
  CircleCheckIcon,
  CircleDashedIcon,
  CircleDotDashedIcon,
  CircleDotIcon,
  CircleIcon,
  Ban,
  PlusIcon,
} from "lucide-react"
import useCreateTaskModal from "@/features/zustand/useCreateTaskModal"
import { Button } from "@/components/ui/button"
interface KanbanColumnHeaderProps{
  title: TaskStatus
  taskCount: number // Changed type from number to TaskInfo[]
}

const columnHeaderIcon: Record<TaskStatus, React.ReactNode> = {
  [TaskStatus.BACKLOG]: (<CircleDashedIcon className="size-[18px] text-pink-400"/>),
  [TaskStatus.TODO]: (<CircleIcon className="size-[18px] text-red-400"/>),
  [TaskStatus.IN_PROGRESS]: (<CircleDotDashedIcon className="size-[18px] text-green-400"/>),
  [TaskStatus.IN_REVIEW]: (<CircleDotIcon className="size-[18px] text-blue-400"/>),
  [TaskStatus.DONE]: (<CircleCheckIcon className="size-[18px] text-emerald-400"/>),
  [TaskStatus.BLOCKED]: (<Ban className="size-[18px] text-black-400"/>),
}

const KanbanColumnHeader = ({title, taskCount}: KanbanColumnHeaderProps)=>{
  const {onOpen} = useCreateTaskModal()
  
  const icon = columnHeaderIcon[title]
  return (
    <div className="px-2 py-1 flex items-center justify-between mb-3">
      <div className="flex items-center gap-x-2">
        {icon}
        <h2>{title}</h2>
        <div>{taskCount}</div>
      </div>
      <Button
        onClick={() => onOpen()}
        variant="ghost"
        size="icon"
        className="size-5 rounded-xl hover:bg-neutral-300"
      >
        <PlusIcon className="size-4 text-neutral-500" />
      </Button>
    </div>
  )
}
export default KanbanColumnHeader