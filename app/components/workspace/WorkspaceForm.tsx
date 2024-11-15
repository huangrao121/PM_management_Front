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
interface WorkspacesProps {
  onCancel? : ()=>void
}
const workspaceSchema = z.object({
  name: z.string().trim().min(1, "Required")
})
const WorkspacesForm = ({onCancel}:WorkspacesProps)=>{

  const form = useForm<z.infer<typeof workspaceSchema>>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
    }
  })

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
          <form onSubmit={form.handleSubmit((value)=>{createWSaction(value)})} className="flex flex-col gap-4">
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