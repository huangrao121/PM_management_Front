import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { public_backend_url } from "@/app/config/config"

const useResetInviteCode = ()=>{
  const queryClient = useQueryClient()
  const mutate = useMutation({
    mutationFn: async(workspaceId: string)=>{
      const response = await fetch(`${public_backend_url}/api/workspace/${workspaceId}/reset-invite-code`,{
        method: "PATCH",
        credentials: "include",
      })
      if(!response.ok){
        throw new Error("Failed to reset invite code")
      }
      const res = await response.json()
      return res.data
    },
    onSuccess: (data)=>{
      queryClient.invalidateQueries({queryKey: ["workspace"]})
      toast.success("Invite code reset")
    },
    onError: (error)=>{
      toast.error("Failed to reset invite code")
    }
  })
  return mutate
}

export {useResetInviteCode}
