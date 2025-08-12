'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EmployeeDto } from '@/models/dto/employeeDto';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, MoreHorizontal, Trash } from 'lucide-react';

import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { TypeWork, TYPEWORK_LABELS } from '@/enums/typeWorkEnum';

export const columns: ColumnDef<EmployeeDto>[] = [
  {
    accessorKey: 'fullname',
    header: 'HỌ VÀ TÊN',
  },
  {
    accessorKey: 'employeeCode',
    header: 'MÃ NHÂN VIÊN',
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <div className="">
          <Button
            className="hover:bg-gray-200"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            EMAIL
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: 'designation',
    header: 'CHỨC VỤ',
  },
  {
    accessorKey: 'type',
    header: 'NƠI LÀM VIỆC',
    cell: ({ row }) => {
      const employee = row.original.type as TypeWork;
      return <div>{TYPEWORK_LABELS[employee]}</div>;
    },
  },
  {
    accessorKey: 'departmentId',
    header: 'PHÒNG BAN',
    cell: ({ row }) => {
      return <div>{row.original.departmentId?.name || ''}</div>;
    },
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
    enableColumnFilter: true,
    cell: ({ row }) => {
      const resource = row.original;
      const router = useRouter();
      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  router.push(`/dashboard/employees/info-update/${resource.id}`);
                }}
              >
                <Edit className="w-4 h-4 mr-2" />
                Chỉnh sửa
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => resource} className="text-red-500 focus:text-red-500">
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
