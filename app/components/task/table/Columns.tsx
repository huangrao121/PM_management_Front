"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreVertical } from "lucide-react";

import ProjectAvatar from "@/app/components/project/ProjectAvatar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


import { TaskInfo } from "@/app/lib/types/taskType";
import TaskAction from "./TaskAction";
import { TaskStatus } from "@/app/schema/taskSchema";
import MemberAvatar from "../../avatar/member-avatar";
import TaskDate from "../TaskDate";

export const columns: ColumnDef<TaskInfo>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Task Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original.name;

      return <p className="line-clamp-1">{name}</p>;
    },
  },
  {
    accessorKey: "project",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Project
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      //const project = row.original.project_name;

      return (
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
              className="size-6"
              name={row.original.project_name}
          />
          <p className="line-clamp-1">{row.original.project_name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "Assignee",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Assignee
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const assignee = row.original.assignee_name;

      return (
        <div className="flex items-center gap-x-2">
          <MemberAvatar
              className="size-7"
              name={assignee}
          />
          <p className="line-clamp-1">{assignee}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "Due Date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dueDate = row.original.due_date;

      return (
        <TaskDate
          value={dueDate}
        />
      );
    },
  },
  {
    accessorKey: "Status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status as TaskStatus
      return <Badge variant={status}>{status.toLowerCase()}</Badge>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;
      const project_id = row.original.project_id;
      const workspace_id = row.original.workspace_id;
      return (
        <TaskAction taskId={id} projectId={project_id}>     
          <Button variant={"ghost"} className="size-8">
            <MoreVertical className="size-4" />
          </Button>
        </TaskAction>
      );
    },
  }
];