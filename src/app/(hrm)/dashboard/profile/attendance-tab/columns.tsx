'use client';
import { ATTENDANCE_COLOR, ATTENDANCE_LABELS, AttendanceStatus } from '@/enums/attendanceEnum';
import { formatUTC } from '@/helpers/date.helper';
import { AttendanceDto } from '@/models/dto/attendanceDto';
import { ColumnDef } from '@tanstack/react-table';
export const columns = (): ColumnDef<AttendanceDto>[] => [
  {
    accessorKey: 'date',
    header: () => <div className="">NGÀY</div>,
    cell: ({ row }) => {
      const date = row.original.attendance.date;
      return <div>{date ? formatUTC(new Date(date), 'dd/MM/yyyy') : '--/--'}</div>;
    },
  },
  {
    accessorKey: 'checkIn',
    header: () => <div className="">CHECK IN</div>,
    cell: ({ row }) => {
      const checkIn = row.original.attendance.checkIn;
      return <div>{checkIn ? formatUTC(new Date(checkIn), 'hh:mm a') : '--/--'}</div>;
    },
  },
  {
    accessorKey: 'checkOut',
    header: () => <div className="">CHECK OUT</div>,
    cell: ({ row }) => {
      const checkOut = row.original.attendance.checkOut;
      return <div>{checkOut ? formatUTC(new Date(checkOut), 'HH:mm a') : '--/--'}</div>;
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
