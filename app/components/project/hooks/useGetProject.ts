import { useQuery } from "@tanstack/react-query"
import { public_backend_url } from "@/app/config/config"

interface GetProjectProps{
  projectId: string
}

export const useGetProject = ({projectId}: GetProjectProps)=>{
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: async ()=>{
      const res = await fetch(`${public_backend_url}/api/projects/project/${projectId}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      if (!res.ok) throw new Error("Failed to fetch project")
      const response = await res.json()
      if (response.response_key !== "SUCCESS") {
        throw new Error("Failed to fetch project")
      }
      return response.data
    },
    enabled: !!projectId,
  })
}