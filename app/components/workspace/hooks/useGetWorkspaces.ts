import { useQuery } from "@tanstack/react-query"
import { public_backend_url } from "@/app/config/config"

const useGetWorkspaces = ()=>{
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: async ()=>{
      const response = await fetch(`${public_backend_url}/api/workspace`,{
        method: "GET",
        credentials: "include",
      })
      if(!response.ok){
        throw new Error("Failed to fetch workspaces")
      }
      const res = await response.json()
      return res.data
    }
  })
}