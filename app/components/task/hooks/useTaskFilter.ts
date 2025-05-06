import {parseAsString, parseAsStringEnum, useQueryStates} from "nuqs"

import { TaskStatus } from "@/app/schema/taskSchema"

export const useTaskFilter = ()=>{
  return useQueryStates({
    status: parseAsStringEnum(Object.values(TaskStatus)),
    projectId: parseAsString,
    assigneeId: parseAsString,
    dueDate: parseAsString,
    search: parseAsString,
  })
}