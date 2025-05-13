"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"


const useCreateProject = ()=>{
  const queryClient = useQueryClient()
  const mutate = useMutation({
    mutationFn: async (form: FormData)=>{
      const response = await fetch(`http://localhost:8888/api/projects/`, {
        method: "POST",
        body: form,
        credentials: "include",
      })
      if (!response.ok) {
        throw new Error("Failed to create project")
      }
      const res = await response.json()
      if(res.reponse_key != "SUCCESS"){
        throw new Error("Failed to create project")
      }
      return res.data
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ["projects"]})
      toast.success("Project created successfully")
    },
    onError: (error: any)=>{
      toast.error("Failed to create project", error.message)
    }
  })
  return mutate
}

export {useCreateProject}