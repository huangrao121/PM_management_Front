import { useQuery } from "@tanstack/react-query"
import { public_backend_url } from "@/app/config/config"

interface UseGetWorkspaceProps{
  workspaceId: string
}

const useGetWorkspace = ({workspaceId}: UseGetWorkspaceProps)=>{
  return useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: async ()=>{
      const response = await fetch(`${public_backend_url}/api/workspace/${workspaceId}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      if(!response.ok){
        throw new Error("Failed to fetch workspace")
      }
      const res = await response.json()
      return res.data
    },
    enabled: !!workspaceId
  })
}

export {useGetWorkspace}