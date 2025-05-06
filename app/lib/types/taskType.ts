import { TaskStatus } from "@/app/schema/taskSchema";

export type Task = {
  // id: string
  name: string
  description: string
  status: TaskStatus
  project_id: string
  assignee_id: string
  due_date: string
  position: number
  workspace_id: string
};

export type TaskInfo = {
  id: string
  name: string
  description: string
  status: TaskStatus
  project_id: string
  assignee_id: string
  due_date: string
  position: number
  workspace_id: string
  project_name: string
  project_image: string
  assignee_name: string
  assignee_email: string
}