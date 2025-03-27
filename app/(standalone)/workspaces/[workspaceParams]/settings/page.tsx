import getCurrentUser from "@/app/lib/getCurrentUser"
import { getWorkspace } from "@/app/lib/getWorkspaces"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import WorkspaceFormUpdate from "@/app/components/workspace/WorkspaceFormUpdate"


const WorkspaceSettings = async ({ params }: { params: { workspaceParams: string } })=>{
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  const user = await getCurrentUser(token)
  const paramsString = params.workspaceParams
  const workspaceId = paramsString.split("!!")[1]
  const workspace = await getWorkspace(workspaceId, token)
  if(!user){
    redirect("/login")
  }
  if (!workspace) {
    redirect(`/workspaces/${params.workspaceParams}`)
  }
  return (
    <div className="w-full max-w-xl">
      <WorkspaceFormUpdate initialValues={workspace}/>
    </div>
  )
}

export default WorkspaceSettings