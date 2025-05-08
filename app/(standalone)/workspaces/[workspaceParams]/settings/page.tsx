import getCurrentUser from "@/app/lib/getCurrentUser"

import { redirect } from "next/navigation"

import SettingClient from "./SettingClient"

const WorkspaceSettings = async ()=>{

  const user = await getCurrentUser()

  if(!user){
    redirect("/login")
  }

  return <SettingClient/>
}

export default WorkspaceSettings