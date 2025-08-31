import { ColumnDef } from '@tanstack/react-table';
import { LeaveRequestDto } from '@/models/dto/leaverequestDto';
import { format } from 'date-fns';
import { LeaveRequest, LEAVEREQUEST_LABELS, LEAVEREQUEST_STYLES } from '@/enums/leaveRequestEnum';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

export const columns = (): ColumnDef<LeaveRequestDto>[] => [
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
            HỌ VÀ TÊN
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const leaveRequest = row.original;
      const fullName = `${leaveRequest.employee.lastname ?? ''} ${leaveRequest.employee.firstname ?? ''}`.trim() || '--/--';
      return (
        <div className="flex items-center gap-3 min-w-[200px] flex-grow">
          <img
            src={leaveRequest.employee?.avatarUrl?.trim() ? leaveRequest.employee.avatarUrl : '/assets/default-avatar.png'}
            alt={fullName}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>{fullName}</span>
        </div>
      );
    },
  },
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
