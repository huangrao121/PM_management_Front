'use server'
import { cookies } from "next/headers"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { backend_url } from "../config/config"
import { redirect } from "next/navigation"
const getCurrentUser = async (token?: RequestCookie) =>{
  const cookieStore = cookies()
  const cookieToken = cookieStore.get('token')
  const response = await fetch((backend_url+'/api/user/current'), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': ('Bearer '+cookieToken?.value)
    },
    credentials:'include',  // Include credentials if needed
    cache: "force-cache"
  })

  if(!response.ok){
    throw new Error("Failed to fetch current user info")
  }
  const result = await response.json()
  if(result.response_key != "SUCCESS"){
    throw new Error("Failed to convert current user to json format")
  }
  return result.data
}

export default getCurrentUser