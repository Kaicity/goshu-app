//1. gọi ColumnDef từ react-table của TanStack
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { STATUS_LABELS, STATUS_STYLES, Status } from "@/enums/statusEnum";
import {
  ROLE_ICONS,
  ROLE_LABELS,
  ROLE_STYLES,
  UserRole,
} from "@/enums/userRolesEnum";
import { ArrowUpDown, Edit, MoreHorizontal, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { UserAccountDto } from "@/models/dto/userAccountDto";

export const columns = (
  handleDelete: (user: UserAccountDto) => void,
  handleUpdate: (user: UserAccountDto) => void
): ColumnDef<UserAccountDto>[] => [
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
      const user = row.original.role as UserRole;
      return (
        <div
          className={`min-w-[130px] mx-auto font-semibold rounded-md flex items-center justify-center gap-1 ${ROLE_STYLES[user]} w-max px-3 py-1 `}
        >
          {ROLE_ICONS[user]}
          {ROLE_LABELS[user]}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">TRẠNG THÁI</div>,
    enableColumnFilter: true,
    cell: ({ row }) => {
      const user = row.original.status as Status;

      return (
        <div
          className={`min-w-[90px] mx-auto font-semibold rounded-4xl flex items-center justify-center gap-1 ${STATUS_STYLES[user]} w-max px-3 py-1 `}
        >
          {STATUS_LABELS[user]}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center ">HÀNH ĐỘNG</div>,
    enableColumnFilter: true,
    cell: ({ row }) => {
      const resource = row.original;
      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleUpdate(resource)}>
                <Edit className="w-4 h-4 mr-2" />
                Chỉnh sửa
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(resource)}
                className="text-red-500 focus:text-red-500"
              >
                <Trash className="w-4 h-4 mr-2" />
                Xoá
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export default columns;
