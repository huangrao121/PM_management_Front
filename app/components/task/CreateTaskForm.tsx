'use client'

import { z } from "zod"
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { useRef } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {ImageIcon} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/app/lib/utils"
import { useRouter } from "next/navigation"
import { taskSchema, TaskStatus } from "@/app/schema/taskSchema"
import { useCreateTask } from "./hooks/useCreateTask"
import { useWorkspaceId } from "@/app/lib/hooks/useWorkspaceId"
import DateChoose from "./DateChoose"
import MemberAvatar from "../avatar/member-avatar"

interface CreateTaskFormProps {
  onCancel? : ()=>void,
  projectOptions: {
    id: number,
    name: string,
  }[],
  memberOptions: {
    id: number,
    name: string,
  }[]
}

const CreateTaskForm = ({onCancel, projectOptions, memberOptions}:CreateTaskFormProps)=>{
  const inputRef = useRef<HTMLInputElement>(null)
  const workspaceId = useWorkspaceId()
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      workspace_id: Number(workspaceId),
    }
  })
  const router = useRouter()
  const {mutate, isPending} = useCreateTask()


  const submitTask = (value: z.infer<typeof taskSchema>)=>{
    try{
      value.workspace_id = Number(workspaceId)
      value.project_id = Number(value.project_id)
      value.assignee_id = Number(value.assignee_id)
      mutate(value)
      form.reset()
      onCancel?.()
    }catch{
      //console.log("Create workspace failed")
      toast.error("Failed to create workspace")
    }
    
  }


  return (
    <Card className="w-full h-full border-none shadow-none bg-neutral-100">
      <CardHeader className="flex p-5">
        <CardTitle className="text-xl font-semibold">
          Create a new task
        </CardTitle>
      </CardHeader>
      <div className="px-5">
        <Separator orientation="horizontal"/>
      </div>
      <CardContent className="p-5">
      <Form {...form}>
          <form onSubmit={form.handleSubmit((value)=>{submitTask(value)})} className="flex flex-col gap-4">
            <div className="flex flex-col gap-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Task Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Task Name" {...field} type="name"></Input>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="due_date"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <DateChoose 
                        date={field.value || undefined}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assignee_id"
                render={({field})=>{
                  return (
                    <FormItem>
                      <FormLabel>Assignee</FormLabel>
                      <Select value={String(field.value)} onValueChange={field.onChange}>
                        <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Assignee"/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {memberOptions?.map((member)=>(
                          <SelectItem key={member.id} value={String(member.id)}>
                            <div className="flex items-center gap-x-2">
                              <MemberAvatar name={member.name}/>
                              {member.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage/>
                  </FormItem>
                )
              }}
              />
              <FormField
                control={form.control}
                name="status"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Status"/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={TaskStatus.BACKLOG}>Backlog</SelectItem>
                        <SelectItem value={TaskStatus.TODO}>Todo</SelectItem>
                        <SelectItem value={TaskStatus.IN_PROGRESS} >In Progress</SelectItem>
                        <SelectItem value={TaskStatus.IN_REVIEW}>In Review</SelectItem>
                        <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
                        <SelectItem value={TaskStatus.BLOCKED}>Blocked</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="project_id"
                render={({field})=>{
                  return (
                    <FormItem>
                      <FormLabel>Project</FormLabel>
                      <Select 
                        value={String(field.value)} 
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Project"/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {projectOptions?.map((project)=>(
                            <SelectItem key={project.id} value={String(project.id)}>
                              {project.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage/>
                    </FormItem>
                  )
                }}
              />
            </div>
            <Separator orientation="horizontal"/>
            <div className="flex flex-row items-center justify-end gap-x-3">
              <Button className={cn(!onCancel && "invisible")} type="button" variant="secondary" size={"md"} onClick={onCancel}>Cancel</Button>
              <Button type="submit" variant="default" size={"lg"}>Create Task</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default CreateTaskForm