import { useQuery } from '@tanstack/react-query'
import { ProjectType } from "@/app/lib/types/projectType"
import { public_backend_url } from '@/app/config/config'
import { useMemo } from 'react'
interface UseGetTasksProps{
    workspaceId: string
    projectId?: string | null
    assigneeId?: string | null
    status?: string | null
    dueDate?: string | null
    search?: string | null
}

export function useGetTasks({
  workspaceId,
  projectId,
  assigneeId,
  status,
  dueDate,
  search
}: UseGetTasksProps) {
  const filters = useMemo(()=>{
    return {
      workspaceId,
      projectId: projectId ?? null,
      assigneeId: assigneeId ?? null,
      status: status ?? null,
      dueDate: dueDate ?? null,
      search: search ?? null
    }

  },[ workspaceId, projectId, assigneeId, status, dueDate, search])
  return useQuery({
    queryKey: ['tasks', filters],
    queryFn: async () => {
      let url = new URL("/api/tasks/workspace/" + workspaceId, public_backend_url)
      if (projectId) url.searchParams.set("project_id", projectId)
      if (assigneeId) url.searchParams.set("assignee_id", assigneeId)
      if (status) url.searchParams.set("status", status)
      if (dueDate) url.searchParams.set("due_date", dueDate)
      if (search) url.searchParams.set("search", search)
      if (!workspaceId) return []
      //console.log("backend_url:",backend_url)
      const res = await fetch(url, {
        method: "GET",
        credentials: "include"
      })
      if (!res.ok) {
        throw new Error("Failed to fetch tasks in task component")
      }
      const data = await res.json()
      console.log("data:",data)
      if(data.response_key != "SUCCESS"){
        throw new Error("Failed to fetch tasks in task component")
      }
      return data.data
    },
    enabled: !!workspaceId,
    staleTime: 1000*60,
  })
}