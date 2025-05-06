"use client"

import { useWorkspaceId, useWorkspaceParams } from "@/app/lib/hooks/useWorkspaceId"
import { ProjectType } from "@/app/lib/types/projectType"
import  Link  from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { RiAddCircleFill } from "react-icons/ri"
import { cn } from "@/app/lib/utils"
import useCreateProjectModal from "@/features/zustand/useCreateProjectModal"
import ProjectAvatar from "./ProjectAvatar"
import { useGetProjects } from "./hooks/useGetProjects"

const Projects = ()=>{
  const workspaceId = useWorkspaceId()
  const workspaceParams = useWorkspaceParams()
  const pathname = usePathname()
  const {onOpen} = useCreateProjectModal()
  const { 
    data: projects, 
  } = useGetProjects({workspaceId})

  // console.log('Query status:', {
  //   workspaceId,
  //   status,
  //   isLoading,
  //   isFetching,
  //   isError,
  //   error,
  //   projects,
  // })
  // useEffect(()=>{
  //   async function fetchProject(){
  //     if(workspaceId != ""){
  //       const res = await fetch("/api/data", {
  //         method: "GET",
  //         headers: {
  //           "workspace_id": workspaceId
  //         }
  //       })
  //       if(!res.ok){
  //         throw new Error("Failed to fetch projects in project component")
  //       }
  //       const response = await res.json()
  //       setProjects(response)
  //     }
  //   }
  //   fetchProject()
  // },[workspaceParams])
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-md uppercase text-neutral-600">Projects</p>
        <RiAddCircleFill onClick={onOpen} className="text-neutral-600 size-5 cursor-pointer hover:opacity-80 transition"/>
      </div>
      <div>
        {projects?.map((project: ProjectType)=>{
          const realHref = `/workspaces/${workspaceParams}/projects/${project.id}`
          const isActive = pathname === realHref
          return (
            <Link href={realHref} key={project.id}>
              <div className={cn("flex items-center gap-2.5 p-2.5 rounded-md hover:opacity-70 transition cursor-pointer text-neutral-600",
                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
              )}>
                <ProjectAvatar name={project.name}/>
                <span className="truncate">{project.name}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
export default Projects