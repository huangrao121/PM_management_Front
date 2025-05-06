import { TaskInfo } from "@/app/lib/types/taskType";
import {Ellipsis} from "lucide-react";
import { Separator } from "@/components/ui/separator";

import TaskAction from "../table/TaskAction";
import MemberAvatar from "../../avatar/member-avatar";
import TaskDate from "../TaskDate";
import ProjectAvatar from "../../project/ProjectAvatar";
interface KanbanCardProps {
  task: TaskInfo;
}

const KanbanCard = ({task}: KanbanCardProps)=>{

  return (
    <div className="flex flex-col gap-y-2 bg-white rounded-md p-2">
      <div className="flex items-center justify-between mb-2">
        {task.name}
        <TaskAction taskId={task.id}>
          <Ellipsis className="size-4 text-neutral-500" />
        </TaskAction>
      </div>
      <Separator className="h-[1px] bg-transparent border-0 border-b border-dotted border-neutral-500"/>
      <div className="flex items-center gap-x-1.5">
        <MemberAvatar name={task.assignee_name} className="size-6"/>
        <div className="size-1 rounded-full bg-neutral-300"/>
        <TaskDate value={task.due_date} className="text-sm"/>
      </div>

      <div className="flex items-center gap-x-2">
        <ProjectAvatar name={task.project_name} className="size-6"/>
        <span className="text-sm font-medium">{task.project_name}</span>
      </div>

    </div>
  )
}

export default KanbanCard