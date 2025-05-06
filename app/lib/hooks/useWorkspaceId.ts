import { useParams } from "next/navigation"

export const useWorkspaceParams = ()=>{
  const params = useParams()
  return params.workspaceParams as string
}

export const useWorkspaceId = ()=>{
  const params = useParams()
  const str = params.workspaceParams as string
  try {
    return str.split("!!")[1] as string
  } catch (error) {
    return ""
  }
  //return str.split("!!")[1] as string
}
