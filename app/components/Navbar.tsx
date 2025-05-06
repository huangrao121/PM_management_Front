import UserButton from "@/features/components/user-button";
import getCurrentUser from "../lib/getCurrentUser";
import { cookies } from "next/headers";
import MobileSidebar from "./MobileSidebar";
const Navbar = async ()=>{
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  //console.log(token)
  const result = await getCurrentUser(token)
  return (
    <div className="pt-4 px-6 flex items-center justify-between">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-semibold">Home</h1>
        <p>All your projects and workspaces</p>
      </div>
      <MobileSidebar/>
      <UserButton user={result}/>
    </div>
  )  
}

export default Navbar;