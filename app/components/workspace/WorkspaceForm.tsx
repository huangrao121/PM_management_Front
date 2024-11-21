'use client'

import { z } from "zod"
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createWSaction } from "@/actions/workspace_action"
import { workspaceSchema } from "@/app/schema/workspaceSchema"
import { useRef } from "react"
import Image from "next/image"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {ImageIcon} from "lucide-react"
import { toast } from "sonner"
interface WorkspacesProps {
  onCancel? : ()=>void
}
// const workspaceSchema = z.object({
//   name: z.string().trim().min(1, "Required"),
//   image: z.union([
//     z.instanceof(File),
//     z.string().transform((value) => value===""? undefined : value)
//   ]).optional(),
// })
const WorkspacesForm = ({onCancel}:WorkspacesProps)=>{
  const inputRef = useRef<HTMLInputElement>(null)
  const form = useForm<z.infer<typeof workspaceSchema>>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
    }
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if(file){
      form.setValue("image", file)
    }
  }

  const submitThroughtWorkAction = (value: z.infer<typeof workspaceSchema>)=>{
    try{
      const formData = new FormData()
      formData.append("name", value.name)
      if(value.image instanceof File){
        formData.append("workspace_image", value.image)
      }
      console.log(formData)
      createWSaction(formData)
      form.reset()
      toast.success("Workspace created")
    }catch{
      //console.log("Create workspace failed")
      toast.error("Failed to create workspace")
    }
    //formData.append("image", )
    
  }
  // const onSubmit = (value:z.infer<typeof workspaceSchema>)=>{
  //   console.log(value)
  // }

  return (
    <Card className="w-full h-full border-none shadow-none bg-neutral-100">
      <CardHeader className="flex p-5">
        <CardTitle className="text-xl font-semibold">
          Create a new workspace
        </CardTitle>
      </CardHeader>
      <div className="px-5">
        <Separator orientation="horizontal"/>
      </div>
      <CardContent className="p-5">
      <Form {...form}>
          <form onSubmit={form.handleSubmit((value)=>{submitThroughtWorkAction(value)})} className="flex flex-col gap-4">
            <div className="flex flex-col gap-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Workspace Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Workspace Name" {...field} type="name"></Input>
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
                        <p className="text-sm">Workspace Icon</p>
                        <p className="text-sm text-muted-foreground">
                          PNG, SVG, JPEG, JPG, max 10 MB
                        </p>
                        <input type="file" 
                          className="hidden"
                          ref={inputRef}
                          onChange={handleImageUpload}
                          accept=".jpg, .png, .svg, .jpeg"
                        />
                        <Button 
                          type="button" 
                          variant="link" 
                          className="bg-blue-300"
                          size="sm"
                          onClick={()=>inputRef.current?.click()}
                        >
                          Upload Image
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              />
            </div>
            <Separator orientation="horizontal"/>
            <div className="flex flex-row items-center justify-end gap-x-3">
              <Button type="button" variant="secondary" size={"md"} onClick={onCancel}>Cancel</Button>
              <Button type="submit" variant="default" size={"lg"}>Create Workspace</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default WorkspacesForm