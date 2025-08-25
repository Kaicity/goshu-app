'use client';
import { Button } from '@/components/ui/button';
import { ATTENDANCE_COLOR, ATTENDANCE_LABELS, AttendanceStatus } from '@/enums/attendanceEnum';
import { TYPEWORK_LABELS, type TypeWork } from '@/enums/typeWorkEnum';
import { formatUTC } from '@/helpers/date.helper';
import { AttendanceDto } from '@/models/dto/attendanceDto';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

export const columns: ColumnDef<AttendanceDto>[] = [
  {
    id: 'fullname',
    accessorFn: (row) => `${row.employee.firstname || ''} ${row.employee.lastname || ''}`.trim(),
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
      const employee = row.original.employee;
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
    accessorKey: 'designation',
    header: 'CHỨC VỤ',
    cell: ({ row }) => {
      const designation = row.original.employee.designation;
      return <>{designation || '--/--'}</>;
    },
  },
  {
    accessorKey: 'type',
    header: 'NƠI LÀM VIỆC',
    cell: ({ row }) => {
      const employee = row.original.employee.type as TypeWork;
      return <>{TYPEWORK_LABELS[employee] || '--/--'}</>;
    },
  },
  // {
  //   accessorKey: 'date',
  //   header: () => <div className="">NGÀY</div>,
  //   cell: ({ row }) => {
  //     const date = row.original.attendance.date;
  //     return <div>{date ? formatUTC(new Date(date), 'dd/MM/yyyy') : '--/--'}</div>;
  //   },
  // },
  {
    accessorKey: 'checkIn',
    header: () => <div className="">CHECK IN</div>,
    cell: ({ row }) => {
      const checkIn = row.original.attendance.checkIn;
      return <div>{checkIn ? formatUTC(new Date(checkIn), 'hh:mm a') : '--/--'}</div>;
    },
  },
  {
    accessorKey: 'workingHour',
    header: 'SỐ GIỜ LÀM VIỆC',
    cell: ({ row }) => {
      const workingHour = row.original.attendance.workingHour;
      return <div>{workingHour !== undefined ? workingHour : '--/--'} Giờ</div>;
    },
  },
  {
    accessorKey: 'status',
    header: () => <div>TRẠNG THÁI</div>,
    cell: ({ row }) => {
      const status = row.original.attendance.status as AttendanceStatus;
      return <div className={`${ATTENDANCE_COLOR[status]}`}>{ATTENDANCE_LABELS[status]} </div>;
    },
  },
];
