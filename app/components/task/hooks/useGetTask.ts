import { useQuery } from "@tanstack/react-query"

interface useGetTaskProps{
  taskId: string
}

const useGetTask = ({taskId} : useGetTaskProps)=>{
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${taskId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      })
      if (!response.ok) {
        throw new Error("Failed to fetch task")
      }
      const data = await response.json()
      if (data.response_key !== "SUCCESS") {
        throw new Error("Failed to fetch task")
      }
      return data.data
    },
    enabled: true
  })
}

export {useGetTask}