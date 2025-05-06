import { z } from "zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { taskSchema } from "@/app/schema/taskSchema"
import { Task } from "@/app/lib/types/taskType"
import { toast } from "sonner"

export type ReqType = z.infer<typeof taskSchema>
type ResType = {
  taskId: string
}

const useUpdateTask = ()=>{

  const queryClient = useQueryClient()
  const mutation = useMutation<ResType, Error, {value: ReqType, taskId: string}>({
    mutationFn: async ({value, taskId}: {value: ReqType, taskId: string}) =>{
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
        credentials: "include"
      })
      const response= await res.json()
      //console.log(resJson)
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ["tasks"]})
      queryClient.invalidateQueries({queryKey: ["task", data.taskId]})
      toast.success("Task updated successfully")
    },
    onError: (error) => {
      toast.error("Error updating task: " + error.message)
    }
  })
  return mutation
}

export {useUpdateTask}