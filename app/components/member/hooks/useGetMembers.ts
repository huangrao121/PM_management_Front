import { useQuery } from "@tanstack/react-query"
import { public_backend_url } from "@/app/config/config"

interface UseGetMembersProps{
  workspaceId: string
}

const useGetMembers = ({workspaceId}: UseGetMembersProps)=>{
  return useQuery({
    queryKey: ["members", workspaceId],
    queryFn: async () => {
      const response = await fetch(`${public_backend_url}/api/members/${workspaceId}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      if(!response.ok){
        throw new Error("Failed to fetch members")
      }

      const data = await response.json()
      if(data.response_key !== "SUCCESS"){
        throw new Error("Failed to fetch members")
      }

      return data.data
    },
    enabled: !!workspaceId
  })
}

export {useGetMembers};
