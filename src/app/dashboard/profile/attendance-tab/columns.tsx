'use client';
import { ColumnDef } from '@tanstack/react-table';
import { AttendanceDto } from '@/models/dto/attendanceDto';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';
import { ATTENDANCE_COLOR, ATTENDANCE_LABELS, AttendanceStatus } from '@/enums/attendanceEnum';
export const columns = (): ColumnDef<AttendanceDto>[] => [
  {
    accessorKey: 'date',
    header: () => <div className="">NGÀY</div>,
    cell: ({ row }) => {
      const date = row.original.attendance.date;
      return <div>{date ? format(new Date(date), 'dd/MM/yyyy') : '--/--'}</div>;
    },
  },
  {
    accessorKey: 'checkIn',
    header: () => <div className="">CHECK IN</div>,
    cell: ({ row }) => {
      const checkIn = row.original.attendance.checkIn;
      return <div>{checkIn ? format(new Date(checkIn), 'HH:mm:ss') : '--/--'}</div>;
    },
  },
  {
    accessorKey: 'checkOut',
    header: () => <div className="">CHECK OUT</div>,
    cell: ({ row }) => {
      const checkOut = row.original.attendance.checkOut;
      return <div>{checkOut ? format(new Date(checkOut), 'HH:mm:ss') : '--/--'}</div>;
    },
  },
  {
    accessorKey: 'workinghours',
    header: 'Working Hours',
  },
  {
    accessorKey: 'updatedAt',
    header: () => <div className="">CẬP NHẬT LÚC</div>,
    cell: ({ row }) => {
      const updatedAt = row.original.updatedAt;
      return <div className="">{updatedAt ? format(new Date(updatedAt), 'dd/MM/yyyy HH:mm:ss') : '--/--'}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: () => <div>TRẠNG THÁI</div>,
    cell: ({row}) => {
        const status = row.original.attendance.status as AttendanceStatus;
        return <div className={`${ATTENDANCE_COLOR[status]}`}>{ATTENDANCE_LABELS[status]} </div>;

    }
  },
];
