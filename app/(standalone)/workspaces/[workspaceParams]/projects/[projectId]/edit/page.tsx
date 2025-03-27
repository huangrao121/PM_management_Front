import ProjectFormEdit from "@/app/components/project/ProjectFormEdit"
import getCurrentUser from "@/app/lib/getCurrentUser"
import { getSingleProject } from "@/app/lib/getProjects"
import { redirect } from "next/navigation"

interface EditProjectPageProps {
  params:{
    workspaceParams:string, 
    projectId:string
  }
}

const EditProjectPage = async ({params}:EditProjectPageProps)=>{
  const user = await getCurrentUser()
  if(!user){
    redirect("/login")
  }
  const {workspaceParams, projectId} = params
  const workspaceId = workspaceParams
  const project = await getSingleProject(workspaceId, projectId)
  return(
    <div className="w-full lg:max-w-xl">
      <ProjectFormEdit initialValues={project}/>
    </div>
  )
}

export default EditProjectPage
