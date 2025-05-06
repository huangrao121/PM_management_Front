
import getCurrentUser from "@/app/lib/getCurrentUser"
import TaskIdClient from "./TaskIdClient"
const TaskPage = ()=>{
  const user = getCurrentUser()
  if(!user){
    throw new Error("Unauthorized")
  }
  return (
    <TaskIdClient/>
  )
}

export default TaskPage