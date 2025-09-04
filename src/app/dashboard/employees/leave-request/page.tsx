'use client';
import { getLeaveRequests } from '@/api/leaverequest/leaverequest';
import { HeaderTitle } from '@/components/HeaderTitle';
import { LeaveCard } from '@/components/LeaveCard';
import StatusCard from '@/components/StatusCard';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { LeaveRequestDto } from '@/models/dto/leaverequestDto';
import { CalendarIcon, TimerIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { LeaveRequestDialog } from './LeaveRequestDialog';

const LeaveRequestPage = () => {
  const [leaverequests, setLeaveRequests] = useState<LeaveRequestDto[]>([]);
  const { userAccount } = useApp();
  const [loading, setLoading] = useState(true);
  const [employeeId, setEmployeeId] = useState<string>(userAccount?.employeeId as string);
  const approvedCount = leaverequests.filter((request) => request.leaveRequest.status === 'APPROVED').length;
  const rejectedCount = leaverequests.filter((request) => request.leaveRequest.status === 'REJECTED').length;
  const pendingCount = leaverequests.filter((request) => request.leaveRequest.status === 'PENDING').length;

  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    if (userAccount?.employeeId) {
      setEmployeeId(userAccount.employeeId);
    }

    if (employeeId) {
      fetchLeaveRequest();
    }
  }, [employeeId, userAccount]);

  const fetchLeaveRequest = async () => {
    setLoading(true);
    try {
      const res = await getLeaveRequests(1, 10, { employeeId });
      setLeaveRequests(res.leaveRequest);
      setEmployeeId(userAccount?.employeeId as string);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 space-x-3">
        <StatusCard
          value={pendingCount}
          icon={<CalendarIcon className="w-8 h-8" />}
          description="Số lượng yêu cầu nghỉ"
          color="yellow"
        />
        <StatusCard
          value={approvedCount}
          icon={<TimerIcon className="w-8 h-8" />}
          description="Số lượng yêu cầu đã duyệt"
          color="green"
        />
        <StatusCard
          value={rejectedCount}
          icon={<XIcon className="w-8 h-8" />}
          description="Số lượng yêu cầu đã từ chối"
          color="red"
        />
      </div>
      <div className="border rounded-md">
        <div className="p-3">
          <div className="flex items-center justify-between">
            <HeaderTitle text="Thông tin lịch nghỉ của nhân viên" subText="Thông tin chi tiết về lịch nghỉ của nhân viên" />
            <Button onClick={() => setOpen(true)}>Tạo đơn nghỉ phép</Button>
          </div> 
          <LeaveRequestDialog open={open} setOpen={setOpen} reloadData={fetchLeaveRequest} leaveRequest={null} />

          <LeaveCard data={leaverequests} />
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestPage;
