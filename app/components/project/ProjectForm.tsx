'use client'

import { z } from "zod"
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { projectSchema } from "@/app/schema/projectSchema"
import { useRef } from "react"
import Image from "next/image"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {ImageIcon} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/app/lib/utils"
import { useRouter } from "next/navigation"
import { useWorkspaceId } from "@/app/lib/hooks/useWorkspaceId"
import { useCreateProject } from "./hooks/useCreateProject"
interface ProjectsProps {
  onCancel? : ()=>void
}
// const workspaceSchema = z.object({
//   name: z.string().trim().min(1, "Required"),
//   image: z.union([
//     z.instanceof(File),
//     z.string().transform((value) => value===""? undefined : value)
//   ]).optional(),
// })

const ProjectForm = ({onCancel}:ProjectsProps)=>{
  const inputRef = useRef<HTMLInputElement>(null)
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
    }
  })

  const {mutate: createProject, isPending} = useCreateProject()
  const workspace_id = useWorkspaceId()
  const router = useRouter()
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if(file){
      form.setValue("image", file)
    }
  }

  const submitProjectAction = (value: z.infer<typeof projectSchema>)=>{
    try{
      const formData = new FormData()
      formData.append("name", value.name)
      formData.append("workspace_id", workspace_id)
      if(value.image instanceof File){
        formData.append("project_image", value.image)
      }
      //console.log(formData)
      createProject(formData)
      toast.success("Project created")
      form.reset()
      router.push("/")
      onCancel?.()
    }catch{
      //console.log("Create workspace failed")
      toast.error("Failed to create project")
    }
  }


  return (
    <Card className="w-full h-full border-none shadow-none bg-neutral-100">
      <CardHeader className="flex p-5">
        <CardTitle className="text-xl font-semibold">
          Create a new project
        </CardTitle>
      </CardHeader>
      <div className="px-5">
        <Separator orientation="horizontal"/>
      </div>
      <CardContent className="p-5">
      <Form {...form}>
          <form onSubmit={form.handleSubmit((value)=>{submitProjectAction(value)})} className="flex flex-col gap-4">
            <div className="flex flex-col gap-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Project Name" {...field} type="name"></Input>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({field}) => (
                  <div className="flex flex-col gap-y-2">
                    <div className="flex items-center gap-x-5">
                      {
                        field.value? (
                          <div className="size-[72px] relative rounded-md overflow-hidden">
                            <Image
                              alt="workspace icon"
                              src={field.value instanceof File?
                                URL.createObjectURL(field.value)
                                : field.value
                              }
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <Avatar className='size-[72px]'>
                            <AvatarFallback>
                              <ImageIcon
                                className="size-[36px]"
                              />
                            </AvatarFallback>
                          </Avatar>
                        )
                      }
                      <div className="flex flex-col">
                        <p className="text-sm">Project Icon</p>
                        <p className="text-sm text-muted-foreground">
                          PNG, SVG, JPEG, JPG, max 10 MB
                        </p>
                        <input type="file" 
                          className="hidden"
                          ref={inputRef}
                          onChange={handleImageUpload}
                          accept=".jpg, .png, .svg, .jpeg"
                        />
                        {!field.value ? (
                          <Button 
                            type="button" 
                            variant="link" 
                            className="bg-blue-300"
                            size="sm"
                            onClick={()=>inputRef.current?.click()}
                          >
                            Upload Image
                          </Button>
                          ):(
                            <Button 
                            type="button" 
                            variant="link" 
                            className="bg-blue-300"
                            size="sm"
                            onClick={()=>{
                              field.onChange(null)
                              if(inputRef.current){
                                inputRef.current.value = ""
                              }
                            }}
                            >
                              Remove Image
                            </Button>
                          )
                        }
                      </div>
                    </div>
                  </div>
                )}
              />
            </div>
            <Separator orientation="horizontal"/>
            <div className="flex flex-row items-center justify-end gap-x-3">
              <Button className={cn(!onCancel && "invisible")} type="button" variant="secondary" size={"md"} onClick={onCancel}>Cancel</Button>
              <Button type="submit" variant="default" size={"lg"}>Create Project</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ProjectForm