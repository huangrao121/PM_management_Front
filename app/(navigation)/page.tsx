//'use client'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import getCurrentUser from "@/app/lib/getCurrentUser";
import UserButton from '@/features/components/user-button';
import WorkspacesForm from '../components/workspace/WorkspaceForm';
export default async function Home() {

  const cookieStore = cookies()
  const token = cookieStore.get('token')
  //console.log(token)
  const result = await getCurrentUser(token)
  if(!result){
    redirect("/login")
  }
  console.log(result)
  return (
    <div>
      <WorkspacesForm/>
    </div>
  )
}
