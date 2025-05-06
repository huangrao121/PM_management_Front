'use client'
import { WorkspaceType } from "@/app/lib/types/workspaceType"
import {RiAddCircleFill} from "react-icons/ri"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup} from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useWorkspaceParams } from "@/app/lib/hooks/useWorkspaceId"
import useWorkspaceForm from "@/features/zustand/FormStore"
interface WorkspaceProps{
  workspace:WorkspaceType[]
}
const WorkspaceSwitcher = ({workspace}:WorkspaceProps)=>{
  const workspaceId:string = useWorkspaceParams()
  const totalSpaces = workspace?.length
  const router = useRouter()
  const onSelect = (id: string)=>{
    router.push(`/workspaces/${id}`)
  }
  const {onOpen} = useWorkspaceForm()
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-md uppercase text-neutral-600">Workspace</p>
        <RiAddCircleFill onClick={onOpen} className="text-neutral-600 size-5 cursor-pointer hover:opacity-80 transition"/>
      </div>
      <Select onValueChange={onSelect} value={workspaceId}>
        <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
          <SelectValue placeholder="Choose Workspace"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {workspace?.map((item) => (
              // <SelectItem key={item.id} value={(item.name+'!!'+item.id)}>
              <SelectItem key={item.id} value={(item.name+'!!'+item.id)}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {totalSpaces}
    </div>
  )
}

export default WorkspaceSwitcher