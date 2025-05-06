"use client"
import ProjectAvatar from "@/app/components/project/ProjectAvatar"
import TaskSwitcher from "@/app/components/task/task-switcher"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PencilIcon } from "lucide-react"
import { useProjectId } from "@/app/lib/hooks/useProjectId"
import { useGetProject } from "@/app/components/project/hooks/useGetProject"
import PageLoading from "@/app/components/page_state/PageLoading"
import PageError from "@/app/components/page_state/PageError"

const ProjectIdClient = ()=>{
  const projectId = useProjectId()
  const {data: project, isPending, error} = useGetProject({projectId})

  if (isPending) {
    return <PageLoading />
  }

  if (error || !project) {
    return <PageError message="Failed to load project" />
  }

  return(
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar 
            name={project.name}
            //image={project.image_url}
            className="size-8"
          />
          <h1 className="text-lg font-semibold">{project.name}</h1>
        </div>
        <div>
          <Button variant="secondary" size="md" asChild disabled={isPending}>
            <Link href={`/workspaces/${project.workspace_id}/projects/${project.id}/edit`}>
              <PencilIcon className="size-4 mr-2"/>
              Edit Project
            </Link>
          </Button>
        </div>
      </div>
      <TaskSwitcher hiddenProject projectPropId={projectId}/>
    </div>
  )
}

export default ProjectIdClient