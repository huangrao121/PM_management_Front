import TaskSwitcher from "@/app/components/task/task-switcher"
import getCurrentUser from "@/app/lib/getCurrentUser"
import { redirect } from "next/navigation"

const TaskPage = ()=>{
  const user = getCurrentUser()
  if(!user){redirect("/login")}
  return(
    <div className="h-full flex flex-col">
      <TaskSwitcher/>
    </div>
  )
}

export default TaskPage