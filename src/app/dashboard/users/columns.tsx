import React from "react";
//1. gọi ColumnDef từ react-table của TanStack
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, Divide, Edit, Trash } from "lucide-react";
import {
  ROLE_ICONS,
  ROLE_LABELS,
  ROLE_STYLES,
  UserRole,
} from "@/enums/userRolesEnum";
import { STATUS_LABELS, STATUS_STYLES, Status } from "@/enums/statusEnum";

//2. định nghia kiểu dữ liệu cho người dùng
export type User = {
  id: string;
  email: string;
  password: string;
  role_id: string;
  status: string;
  employee_id: string;
};

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex justify-center">
        <Checkbox
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Checkbox
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          checked={row.getIsSelected()}
        />
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            className="hover:bg-gray-200"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            EMAIL
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const user = row.original;
      return <div className="text-center">{user.email}</div>;
    },
  },
  {
    accessorKey: "role",
    header: () => <div className="text-center">CHỨC VỤ</div>,
    cell: ({ row }) => {
      const user = row.original.role_id as UserRole;
      return (
        <div
          className={`min-w-[140px] mx-auto font-semibold rounded-4xl flex items-center justify-center gap-1 ${ROLE_STYLES[user]} w-max px-3 py-1 `}
        >
          {ROLE_ICONS[user]}
          {ROLE_LABELS[user]}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">TRẠNG THÁI</div>,
    cell: ({ row }) => {
      const user = row.original.status as Status;
      return (
        <div
          className={`min-w-[140px] mx-auto font-semibold rounded-4xl flex items-center justify-center gap-1 ${STATUS_STYLES[user]} w-max px-3 py-1 `}
        >
          {STATUS_LABELS[user]}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-right pr-4">HÀNH ĐỘNG</div>,
    cell: ({ row }) => {
      const resource = row.original;

      return (
        <div className="flex justify-end items-center gap-2 pr-4">
          <Button variant="ghost" size="sm" onClick={() => resource}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => resource}
            className="text-red-500"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

export default columns;
