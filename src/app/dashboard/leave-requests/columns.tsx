import { ColumnDef } from '@tanstack/react-table';
import { LeaveRequestDto } from '@/models/dto/leaverequestDto';
import { format } from 'date-fns';
import { LeaveRequest, LEAVEREQUEST_LABELS, LEAVEREQUEST_STYLES } from '@/enums/leaveRequestEnum';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export const columns = (
  handleDelete: (leaveRequest: LeaveRequestDto) => void,
  handleApprove: (leaveRequest: LeaveRequestDto) => void,
): ColumnDef<LeaveRequestDto>[] => [
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
    id: 'dates',
    header: 'Dates',
    cell: ({ row }) => {
      const startDateObj = row.original.leaveRequest.startDate ? new Date(row.original.leaveRequest.startDate) : null;
      const endDateObj = row.original.leaveRequest.endDate ? new Date(row.original.leaveRequest.endDate) : null;

      const startDate = row.original.leaveRequest.startDate
        ? format(new Date(row.original.leaveRequest.startDate), 'dd/MM/yyyy')
        : '--/--';
      const endDate = row.original.leaveRequest.endDate
        ? format(new Date(row.original.leaveRequest.endDate), 'dd/MM/yyyy')
        : '--/--';
      const dates = `${startDate} - ${endDate}`;
      const days =
        startDateObj && endDateObj ? Math.round((endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24)) + 1 : 0;
      return (
        <div className="">
          {dates ? dates : '--/--'}
          <div className="text-muted-foreground">{days ? `${days} days` : '--/--'}</div>
        </div>
      );
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
              <DropdownMenuItem onClick={() =>handleApprove(resource)}>
                <Edit className="w-4 h-4 mr-2" />
                Chấp nhận
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
