import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
interface InputType{
  taskId: string
}

export const useDeleteTask = ()=>{
  const router = useRouter()
  const queryClient = useQueryClient()

  const mutation = useMutation<string, Error, InputType>({
    mutationFn: async ({taskId }) =>{
      const response = await fetch(`http://localhost:8888/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      if (!response.ok) {
        throw new Error('Failed to delete task')
      }
      const data = await response.json()
      return data.data
    },
    onSuccess: (data) => {
      toast.success(`Task ${data} deleted successfully`)
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
      router.refresh()
    },
    onError: (error) => {
      toast.error("Error deleting task: " + error.message)
    },
  })
  return mutation
}