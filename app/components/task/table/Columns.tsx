"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreVertical } from "lucide-react";

//import { snakeCaseToTitleCase } from "@/lib/utils";
//import { MemberAvatar } from "@/features/members/components/meber-avatar";
import ProjectAvatar from "@/app/components/project/ProjectAvatar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

//import { Task } from "../types";
import { TaskDate } from "@/app/components/task/TaskDate";
import { Task } from "@/app/lib/types/taskType";
//import { TaskActions } from "./task-actions";

export const columns: ColumnDef<Task>[] = [
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
];