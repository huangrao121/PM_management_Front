import WorkspaceForm from "@/app/components/workspace/WorkspaceForm"
import { cookies } from "next/headers"
import getCurrentUser from "@/app/lib/getCurrentUser"
import { redirect } from "next/navigation"
const WorkspaceInitPage = async ()=>{
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  //console.log(token)
  const result = await getCurrentUser(token)
  if(!result){
    redirect("/login")
  }
  return (
    <div className="lg:max-w-xl w-full">
      <WorkspaceForm/>
    </div>
  )
}

export default WorkspaceInitPage