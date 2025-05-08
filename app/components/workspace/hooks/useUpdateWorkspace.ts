import { useMutation, useQueryClient } from "@tanstack/react-query"
import { public_backend_url } from "@/app/config/config"

import { toast } from "sonner"

interface UseUpdateWorkspaceProps{
  workspaceId: string
}

const useUpdateWorkspace = ()=>{
  const queryClient = useQueryClient()
  const mutate = useMutation({
    mutationFn: async ({formData, workspaceId}: {formData: FormData, workspaceId: string})=>{
      const response = await fetch(`${public_backend_url}/api/workspace/${workspaceId}`,{
        method: "PATCH",
        body: formData,
        credentials: "include",
      })
      if(!response.ok){
        throw new Error("Failed to update workspace")
      }
      const res = await response.json()
      return res.data
    },
    onSuccess: (data)=>{
      queryClient.invalidateQueries({queryKey: ["workspace"]})
      toast.success("Workspace updated")
    },
    onError: (error)=>{
      toast.error("Failed to update workspace")
    }
  })
  return mutate
}

export {useUpdateWorkspace}