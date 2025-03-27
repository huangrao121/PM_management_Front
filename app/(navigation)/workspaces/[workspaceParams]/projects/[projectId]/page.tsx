import { redirect } from "next/navigation"

import { getSingleProject } from "@/app/lib/getProjects"
import getCurrentUser from "@/app/lib/getCurrentUser"

import ProjectAvatar from "@/app/components/project/ProjectAvatar"
import { Button } from "@/components/ui/button"
import { PencilIcon } from "lucide-react"
import Link from "next/link"
import TaskSwitcher from "@/app/components/task/task-switcher"
interface ProjectsPageProps{
  params: {
    projectId: string
    workspaceParams: string
  }
}

const ProjectsPage = async ({params}:ProjectsPageProps)=>{
  const users = await getCurrentUser()
  if(!users){
    redirect("/login")
  }
  const workspaceId = params.workspaceParams.split("!!")[1]
  const project = await getSingleProject(workspaceId, params.projectId)
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
              <Button variant="secondary" size="md" asChild>
                <Link href={`/workspaces/${project.workspace_id}/projects/${project.id}/edit`}>
                  <PencilIcon className="size-4 mr-2"/>
                  Edit Project
                </Link>
              </Button>
            </div>
          </div>
          <TaskSwitcher/>
        </div>
    )
} 

export default ProjectsPage