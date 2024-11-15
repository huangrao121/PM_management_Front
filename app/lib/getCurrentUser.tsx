'use server'

import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { backend_url } from "../config/config"
const getCurrentUser = async (token?: RequestCookie) =>{

  const response = await fetch((backend_url+'/api/user/current'), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': ('Bearer '+token?.value)
    },
    credentials:'include'  // Include credentials if needed
  })
  if(!response.ok)
    return null
  const result = await response.json()
  return result.data
}

export default getCurrentUser