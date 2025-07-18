import React from 'react'
//1. gọi ColumnDef từ react-table của TanStack
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, Edit, Trash  } from "lucide-react";

//2. định nghia kiểu dữ liệu cho người dùng
export type User = {
    id: string
    email: string
    password: string
    role_id: string
    employee_id: string
}

export const columns: ColumnDef<User>[] = [
    {id: "select",
    header: ({ table }) => (
      <Checkbox
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        checked={row.getIsSelected()}
      />
    ),
  },
    {
        accessorKey: "email",
        header:({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    },
    {
        accessorKey: "password",
        header: "Password",
    },
    {
        accessorKey: "actions",
        header: "Hành động",
         cell: ({ row }) => {
        const resource = row.original;

        return (
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={() => (resource)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => (resource)} className="text-red-500">
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        );
    },
    },
];

  
export default columns
