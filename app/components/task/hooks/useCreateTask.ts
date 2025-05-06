import { useQueryClient } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { taskSchema } from "@/app/schema/taskSchema"
import { z } from "zod"

export const useCreateTask = () => {
  const queryClient = useQueryClient()
  const mutate = useMutation({
    mutationFn: async (form: z.infer<typeof taskSchema>) => {
      console.log("form:",form)
      const response = await fetch("http://localhost:8888/api/tasks/", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to create task")
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success("Task created successfully")
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
    onError: (error) => {
      console.error("Error creating task:", error)
      toast.error("Failed to create task")
    },   
  })

  return mutate
}