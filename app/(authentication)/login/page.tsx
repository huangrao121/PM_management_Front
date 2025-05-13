import getCurrentUser from "@/app/lib/getCurrentUser"
import LoginCard from "@/features/login/LoginCard"

import { redirect } from "next/navigation"

const Login = async ()=>{
  try{
    const user = await getCurrentUser()
    if(user){
      redirect("/")
    }
  }catch(error){
    console.log(error)
  }
  return (
    <LoginCard/>
  )
}

export default Login