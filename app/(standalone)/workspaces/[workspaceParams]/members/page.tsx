import WorkspaceMemberList from "@/app/components/workspace/WorkspaceMembers"
import { getListMembers } from "@/app/lib/getMembersList"
import { redirect } from "next/dist/server/api-utils"
import { cookies } from "next/headers"
import { toast } from "sonner"
const WorkspaceMembersPage = async (
  {params}:{params:{
  workspaceParams: string
}})=>{
  const token = cookies().get("token")
  const workspaceId = params.workspaceParams.split("!!")[1]
  const members = await getListMembers(workspaceId, token)

  //console.log(members)
  return (
    <div className="w-full max-w-xl">
      <WorkspaceMemberList members={members} workspaceId={workspaceId}/>
    </div>
  )
}

export default WorkspaceMembersPage