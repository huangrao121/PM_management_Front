'use server'
import { redirect } from 'next/navigation'
import {z} from "zod"
import { cookies } from 'next/headers'
import { backend_url } from '@/app/config/config'
import getCurrentUser from '@/app/lib/getCurrentUser'
import { workspaceSchema } from '@/app/schema/workspaceSchema'
// const workspaceSchema = z.object({
//   name: z.string().trim().min(1, "Required"),
//   image: z.union([
//     z.instanceof(File),
//     z.string().transform((value) => value===""? undefined : value)
//   ]).optional(),
// })
const createWSaction = async (value: FormData)=>{
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  const result = await getCurrentUser(token)
  value.append("creater_user_name", result.email)
  value.append("creater_id", result.id)
  //console.log("workspace_action result: "+result.email+" and other:" + result.id)
  const res = await fetch(backend_url+"/api/workspace",{
    method:'POST',
    // headers:{
    //   'Content-Type':'multipart/form-data',
    // },
    credentials:'include',
    body: value
    // body:JSON.stringify({
    //   //name: value.name,
    //   name: value.get("name"),
    //   creater_user_name: result.email,
    //   creater_id: result.id,
    //   workspace_image: value.get("image")
    // })
  })
  if(!res.ok){
    const errorData = await res.json();
    throw new Error(errorData.message || 'Create workspace failed');
  }else{
    redirect("/")
  }
}

export {createWSaction}