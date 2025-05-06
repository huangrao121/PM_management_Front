"use server"

import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { backend_url } from "../config/config"
import { log } from "console"
const getListMembers = async (workspace_id: string, token?: RequestCookie)=>{
  const res = await fetch((backend_url + "/api/members/" + workspace_id), {
    method: "GET",
    headers:{
      'Authorization': ('Bearer '+token?.value)
    },
    credentials: "include",
  })
  if (!res.ok){
    throw new Error("Failed to fetch current user info")
  }

  const result = await res.json()
  if(result.response_key != "SUCCESS"){
    throw new Error("Failed to get list of members")
  }
  //console.log(result.data)
  return result.data
}

export {getListMembers}