"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, MoreVerticalIcon } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { MembersType } from "@/app/lib/types/workspaceType"
import { Fragment } from "react"
import MemberAvatar from "../avatar/member-avatar"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { deleteMember } from "@/actions/member_action"
import { toast, Toaster } from "sonner"
import { useRouter } from "next/navigation"


interface WorkspaceMemberListProps {
  members?: MembersType[],
  workspaceId: string
}

const WorkspaceMemberList = ({members, workspaceId}:WorkspaceMemberListProps)=>{
  const router = useRouter()
  const handleDeleteMember = async (member_id: string)=>{
    const isDeleted = await deleteMember(workspaceId, member_id)
    if (!isDeleted){
      toast.error("You can't delete yourself")
      router.push("/")
    }else{
      toast.success("member deleted")
      router.refresh()
    }
  }

  const handleChangeMember = (role: string)=>{

  }

  return (
    <Card className="w-full h-full shadow-none border-none">
      <CardHeader className="flex flex-row items-center space-y-0 gap-x-4 p-7">
        <Button asChild variant={"secondary"} size={"sm"}>
          <Link href={`/`}>
            <ArrowLeftIcon className="size-4 mr-2"/>
            Back
          </Link>
        </Button>
        <CardTitle>
          Members List
        </CardTitle>
      </CardHeader>
      <div className="px-7">
        <Separator/>
      </div>
      <CardContent className="p-7">
        {members?.map((member, index)=>
          <Fragment key={member.user_id}>
            <div className="flex flex-row items-center gap-2">
              <MemberAvatar name={member.username} className="size-10" fallbackClassName="text-lg"/>
              <div className="flex flex-col">
                <p className="text-sm font-medium">{member.username}</p>
                <p className="text-xs text-muted-foreground">{member.email}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="ml-auto" variant={"secondary"} size={"icon"}>
                    <MoreVerticalIcon className="size-4 text-muted-foreground"/>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                  <DropdownMenuItem onClick={()=>handleChangeMember("admin")} className="font-medium">
                    Set as administrator
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={()=>handleChangeMember("member")} className="font-medium">
                    Set as member
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={()=>handleDeleteMember(member.user_id.toString())} className="font-medium text-red-600">
                    Remove {member.username}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="my-4"></div>
          </Fragment>
        )}
      </CardContent>
    </Card>
  )
}

export default WorkspaceMemberList