import Link from "next/link"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import NaviMenu from "./NaviMenu"
import Projects from "./project/Projects"
import WorkspaceSwitcher from "./workspace/WorkspaceSwitcher"
import { getWorkspaces } from "../lib/getWorkspaces"
import { WorkspaceType } from "../lib/types/workspaceType"
import { cookies } from "next/headers"
import getCurrentUser from "../lib/getCurrentUser"
import { ProjectType } from "../lib/types/projectType"
import { getListofProjects } from "../lib/getProjects"
const Sidebar = async ()=>{
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  const workspace:WorkspaceType[] = await getWorkspaces(token)
  //const projects:ProjectType[] = await getListofProjects()
  //console.log(workspace)
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link className='flex items-center justify-start gap-4' href='/'>
        <Image src={"/logo.svg"} width={50} height={50} alt="logo"/>
        <p>PMS</p>
      </Link>
      <Separator orientation="horizontal" className="my-3"/>
      <WorkspaceSwitcher workspace={workspace}/>
      <Separator orientation="horizontal" className="my-3"/>
      <NaviMenu/>
      <Separator orientation="horizontal" className="my-3"/>
      <Projects/>

    </aside>
  )
}

export default Sidebar  