import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { backend_url } from "../config/config"

const getWorkspaces = async (token?: RequestCookie) =>{

  const response = await fetch((backend_url+`/api/workspace/`), {
    method: 'GET',
    headers: {
      'Authorization': ('Bearer '+token?.value)
    },
    credentials:'include',  // Include credentials if needed
    //cache: "force-cache",
  })

  if(!response.ok){
    throw new Error("Failed to fetch workspace info")
  }
  const result = await response.json()
  //console.log(result.data)
  if(result.response_key != "SUCCESS"){
    throw new Error("Server side Failded fetch")
  }
  if (!result.data){
    return []
  }
  //console.log(result.data)
  return result.data
}

const getWorkspace = async (workspaceId?: string, token?: RequestCookie) =>{

  const response = await fetch((backend_url+`/api/workspace/`+workspaceId), {
    method: 'GET',
    headers: {
      'Authorization': ('Bearer '+token?.value)
    },
    credentials:'include',  // Include credentials if needed
    //cache: "force-cache",
  })

  if(!response.ok){
    throw new Error("Failed to fetch workspace info")
  }
  const result = await response.json()
  //console.log(result.data)
  if(result.response_key != "SUCCESS"){
    throw new Error("Server side Failded fetch")
  }
  //console.log(result.data)
  return result.data
}

const getWorkspaceInfo = async (workspaceId: string, token?: RequestCookie)=>{
  const response = await fetch((backend_url+`/api/workspace/`+workspaceId +'/info'), {
    method: 'GET',
    headers: {
      'Authorization': ('Bearer '+token?.value)
    },
    credentials:'include',  // Include credentials if needed
    //cache: "force-cache",
  })

  if(!response.ok){
    throw new Error("Failed to fetch workspace info")
  }
  const result = await response.json()
  if(result.response_key != "SUCCESS"){
    throw new Error("Server side Failded fetch")
  }
  return result.data
}

export {getWorkspaces, getWorkspace, getWorkspaceInfo}