import { useGetProjects } from "../project/hooks/useGetProjects"
import { useWorkspaceId } from "@/app/lib/hooks/useWorkspaceId"
import { useGetMembers } from "../member/hooks/useGetMembers"
import { MemberType } from "@/app/lib/types/memberType"
import { ProjectType } from "@/app/lib/types/projectType"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectSeparator } from "@/components/ui/select"
import { FolderIcon, ListChecksIcon, UserIcon } from "lucide-react"
import { TaskStatus } from "@/app/schema/taskSchema"  
import { useTaskFilter } from "./hooks/useTaskFilter"
import DateChoose from "./DateChoose"
import { Button } from "@/components/ui/button"
interface DataFilterProps{
  hideProjectFilter?: boolean
}

const DataFilter = ({hideProjectFilter}: DataFilterProps)=>{
  const workspaceId = useWorkspaceId()
  const {data: projects, isLoading: isProjectsLoading} = useGetProjects({workspaceId})
  const {data: members, isLoading: isMembersLoading} = useGetMembers({workspaceId})
  //console.log("members:",members)
  const projectOptions = projects?.map((project: ProjectType)=>({
    id: project.id,
    name: project.name
  }))

  const memberOptions = members?.map((member: MemberType)=>({
    id: member.user_id,
    name: member.username
  }))

  const [{status, projectId, assigneeId, dueDate, search}, setFilters] = useTaskFilter()
  
  if (isProjectsLoading || isMembersLoading){
    return null
  }

  const onStatusChange = (value: string)=>{
    setFilters({status: value === "all"? null : value as TaskStatus})
  }

  const onAssigneeChange = (value: string)=>{
    setFilters({assigneeId: value === "all"? null : value})
  }

  const onProjectChange = (value: string)=>{
    setFilters({projectId: value === "all"? null : value})
  }

  // const onDueDateChange = (value: string)=>{
  //   setFilters({dueDate: value === "all"? null : value})
  // }

  // const onSearchChange = (value: string)=>{
  //   setFilters({search: value})
  // }
  const onReset = ()=>{
    setFilters({
      status: null,
      projectId: null,
      assigneeId: null,
      dueDate: null,
      search: null
    })
  }

  return (
    <div className="flex flex-col lg:flex-row items-center gap-2">
      <Select defaultValue={status ?? undefined} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full lg:w-auto">
          <div className="flex flex-row items-center pr-2">
            <ListChecksIcon className="size-4 mr-2"/>
            <SelectValue placeholder="All statuses"/>
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectSeparator/>
          <SelectItem value={TaskStatus.BACKLOG}>BACKLOG</SelectItem>
          <SelectItem value={TaskStatus.TODO}>TODO</SelectItem>
          <SelectItem value={TaskStatus.IN_PROGRESS}>IN PROGRESS</SelectItem>
          <SelectItem value={TaskStatus.DONE}>DONE</SelectItem>
          <SelectItem value={TaskStatus.IN_REVIEW}>IN REVIEW</SelectItem>
          <SelectItem value={TaskStatus.BLOCKED}>BLOCKED</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue={assigneeId ?? undefined} onValueChange={onAssigneeChange}>
        <SelectTrigger className="w-full lg:w-auto">
          <div className="flex flex-row items-center pr-2">
            <UserIcon className="size-4 mr-2"/>
            <SelectValue placeholder="Assingee"/>
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Assignee</SelectItem>
          <SelectSeparator/>
          {memberOptions?.map((member:{id: number, name: string})=>(
            <SelectItem key={member.id} value={String(member.id)}>{member.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {!hideProjectFilter && (
        <Select defaultValue={projectId ?? undefined} onValueChange={onProjectChange}>
          <SelectTrigger className="w-full lg:w-auto">
          <div className="flex flex-row items-center pr-2">
            <FolderIcon className="size-4 mr-2"/>
            <SelectValue placeholder="Project"/>
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Project</SelectItem>
          <SelectSeparator/>
          {projectOptions?.map((project:{id: number, name: string})=>(
            <SelectItem key={project.id} value={String(project.id)}>{project.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      )}
      <DateChoose
        date={dueDate?new Date(dueDate): undefined}
        onChange={(value)=>{
          setFilters({dueDate: value? value.toISOString() : null})
        }}
        placeholder="Due Date"
        className="w-full lg:w-auto text-neutral-900"
      />
      <Button variant="outline" onClick={onReset} className="w-full text-sm lg:w-auto lg:ml-10">Reset</Button>
    </div>
  )
} 

export default DataFilter