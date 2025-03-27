import { cookies } from "next/headers"
import getCurrentUser from "@/app/lib/getCurrentUser"
import { redirect } from 'next/navigation'
import { getWorkspaceInfo } from "@/app/lib/getWorkspaces"
import JoinWorkspaceForm from "@/app/components/workspace/WorkspaceFormJoin"
const WorkspaceJoinPage = async (
  { params }: { params:{ 
    workspaceParams: string 
    inviteCode: string
  }})=>{
  try {
    const token = cookies().get('token')
    const result = await getCurrentUser(token)
    if (!result || !token){
      redirect("/login")
    }
    const workspaceId = params.workspaceParams.split("!!")[1]
    const workspace = await getWorkspaceInfo(workspaceId, token)
    //console.log(params.inviteCode)
    return (
      <div className="w-full lg:max-w-xl">
        <JoinWorkspaceForm 
          name={workspace.name} 
          workspaceId={workspaceId} 
          token={token?.value}
          inviteCode={params.inviteCode}
        />
      </div>
    )
  } catch (error) {
    console.log(error)
    redirect("/login")
  }
}

export default WorkspaceJoinPage