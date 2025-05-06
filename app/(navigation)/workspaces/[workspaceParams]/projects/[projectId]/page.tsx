import getCurrentUser from "@/app/lib/getCurrentUser"

import ProjectIdClient from "./ProjectIdClient"

import { redirect } from "next/navigation"

const ProjectsPage = async ()=>{
  const users = await getCurrentUser()
  if(!users){
    redirect("/login")
  }

  return <ProjectIdClient/>
} 

export default ProjectsPage