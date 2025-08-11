'use client';
import { ColumnDef } from '@tanstack/react-table';
import { DepartmentDto } from '@/models/dto/departmentDto';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';

export const columns = (
  handleDelete: (department: DepartmentDto) => void,
  handleUpdate: (department: DepartmentDto) => void,
): ColumnDef<DepartmentDto>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <div className="flex justify-center">
        <Checkbox
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Checkbox onCheckedChange={(value) => row.toggleSelected(!!value)} checked={row.getIsSelected()} />
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Tên phòng ban',
  },
  {
    accessorKey: 'description',
    header: 'Mô tả',
  },
  {
    accessorKey: 'updatedAt',
    header: () => <div className="text-center">CẬP NHẬT LÚC</div>,
    cell: ({ row }) => {
      const updatedAt = row.original.updatedAt;
      return <div className="text-center">{updatedAt ? format(new Date(updatedAt), 'dd/MM/yyyy HH:mm:ss') : ''}</div>;
    },
  },
  {
    accessorKey: 'actions',
    header: () => <div className="text-center ">HÀNH ĐỘNG</div>,
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
              <DropdownMenuItem onClick={() => handleDelete(resource)} className="text-red-500 focus:text-red-500">
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
