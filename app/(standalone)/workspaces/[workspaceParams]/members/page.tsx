import getCurrentUser from "@/app/lib/getCurrentUser"

import { redirect } from "next/navigation"

import MemberClient from "./MemberClient"

const WorkspaceMembersPage = async ()=>{
  // const token = cookies().get("token")
  // const workspaceId = params.workspaceParams.split("!!")[1]
  // const members = await getListMembers(workspaceId, token)
  const user = await getCurrentUser()
  if(!user){
    redirect("/login")
  }

  return <MemberClient/>
}

export default WorkspaceMembersPage