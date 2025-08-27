import { ColumnDef } from '@tanstack/react-table';
import { LeaveRequestDto } from '@/models/dto/leaverequestDto';
import { format } from 'date-fns';
import { LeaveRequest, LEAVEREQUEST_LABELS, LEAVEREQUEST_STYLES } from '@/enums/leaveRequestEnum';

export const columns = (): ColumnDef<LeaveRequestDto>[] => [
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) => {
      const startDate = row.original.leaveRequest.startDate;
      return startDate ? format(new Date(startDate), 'dd/MM/yyyy HH:mm:ss') : '--/--';
    },
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ row }) => {
      const endDate = row.original.leaveRequest.endDate;
      return endDate ? format(new Date(endDate), 'dd/MM/yyyy HH:mm:ss') : '--/--';
    },
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
    cell: ({ row }) => {
      const reason = row.original.leaveRequest.reason;
      return <div>{reason}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.leaveRequest.status as LeaveRequest;
      return <div className={`${LEAVEREQUEST_STYLES[status]}`}>{LEAVEREQUEST_LABELS[status]} </div>;
    },
  },
  {
    accessorKey: 'approvedBy',
    header: 'Approved By',
    cell: () => <div>--</div>, // tạm placeholder
  },
  {
    accessorKey: 'note',
    header: 'Note',
    cell: ({ row }) => {
      const note = row.original.leaveRequest.note;
      return <div>{note}</div>;
    },
  },
];
