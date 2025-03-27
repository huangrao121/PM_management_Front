//'use client'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import getCurrentUser from "@/app/lib/getCurrentUser";
import UserButton from '@/features/components/user-button';
import WorkspacesForm from '../components/workspace/WorkspaceForm';
import { WorkspaceType } from '../lib/types/workspaceType';
import { getWorkspaces } from '../lib/getWorkspaces';
export default async function Home() {

  const cookieStore = cookies()
  const token = cookieStore.get('token')
  //console.log(token)
  const result = await getCurrentUser(token)
  const workspaces:WorkspaceType[] = await getWorkspaces(token)
  if(!result){
    redirect("/login")
  }

  if( !workspaces || workspaces?.length === 0){
    redirect("/workspaces/init")
  }else{
    redirect(`/workspaces/${workspaces[0].name}!!${workspaces[0].id}`)
  }

}
