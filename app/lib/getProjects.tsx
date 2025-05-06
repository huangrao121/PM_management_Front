import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { backend_url } from "../config/config"
import { cookies } from "next/headers"
import { ProjectType } from "./types/projectType"

const getListofProjects = async (workspaceId: string) =>{
  const token = cookies().get('token')
  const response = await fetch((backend_url+`/api/projects/`), {
    method: 'GET',
    headers: {
      'Authorization': ('Bearer '+token?.value)
    },
    credentials:'include',
    body: workspaceId
  })

  if(!response.ok){
    throw new Error("Failed to fetch workspace info")
  }
  const result = await response.json()
  if(result.response_key != "SUCCESS"){
    throw new Error("Server side Failded fetch")
  }
  if (!result.data){
    return []
  }
  return result.data
}

const getSingleProject = async (workspaceId: string,projectId: string): Promise<ProjectType> => {
  //throw new Error("Not implemented")
  const token = cookies().get('token')
  
  if (!token?.value) {
    throw new Error("Authentication token is missing")
  }

  try {
    const response = await fetch(`${backend_url}/api/projects/${workspaceId}/${projectId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      cache: 'no-store', // 确保获取最新数据
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch project: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()
    
    if (result.response_key !== "SUCCESS") {
      throw new Error(result.message || "Failed to fetch project data")
    }

    if (!result.data) {
      throw new Error("Project data is missing")
    }

    return result.data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch project: ${error.message}`)
    }
    throw new Error("An unexpected error occurred while fetching project")
  }
}

export { getListofProjects, getSingleProject }