'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger  } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { UserType } from "@/app/lib/userType"
import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
//import useLogout from "@/app/lib/hooks/useLogout"
import { logoutAction } from "@/actions/auth_action"
import LogOut from "@/app/(authentication)/logout/logout"
//import { useLogout } from "@/app/lib/hooks/useLogout"
interface userButtonProps {
  userName?: string
  email?: string
  user?: UserType
}

const UserButton = ({user}:{user: userButtonProps})=>{

  if(!user){
    return null
  }else{
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger >
          <Avatar className="size-10 hover:opacity-80 transition border border-neutral-200 ">
            <AvatarFallback className="bg-neutral-100 text-lg text-neutral-500 flex items-center justify-center">
              A
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="bottom" className="w-60" sideOffset={10}>
          <div className="flex flex-col items-center justify-center gap-2 px-3 py-4">
            <Avatar className="size-[52px] hover:opacity-80 transition border border-neutral-200 ">
              <AvatarFallback className="bg-neutral-100 text-xl text-neutral-500 flex items-center justify-center">
                A
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center justify-center gap-2 pt-2">
              <p className="font-medium text-neutral-600">
                {user?.userName || "User"}
              </p>
              <p className="font-medium text-neutral-600">
                {user?.email}
              </p>
            </div>
          </div>
          <Separator orientation={'horizontal'} className="border border-neutral-400"/>
          <DropdownMenuItem onClick={()=>{logoutAction()}} className="h-10 flex items-center justify-center font-medium cursor-pointer">
            <LogOut/>
            <p> Log out </p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
}  

export default UserButton