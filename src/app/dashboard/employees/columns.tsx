'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { EmployeeDto } from '@/models/dto/employeeDto';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { TypeWork, TYPEWORK_LABELS } from '@/enums/typeWorkEnum';
import { vi } from 'date-fns/locale';

export const columns: ColumnDef<EmployeeDto>[] = [
  {
    accessorKey: 'employeeCode',
    header: 'MÃ NHÂN VIÊN',
  },
  {
    id: 'fullname',
    accessorFn: (row) => `${row.lastname || ''} ${row.firstname || ''}`.trim(),
    header: ({ column }) => {
      return (
        <div className="">
          <Button
            className="hover:bg-gray-200"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            HỌ VÀ TÊN
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const employee = row.original;
      const fullName = `${employee.lastname ?? ''} ${employee.firstname ?? ''}`.trim() || '--/--';
      return (
        <div className="flex items-center gap-3 min-w-[200px] flex-grow">
          <img
            src={employee?.avatarUrl?.trim() ? employee.avatarUrl : '/assets/default-avatar.png'}
            alt={fullName}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>{fullName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <>
          <Button
            className="hover:bg-gray-200"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            EMAIL
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </>
      );
    },
  },
  {
    accessorKey: 'designation',
    header: 'CHỨC VỤ',
    cell: ({ row }) => {
      const designation = row.original.designation;
      return <>{designation || '--/--'}</>;
    },
  },
  {
    accessorKey: 'type',
    header: 'NƠI LÀM VIỆC',
    cell: ({ row }) => {
      const employee = row.original.type as TypeWork;
      return <>{TYPEWORK_LABELS[employee] || '--/--'}</>;
    },
  },
  {
    accessorKey: 'departmentId',
    header: 'PHÒNG BAN',
    cell: ({ row }) => {
      const department = row.original.departmentId?.name;
      return <div>{department || '--/--'}</div>;
    },
  },
  {
    accessorKey: 'updatedAt',
    header: () => <div className="text-center">CẬP NHẬT LÚC</div>,
    cell: ({ row }) => {
      const updatedAt = row.original.updatedAt;
      return (
        <div className="text-center">{updatedAt ? format(new Date(updatedAt), 'dd/MM/yyyy HH:mm b', { locale: vi }) : ''}</div>
      );
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
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
