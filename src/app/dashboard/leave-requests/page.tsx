'use client';
import { approvedByLeaveRequest, deleteLeaveRequest, getLeaveRequests } from '@/api/leaverequest/leaverequest';
import ProtectPage from '@/components/auth/ProtectPage';
import { DataTable } from '@/components/DataTable';
import { HeaderTitle } from '@/components/HeaderTitle';
import { MultiSelect } from '@/components/MultiSelect';
import StatusCard from '@/components/StatusCard';
import { Input } from '@/components/ui/input';
import { LeaveRequest, LEAVEREQUEST_LABELS } from '@/enums/leaveRequestEnum';
import { UserRole } from '@/enums/userRolesEnum';
import { LeaveRequestDto } from '@/models/dto/leaverequestDto';
import { CalendarIcon, RotateCcwIcon, Search, TimerIcon, XIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { columns } from './columns';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';

const LeaveRequestPage = () => {
  const { userAccount } = useApp();

  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get('search') || '');

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequestDto[]>([]);

  const [page, setPage] = useState<number>(searchParams.get('page') ? Number(searchParams.get('page')) : 1);
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(searchParams.get('limit') ? Number(searchParams.get('limit')) : 10);
  const [loading, setLoading] = useState(true);

  const [statusSelected, setStatusSelected] = useState<string[]>((searchParams.get('status') ?? '').split(',').filter(Boolean));
  const router = useRouter();

  const approvedCount = leaveRequests.filter((request) => request.leaveRequest.status === 'APPROVED').length;
  const rejectedCount = leaveRequests.filter((request) => request.leaveRequest.status === 'REJECTED').length;
  const pendingCount = leaveRequests.filter((request) => request.leaveRequest.status === 'PENDING').length;

  useEffect(() => {
    fetchLeaveRequests();
    updateSearchParams();
  }, [page, limit, search, statusSelected]);

  const fetchLeaveRequests = async () => {
    setLoading(true);
    try {
      const res = await getLeaveRequests(page, limit, { search, status: statusSelected });
      setTotal(res.pagination.total);
      setLimit(res.pagination.limit);
      setLeaveRequests(res.leaveRequest);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (leaveRequest: LeaveRequestDto) => {
    try {
      const res = await deleteLeaveRequest(leaveRequest.leaveRequest.id);
      if (res) {
        toast.success('Xoá yêu cầu nghỉ phép thành công');
        fetchLeaveRequests();
      }
    } catch (error: any) {
      toast.error('Xóa yêu cầu nghỉ phép thất bại', {
        description: error.message,
      });
    }
  };

  const handleApprove = async (leaveRequest: LeaveRequestDto) => {
    try {
      const updatedRequest = {
        ...leaveRequest.leaveRequest,
        approvedBy: userAccount?.employeeId,
        status: LeaveRequest.APPROVED,
      };
      const res = await approvedByLeaveRequest(leaveRequest.leaveRequest.id, updatedRequest);
      if (res) {
        toast.success('Phê duyệt yêu cầu nghỉ phép thành công');
        fetchLeaveRequests();
      }
    } catch (error: any) {
      toast.error('Phê duyệt yêu cầu nghỉ phép thất bại', {
        description: error.message,
      });
    }
  };

  const handleReject = async (leaveRequest: LeaveRequestDto) => {
    try {
      const updatedRequest = {
        ...leaveRequest.leaveRequest,
        approvedBy: userAccount?.employeeId,
        status: LeaveRequest.REJECTED,
      };
      const res = await approvedByLeaveRequest(leaveRequest.leaveRequest.id, updatedRequest);
      if (res) {
        toast.success('Phê duyệt yêu cầu nghỉ phép thành công');
        fetchLeaveRequests();
      }
    } catch (error: any) {
      toast.error('Phê duyệt yêu cầu nghỉ phép thất bại', {
        description: error.message,
      });
    }
  };

  const updateSearchParams = () => {
    const params = new URLSearchParams();
    if (page) params.set('page', String(page));
    if (limit) params.set('limit', String(limit));
    if (search) params.set('search', String(search));
    if (statusSelected) params.set('status', statusSelected.join(','));
    router.push(`/dashboard/leave-requests?${params.toString()}`);
  };

  return (
    <div className="space-y-5">
      <HeaderTitle text="Quản Lý Yêu Cầu Nghỉ Phép" subText="Quản lý yêu cầu nghỉ phép của nhân viên" />
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 space-x-3">
        <StatusCard value={pendingCount} icon={<CalendarIcon className="w-8 h-8" />} description="Yêu cầu nghỉ" color="yellow" />
        <StatusCard value={approvedCount} icon={<TimerIcon className="w-8 h-8" />} description="Yêu cầu đã duyệt" color="green" />
        <StatusCard value={rejectedCount} icon={<XIcon className="w-8 h-8" />} description="Yêu cầu đã từ chối" color="red" />
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-6 mt-2">
        <div className="hidden md:block relative max-w-sm sm:w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Tìm kiếm theo họ tên nhân viên hoặc mã nhân viên..."
            className="max-w-sm sm:w-full pl-10"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <MultiSelect
          options={Object.entries(LeaveRequest).map(([__, value]) => ({
            label: LEAVEREQUEST_LABELS[value],
            value,
          }))}
          value={statusSelected}
          onValueChange={(values) => {
            setStatusSelected(values);
            setPage(1);
          }}
          placeholder="Chọn trạng thái"
          className="relative justify-start px-4 w-full md:w-auto"
        />
        <Button onClick={fetchLeaveRequests}>
          <RotateCcwIcon className="w-6 h-6" />
          Làm mới
        </Button>
      </div>

      <DataTable
        columns={columns(handleDelete, handleApprove, handleReject)}
        data={leaveRequests}
        total={total}
        page={page}
        limit={limit}
        onPaginationChange={(nextPage, nextLimit) => {
          setPage(nextPage);
          setLimit(nextLimit);
        }}
        loading={loading}
      />
    </div>
  );
};

export default ProtectPage(LeaveRequestPage, { allowedRoles: [UserRole.ADMIN, UserRole.HR] });
