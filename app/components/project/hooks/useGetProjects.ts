import { useQuery } from '@tanstack/react-query'
import { ProjectType } from "@/app/lib/types/projectType"
import { backend_url } from '@/app/config/config'

interface UseGetProjectsProps{
    workspaceId: string
}

export function useGetProjects({workspaceId}: UseGetProjectsProps) {
  return useQuery({
    queryKey: ['projects', workspaceId],
    queryFn: async () => {
      
      if (!workspaceId) return []
      const res = await fetch(("http://localhost:8888" + "/api/projects/" + workspaceId), {
        method: "GET",
        credentials: "include"
      })
      if (!res.ok) {
        throw new Error("Failed to fetch projects in project component")
      }
      const data = await res.json()
      //console.log("data:",data)
      if(data.response_key != "SUCCESS"){
        throw new Error("Failed to fetch projects in project component")
      }
      return data.data
    },
    enabled: !!workspaceId,
  })
}