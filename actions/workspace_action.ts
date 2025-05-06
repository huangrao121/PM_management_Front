'use server'
import { redirect } from 'next/navigation'
import {boolean, z} from "zod"
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
  const token = cookies().get('token')
  const result = await getCurrentUser(token)
  value.append("creater_user_name", result.email)
  value.append("creater_id", result.id)
  //console.log(value)
  //console.log("workspace_action result: "+result.email+" and other:" + result.id)
  const res = await fetch(backend_url+"/api/workspace/",{
    method:'POST',
    headers:{
      'Authorization': ('Bearer '+token?.value),
    },
    credentials:'include',
    body: value
  })
  //console.log(res)
  if(!res.ok){
    const errorData = await res.json()
    throw new Error(errorData.message || 'Create workspace failed')
  }
  // else{
  //   redirect("/")
  // }
}

const updateWSaction = async (value: FormData) =>{
  const token = cookies().get('token')
  
  const res = await fetch(backend_url+"/api/workspace/"+value.get("id"),{
    method:'PUT',
    headers:{
      'Authorization': ('Bearer '+token?.value),
    },
    credentials:'include',
    body: value
  })
  if(!res.ok){
    const errorData = await res.json()
    throw new Error(errorData.message || 'update workspace failed')
  }
}

const deleteWSaction = async (id: number)=>{
  const token = cookies().get('token')
  const res = await fetch(backend_url+"/api/workspace/"+id, {
    method: "DELETE",
    headers:{
      'Authorization': ('Bearer '+token?.value),
    },
    credentials:'include',
  })
  if(!res.ok){
    const errorData = await res.json()
    throw new Error(errorData.message || 'update workspace failed')
  }
}

const ResetWSCode = async (id: string)=>{
  const token = cookies().get('token')
  const res = await fetch((backend_url + "/api/workspace/" + id + "/reset-invite-code"), {
    method: "POST",
    headers:{
      'Authorization': ('Bearer '+token?.value),
    },
    credentials:'include',
  })
  if(!res.ok){
    const errorData = await res.json()
    throw new Error(errorData.message || 'Reset invite code failed')
  }
  return true
}

const joinWSaction = async (id: string, jwtToken: string, inviteCode: string)=>{
  //console.log(`from join workspace the invite code ${inviteCode}`)
  const res = await fetch((backend_url + "/api/workspace/" +id+"/join"), {
    method: "POST",
    headers:{
      'Authorization': ('Bearer '+jwtToken),
      'Content-Type': 'text/plain',
    },
    credentials:'include',
    body: inviteCode,
  })
  if(!res.ok){
    const errorData = await res.json()
    throw new Error(errorData.message || 'Failed to join the workspace')
  }
  return true
}
export {createWSaction, updateWSaction, deleteWSaction, joinWSaction, ResetWSCode}