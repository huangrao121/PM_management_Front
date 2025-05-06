"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Loader, PlusIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"

import useCreateTaskModal from "@/features/zustand/useCreateTaskModal"

import { useGetTasks } from "./hooks/useGetTasks"
import { useWorkspaceId } from "@/app/lib/hooks/useWorkspaceId"
import { useChangeTasks } from "./hooks/useChangeTasks"

import DataFilter from "./DataFilter"
import { useQueryState } from "nuqs"
import { useTaskFilter } from "./hooks/useTaskFilter"
import { DataTable } from "./table/DataTable"
import { columns } from "./table/Columns"
import { TaskInfo } from "@/app/lib/types/taskType"
import DataKanban from "./kanban/DataKanban"
import DataCalendar from "./Calendar/Datacalendar"
import { useCallback } from "react"

interface TaskSwitcherProps{
  hiddenProject?: boolean
  projectPropId?: string
}

const TaskSwitcher = ({hiddenProject, projectPropId}: TaskSwitcherProps)=>{
  const [view, setView] = useQueryState("task_view",{defaultValue: "Table"})
  const {onOpen} = useCreateTaskModal()
  const workspaceId = useWorkspaceId()
  const [{status, projectId, assigneeId, dueDate, search} ]= useTaskFilter()
  const {data: tasks, isLoading: isLoadingTasks} = useGetTasks({workspaceId, status: status ?? undefined, projectId: projectPropId ?? projectId, assigneeId, dueDate, search})
  const {mutate: changeTasks, isPending: isChangingTasks} = useChangeTasks()
  //console.log("tasks:",tasks)
  const onKanbanChange = useCallback(async (tasks: {id: string, status: string, position: number}[])=>{
    changeTasks({tasks})
  },[changeTasks])
  return (
    <Tabs className="w-full flex-1 border rounded-md" value={view} onValueChange={setView}>
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row items-center justify-between">
          <TabsList className="w-full lg:w-auto">
              <TabsTrigger className="w-full lg:w-auto" value="Table">Table</TabsTrigger>
              <TabsTrigger className="w-full lg:w-auto" value="Kanban">Kanban</TabsTrigger>
              <TabsTrigger className="w-full lg:w-auto" value="Calendar">Calendar</TabsTrigger>
          </TabsList>
          <Button size="sm" onClick={onOpen}>
            <PlusIcon className="size-4 mr-2"/>
            Add
          </Button>
        </div>
        <Separator className="my-4"/>
        <DataFilter hideProjectFilter={hiddenProject}/>
        <Separator className="my-4"/>
        {isLoadingTasks ? (
          <div className="flex items-center justify-center h-full">
            <Loader className="size-4 animate-spin"/>
          </div>
        ) :
        <>
          <TabsContent value="Table">
            <DataTable columns={columns} data={tasks ?? []}/>
          </TabsContent>
          <TabsContent value="Kanban">
            <DataKanban onChange={onKanbanChange} data={tasks ?? []} />
          </TabsContent>
          <TabsContent value="Calendar">
            <DataCalendar data={tasks ?? []}/>
          </TabsContent>
        </>
        }
      </div>
    </Tabs>
    )
}

export default TaskSwitcher