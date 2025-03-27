"use server"

import { backend_url } from "@/app/config/config"
import { cookies } from "next/headers"

const deleteMember = async (workspace_id: string, member_id: string)=>{
  const token = cookies().get('token')
  const res = await fetch((backend_url+ "/api/members/" + workspace_id), {
    method: "DELETE",
    headers:{
      'Authorization': ('Bearer '+token?.value),
    },
    credentials: "include",
    body: member_id
  })
  if (!res.ok){
    const errorData = await res.json()
    throw new Error('Failed to delete the member from workspace')
  }
  return true
}

export {deleteMember}