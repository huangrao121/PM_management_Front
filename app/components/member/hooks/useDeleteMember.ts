import { useMutation, useQueryClient } from "@tanstack/react-query"
import { public_backend_url } from "@/app/config/config"
const useDeleteMember = ()=>{
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (memberId: string)=>{
      const response = await fetch(`${public_backend_url}/api/members/${memberId}`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
    }
  })
}