import React,{useCallback, useEffect, useState} from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { TaskInfo } from "@/app/lib/types/taskType";
import { TaskStatus } from "@/app/schema/taskSchema";

import KanbanColumnHeader from "./KanbanColumnHeader";
import KanbanCard from "./KanbanCard";

const boards: TaskStatus[] = [
  TaskStatus.BACKLOG,
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.IN_REVIEW,
  TaskStatus.DONE,
  TaskStatus.BLOCKED,
]

type TasksState = Record<TaskStatus, TaskInfo[]>
type TaskState = {
  [key in TaskStatus]: TaskInfo[]
}
interface DataKanbanProps {
  data: TaskInfo[];
  onChange?: (tasks: {id: string, status: string, position: number}[])=>void
}

const DataKanban= ({data, onChange}: DataKanbanProps) => {
  const [tasks, setTasks] = useState<TasksState>(()=>{
    const initialTasks: TasksState = {
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: [],
      [TaskStatus.BLOCKED]: [],
    }
    data.forEach((task) => {
      initialTasks[task.status].push(task)
    })

    Object.keys(initialTasks).forEach((status)=>{
      initialTasks[status as TaskStatus].sort((a, b)=> a.position - b.position)
    })
    return initialTasks
  })

  useEffect(()=>{
    const newTasks: TasksState = {
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: [],
      [TaskStatus.BLOCKED]: [],
    }
    data.forEach((task)=>{
      newTasks[task.status as TaskStatus].push(task)
    })
    Object.keys(newTasks).forEach((status)=>{
      newTasks[status as TaskStatus].sort((a, b)=> a.position - b.position)
    })
    setTasks(newTasks)
  },[data])

  const onDragEnd = useCallback((result: DropResult)=>{
    if (!result.destination) return

    const {source, destination} = result
    const sourceStatus = source.droppableId as TaskStatus
    const destinationStatus = destination.droppableId as TaskStatus

    let updatePayload:{
      id: string,
      status: TaskStatus,
      position: number
    }[] = []
    setTasks((prevTasks:TaskState)=>{
      const newTasks = {...prevTasks}
      const sourceColumn = [...newTasks[sourceStatus]]
      const [movedTask] = sourceColumn.splice(source.index, 1)

      if(!movedTask) {
        console.error("No task found to move")
        return prevTasks
      }
      const updatedMovedTask = sourceStatus !== destinationStatus
        ? {...movedTask, status: destinationStatus}
        : movedTask
      newTasks[sourceStatus] = sourceColumn
      const destinationColumn = [...newTasks[destinationStatus]]
      destinationColumn.splice(destination.index, 0, updatedMovedTask)
      newTasks[destinationStatus] = destinationColumn
      
      updatePayload = []
      updatePayload.push({ id: movedTask.id, status: destinationStatus, position: Math.min((destination.index+1)*100, 10000000)})

      newTasks[destinationStatus].forEach((task, index)=>{
        if (task && task.id !== updatedMovedTask.id){
          const newPos = Math.min((index+1)*100, 10000000)
          if(task.position !== newPos){
            updatePayload.push({id: task.id, status: destinationStatus, position: newPos})
          }
        }
      })

      if(sourceStatus !== destinationStatus){
        newTasks[sourceStatus].forEach((task, index)=>{
          if(task){
            const newPos = Math.min((index+1)*100, 10000000)
            if(task.position !== newPos){
              updatePayload.push({id: task.id, status: sourceStatus, position: newPos})
            }
          }
        })
      }
      return newTasks
    })
    onChange?.(updatePayload)
  },[onChange])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex ">
        {boards.map((board) => (
          <div key={board} className="flex-shrink-0 w-[270px] mx-2 bg-muted rounded-md min-w-[200px] p-2">
            <KanbanColumnHeader title={board} taskCount={tasks[board].length} />
            <Droppable droppableId={board}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="min-h-[400px] flex flex-col gap-y-2"
                >
                  {tasks[board].map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={String(task.id)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          
                        >
                          <KanbanCard task={task}/>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );

}

export default DataKanban