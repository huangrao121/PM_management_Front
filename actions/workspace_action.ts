'use server'
import { redirect } from 'next/navigation'
import {z} from "zod"
import { cookies } from 'next/headers'
import { backend_url } from '@/app/config/config'
import getCurrentUser from '@/app/lib/getCurrentUser'

const workspaceSchema = z.object({
  name: z.string().trim().min(1, "Required")
})
const createWSaction = async (value: z.infer<typeof workspaceSchema>)=>{
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  const result = await getCurrentUser(token)
  console.log("workspace_action result: "+result.email+" and other:" + result.id)
  const res = await fetch(backend_url+"/api/workspace",{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
    },
    credentials:'include',
    body:JSON.stringify({
      name:value.name,
      creater_user_name: result.email,
      creater_id: result.id
    })
  })
  if(!res.ok){
    const errorData = await res.json();
    throw new Error(errorData.message || 'Create workspace failed');
  }else{
    redirect("/")
  }
}

export {createWSaction}