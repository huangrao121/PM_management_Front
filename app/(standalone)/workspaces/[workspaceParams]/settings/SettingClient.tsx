"use client"

import { useWorkspaceId } from "@/app/lib/hooks/useWorkspaceId"

import PageLoading from "@/app/components/page_state/PageLoading"
import PageError from "@/app/components/page_state/PageError"
import WorkspaceFormUpdate from "@/app/components/workspace/WorkspaceFormUpdate"

import { useGetWorkspace } from "@/app/components/workspace/hooks/useGetWorkspace"

const SettingClient = ()=>{
  const workspaceId = useWorkspaceId()
  const {data: workspace, isPending} = useGetWorkspace({workspaceId})
  console.log("workspace info: ",workspace)
  if(isPending){
    return <PageLoading/>
  }
  if(!workspace){
    return <PageError message="Workspace not found" />
  }
  return (
    <div className="w-full max-w-xl">
      <WorkspaceFormUpdate initialValues={workspace}/>
    </div>
  )
}

export default SettingClient