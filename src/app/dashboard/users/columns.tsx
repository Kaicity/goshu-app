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
import UserAccountDto from "@/models/dto/userAccountDto";
import { ArrowUpDown, Edit, Trash } from "lucide-react";

export const columns = (
  handleDelete: (user: UserAccountDto) => void,
  handleUpdate: (email: string) => void
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
          className={`min-w-[90px] mx-auto font-semibold rounded-4xl flex items-center justify-center gap-1 ${STATUS_STYLES[user]} w-max px-3 py-1 `}
        >
          {STATUS_LABELS[user]}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center ">HÀNH ĐỘNG</div>,
    cell: ({ row }) => {
      const resource = row.original;
      return (
        <div className="flex justify-center gap-2 ">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleUpdate(resource.email)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(resource)}
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
