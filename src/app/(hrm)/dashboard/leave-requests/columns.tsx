import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { LeaveRequest, LEAVEREQUEST_LABELS, LEAVEREQUEST_STYLES } from '@/enums/leaveRequestEnum';
import { LeaveRequestDto } from '@/models/dto/leaverequestDto';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDown, CheckCircle, MoreHorizontal, Trash } from 'lucide-react';

export const columns = (
  handleDelete: (leaveRequest: LeaveRequestDto) => void,
  handleApprove: (leaveRequest: LeaveRequestDto) => void,
  handleReject: (leaveRequest: LeaveRequestDto) => void,
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
            NHÂN VIÊN
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const leaveRequest = row.original;
      const fullName = `${leaveRequest.employee.lastname ?? ''} ${leaveRequest.employee.firstname ?? ''}`.trim() || '--/--';
      const employeeCode = leaveRequest.employee.employeeCode;
      return (
        <div className="flex items-center gap-3 min-w-[200px] flex-grow">
          <img
            src={leaveRequest.employee?.avatarUrl?.trim() ? leaveRequest.employee.avatarUrl : '/assets/default-avatar.png'}
            alt={fullName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h3 className="font-bold">{employeeCode}</h3>
            <h3>{fullName}</h3>
          </div>
        </div>
      );
    },
  },
  {
    id: 'dates',
    header: 'NGÀY PHÉP',
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
        <>
          {dates ? dates : '--/--'}
          <div className="text-muted-foreground">{days ? `${days} ngày` : '--/--'}</div>
        </>
      );
    },
  },
  {
    accessorKey: 'reason',
    header: 'LÝ DO',
    cell: ({ row }) => {
      const reason = row.original.leaveRequest.reason;

      if (!reason) return <span>—</span>;

      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="max-w-[220px] truncate cursor-pointer">{reason}</div>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">{reason}</TooltipContent>
        </Tooltip>
      );
    },
  },

  {
    accessorKey: 'status',
    header: 'TRẠNG THÁI',
    cell: ({ row }) => {
      const status = row.original.leaveRequest.status as LeaveRequest;
      return (
        <div className={`${LEAVEREQUEST_STYLES[status]} px-2 py-1 w-max`}>
          {LEAVEREQUEST_LABELS[status] ?? <div className="text-sm animate-pulse text-blue-500 font-medium italic">Đang chờ</div>}
        </div>
      );
    },
  },
  {
    accessorKey: 'note',
    header: 'GHI CHÚ',
    cell: ({ row }) => {
      const note = row.original.leaveRequest.note;

      if (!note) return <span>—</span>;

      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="max-w-[280px] line-clamp-2 cursor-pointer text-muted-foreground">{note}</div>
          </TooltipTrigger>
          <TooltipContent className="max-w-sm">{note}</TooltipContent>
        </Tooltip>
      );
    },
  },

  {
    accessorKey: 'approvedBy',
    header: 'NGƯỜI DUYỆT ĐƠN',
    cell: ({ row }) => {
      let fullname = '--/--';
      const approvedBy = row.original.leaveRequest.approvedBy;
      const employeeCode = approvedBy?.employeeCode;
      const firstname = approvedBy?.firstname;
      const lastname = approvedBy?.lastname;
      if (firstname || lastname) fullname = lastname + ' ' + firstname;
      return (
        <div className="flex flex-col">
          <h3 className="font-bold text-custom-cyan">{employeeCode}</h3>
          <h3>{fullname}</h3>
        </div>
      );
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
              <DropdownMenuItem onClick={() => handleApprove(resource)} className="text-green-600 focus:text-green-400">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Chấp nhận
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleReject(resource)} className="text-orange-600 focus:text-orange-400">
                <CheckCircle className="w-4 h-4 text-orange-500" />
                Từ chối
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(resource)} className="text-red-600 focus:text-red-400">
                <Trash className="w-4 h-4 text-red-500" />
                Xoá
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
