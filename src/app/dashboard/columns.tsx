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
import { EMPLOYEE_STATUS_COLOR, EMPLOYEE_STATUS_LABELS, type EmployeeStatus } from '@/enums/employeeEnum';

export const columns: ColumnDef<EmployeeDto>[] = [
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
            NHÂN VIÊN
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
            className="w-10 h-10 rounded-full object-cover"
          />
          <span>{fullName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'designation',
    header: 'VỊ TRÍ',
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
    accessorKey: 'status',
    header: 'TRẠNG THÁI',
    cell: ({ row }) => {
      const status = row.original.status as EmployeeStatus;
      return <div className={EMPLOYEE_STATUS_COLOR[status]}>{EMPLOYEE_STATUS_LABELS[status] || '--/--'}</div>;
    },
  },
];
