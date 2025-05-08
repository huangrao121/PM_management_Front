'use client'

import { z } from "zod"
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import { deleteWSaction } from "@/actions/workspace_action"
import { updateWrokspaceSchema } from "@/app/schema/workspaceSchema"
import { useRef } from "react"
import Image from "next/image"
import {ArrowLeftIcon, ImageIcon, CopyIcon} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/app/lib/utils"
import { WorkspaceType } from "@/app/lib/types/workspaceType"
import { useRouter } from "next/navigation"

import { useConfirm } from "@/app/lib/hooks/useConfirm"
import { useUpdateWorkspace } from "./hooks/useUpdateWorkspace"
import { useResetInviteCode } from "./hooks/useResetInviteCode"

interface WorkspacesUpdateProps {
  onCancel? : ()=>void,
  initialValues: WorkspaceType
}
// const workspaceSchema = z.object({
//   name: z.string().trim().min(1, "Required"),
//   image: z.union([
//     z.instanceof(File),
//     z.string().transform((value) => value===""? undefined : value)
//   ]).optional(),
// })
const WorkspaceFormUpdate = ({onCancel, initialValues}:WorkspacesUpdateProps)=>{
  const router = useRouter()

  const inputRef = useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof updateWrokspaceSchema>>({
    resolver: zodResolver(updateWrokspaceSchema),
    defaultValues: {
      name: initialValues.name,
      // image: initialValues.url ?? "",
      image: "/cute_puppy.jpg",
    }
  })

  const [ConfirmationDialog, confirmDelete] = useConfirm(
    "Delete workspace",
    "This action cannot be done",
    "destructive",
  )

  const [ResetDialog, confirmReset] = useConfirm(
    "Reset Invite Code",
    "This will reset the link",
    "destructive"
  )

  const {mutate, isPending} = useUpdateWorkspace()
  const {mutate: resetInviteCode, isPending: isResetting} = useResetInviteCode()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if(file){
      form.setValue("image", file)
    }
  }

  const submitThroughtWorkAction = async (value: z.infer<typeof updateWrokspaceSchema>)=>{
    try{
      const formData = new FormData()
      if(value.name){
        formData.append("name", value.name)
      }
      if(value.image instanceof File){
        formData.append("workspace_image", value.image)
      }
      formData.append("id", initialValues.id.toString())
      //console.log(formData)
      mutate({formData, workspaceId: initialValues.id.toString()})
      form.reset()
      onCancel?.()
    }catch{
      //console.log("Create workspace failed")
      toast.error("Failed to create workspace")
    }
    
  }

  const handleCopyInviteLink = ()=>{
    navigator.clipboard.writeText(fullInviteLink)
    .then(()=>toast.success("Invite link has copied"))
  }
  // const onSubmit = (value:z.infer<typeof updateWrokspaceSchema>)=>{
  //   console.log(value)
  // }
  const handleResetInviteCode = async ()=>{
    const ok = await confirmReset()
    if(!ok) return
    resetInviteCode(initialValues.id.toString())
  }

  const handleDelete = async ()=>{
    const ok = await confirmDelete()
    if(!ok) return
    await deleteWSaction(initialValues.id)
    window.location.href="/"
    //console.log("deleting")
  }

  const fullInviteLink = `${window.location.origin}/workspaces/${initialValues.name}!!${initialValues.id}/join/${initialValues.invite_code}`

  return (
    <div className="flex flex-col gap-y-4">
      <ResetDialog/>
      <ConfirmationDialog/>
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-5">
          <Button size="sm" variant="secondary" onClick={onCancel ? onCancel:()=>{router.push("/")}}>
            <ArrowLeftIcon/>
            Back
          </Button>
          <CardTitle className="text-xl font-semibold">
            Edit Workspace
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
                <Button type="submit" variant="default" size={"lg"}>Save</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Reset Invite Code</h3>
            <p className="text-sm text-muted-foreground">
              Use the invite link to add members to your workspace.
            </p>
            <div className="mt-4">
              <div className="flex items-center justify-between gap-x-2">
                <input className="w-3/4" disabled value={fullInviteLink} />
                <Button
                  onClick={handleCopyInviteLink}
                  variant="secondary"
                  className="size-12"
                >
                  <CopyIcon className="size-5"/>
                </Button>
              </div>
            </div>
            <Button className="mt-6 w-fit ml-auto" size="sm" variant="default" type="button"
              onClick={handleResetInviteCode}
            >
              Reset Invite Code
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Delete a workspace is irreversible action, it will remove all the information of this workspace
            </p>
            <Button className="mt-6 w-fit ml-auto" size="sm" variant="destructive" type="button"
              onClick={handleDelete}
            >
              Delete Workspace
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default WorkspaceFormUpdate