"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { joinWSaction } from "@/actions/workspace_action"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface JoinWorkspaceFormProps {
  name: string,
  token: string,
  workspaceId: string,
  inviteCode: string,
}

const JoinWorkspaceForm = ({name, token, workspaceId, inviteCode}: JoinWorkspaceFormProps)=>{
  const router = useRouter()
  const onJoin = async()=>{
    let isJoined:boolean = await joinWSaction(workspaceId, token, inviteCode)
    if (isJoined){
      toast.success("Successfully join the space")
      router.push(`/workspaces/${name}!!${workspaceId}`)
    }
  }

  return(
    <Card className="h-full w-full border-none shadow-none">
      <CardHeader className="p-6">
        <CardTitle className="text-xl font-bold">
          Join workspace
        </CardTitle>
        <CardDescription>
          You have been invited to join workspace <strong>{name}</strong>
        </CardDescription>
      </CardHeader>
      <div className="px-6">
        <Separator orientation="horizontal"/>
      </div>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-y-2 items-center justify-between py-6">
          <Button variant="default" type="button" className="w-full lg:w-fit" onClick={onJoin}>
            Join Workspace
          </Button>
          <Button variant="outline" type="button" asChild className="w-full lg:w-fit">
            <Link href="/">
              Cancel
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default JoinWorkspaceForm