import { differenceInDays, format } from "date-fns"
import { cn } from "@/app/lib/utils"

interface TaskDateProps{
  className?: string
  date: string
}

const TaskDateIcon = ({className, date}:TaskDateProps)=>{
  const today = new Date()
  const dueDate = new Date(date)
  const diffDays = differenceInDays(today, dueDate)

  let color = "text-muted-foreground"
  if (diffDays <= 3){
    color = "text-red-500"
  } else if(diffDays <= 7){
    color = "text-orange-500"
  } else if(diffDays <= 14){
    color = "text-yellow-500"
  }
  return (
    <div className={color}>
      <span className={cn("truncate", className)}>{format(date, "PPP")}</span>
    </div>
  );
}
export default TaskDateIcon;