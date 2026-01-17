'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { PAYROLL_LABELS, PAYROLL_STYLES, type Payroll } from '@/enums/payrollEnum';
import { cn } from '@/lib/utils';
import { PayrollDto } from '@/models/dto/payrollDto';
import { formatVND } from '@/utils/formatMoneyVnd';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { ArrowUpDown, Edit, MoreHorizontal } from 'lucide-react';

export const columns = (handleUpdate: (payroll: PayrollDto) => void): ColumnDef<PayrollDto>[] => [
  {
    id: 'fullname',
    accessorFn: (row) => `${row.employee.lastname || ''} ${row.employee.firstname || ''}`.trim(),
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
      const fullName = `${employee.employee.lastname ?? ''} ${employee.employee.lastname ?? ''}`.trim() || '--/--';
      return (
        <div className="flex items-center gap-3 min-w-[200px] flex-grow">
          <img
            src={employee?.employee.avatarUrl?.trim() ? employee.employee.avatarUrl : '/assets/default-avatar.png'}
            alt={fullName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span>{fullName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'payrollCode',
    header: 'MÃ LƯƠNG',
    cell: ({ row }) => {
      return <div>{row.original.payroll.payrollCode}</div>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: () => <div className="text-center">NGÀY TẠO</div>,
    cell: ({ row }) => {
      const updatedAt = row.original.createdAt;
      return (
        <div className="text-center">{updatedAt ? format(new Date(updatedAt), 'dd/MM/yyyy HH:mm a ', { locale: vi }) : ''}</div>
      );
    },
  },
  {
    accessorKey: 'designation',
    header: 'VỊ TRÍ',
    cell: ({ row }) => {
      const designation = row.original.employee.designation;
      return <>{designation || '--/--'}</>;
    },
  },
  {
    accessorKey: 'allowance',
    header: 'TRỢ CẤP',
    cell: ({ row }) => {
      const allowance = row.original.payroll.allowance;
      return <div>{formatVND(allowance) || '--/--'}</div>;
    },
  },
  {
    accessorKey: 'netSalary',
    header: 'TỔNG LƯƠNG',
    cell: ({ row }) => {
      const total = row.original.payroll.netSalary;
      return <div className="font-medium">{formatVND(total) || '--/--'}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: 'TRẠNG THÁI',
    cell: ({ row }) => {
      const status = row.original.payroll.status as Payroll;
      return <div className={`${PAYROLL_STYLES[status]} px-2 py-1 w-max`}>{PAYROLL_LABELS[status]}</div>;
    },
  },
  {
    accessorKey: 'actions',
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
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
