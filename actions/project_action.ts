"use server"
import { cookies } from "next/headers"
import { backend_url } from "@/app/config/config"

const createPJaction = async (value: FormData)=>{
  const token = cookies().get('token')
  //console.log(value)
  //console.log("workspace_action result: "+result.email+" and other:" + result.id)
  const res = await fetch(backend_url+"/api/projects/",{
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
  const result = await res.json()
  if(result.response_key != "SUCCESS"){
    throw new Error("Server side Failded fetch")
  } 
  return result.data
}

export {createPJaction}