import { toast } from "sonner"
import { TaskStatus } from "@/app/schema/taskSchema"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type InputType = {
  tasks: {id: string, status: string, position: number}[]
}

export const useChangeTasks = ()=>{
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async ({tasks}: InputType) => {
      console.log("tasks:",tasks)
      const response = await fetch("http://localhost:8888/api/tasks/batchUpdate", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({tasks})
      })
      if(!response.ok){
        throw new Error("Failed to update tasks")
      }
      return response.json()
    },
    onSuccess: (data)=>{
      toast.success("Tasks updated successfully")
      queryClient.invalidateQueries({queryKey: ["tasks"]})
    },
    onError: (error)=>{
      console.error("Failed to update tasks", error)
      toast.error("Failed to update tasks")
    }
  })
  return mutation
}