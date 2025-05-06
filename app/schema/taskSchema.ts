import { z } from "zod";

export enum TaskStatus {
    BACKLOG = "BACKLOG",
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    IN_REVIEW = "IN_REVIEW",
    DONE = "DONE",
    BLOCKED = "BLOCKED",
}

// export const taskSchema = z.object({
//     name: z.string().trim().min(1, { message: "Name is required" }),
//     description: z.string().optional(),
//     status: z.nativeEnum(TaskStatus, { message: "Status is required" }),
//     workspaceId: z.string().trim().min(1, { message: "Workspace is required" }),
//     projectId: z.string().trim().min(1, { message: "Project is required" }),
//     assigneeId: z.string().trim().min(1, { message: "Assignee is required" }),
//     dueDate: z.coerce.date(),
// });
export const taskSchema = z.object({
    name: z.string().trim().min(1, { message: "Name is required" }),
    description: z.string().optional(),
    status: z.nativeEnum(TaskStatus, { message: "Status is required" }),
    workspace_id: z.coerce.number().int().nonnegative(),
    project_id: z.coerce.number().int().nonnegative(),
    assignee_id: z.coerce.number().int().nonnegative(),
    due_date: z.coerce.date(),
});