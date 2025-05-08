"use client"
import WorkspaceMemberList from "@/app/components/workspace/WorkspaceMembers"
import { useWorkspaceId } from "@/app/lib/hooks/useWorkspaceId"
import { useGetMembers } from "@/app/components/member/hooks/useGetMembers"

import PageError from "@/app/components/page_state/PageError"
import PageLoading from "@/app/components/page_state/PageLoading"

const MemberClient = ()=>{
  const workspaceId = useWorkspaceId()
  const {data: members, isPending} = useGetMembers({workspaceId})
  if(isPending){
    return <PageLoading/>
  }
  if(!members){
    return <PageError/>
  }
  return (
    <div className="w-full max-w-xl">
      <WorkspaceMemberList members={members} workspaceId={workspaceId}/>
    </div>
  )
}

export default MemberClient