'use client';
import { DataTable } from '@/components/DataTable';
import { useApp } from '@/contexts/AppContext';
import { LeaveRequestDto } from '@/models/dto/leaverequestDto';
import { useEffect, useState } from 'react';
import { columns } from './columns';
import { set } from 'nprogress';
import { getLeaveRequests } from '@/api/leaverequest/leaverequest';
import { toast } from 'sonner';
import { resolve } from 'node:dns';
import { HeaderTitle } from '@/components/HeaderTitle';
import StatusCard from '@/components/StatusCard';

const LeaveRequestPage = () => {
  const [leaverequests, setLeaveRequests] = useState<LeaveRequestDto[]>([]);
  const { userAccount } = useApp();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [employeeId, setEmployeeId] = useState<string>(userAccount?.employeeId as string);
  const approvedCount = leaverequests.filter(request => request.leaveRequest.status === "approved").length;
  const rejectedCount = leaverequests.filter(request => request.leaveRequest.status === "rejected").length;
  const pendingCount = leaverequests.filter(request => request.leaveRequest.status === "PENDING").length;
  useEffect(() => {
    if (userAccount?.employeeId) {
      setEmployeeId(userAccount.employeeId);
    }

    if (employeeId) {
      fetchLeaveRequest();
    }
  }, [page, limit, employeeId, userAccount]);

  const fetchLeaveRequest = async () => {
    setLoading(true);
    try {
      const res = await getLeaveRequests(page, limit, { employeeId });
      console.log('cuu tcccoi voi', res);
      console.log('cuu tcccoi voi', res.leaveRequest);
      setLeaveRequests(res.leaveRequest);
      setEmployeeId(userAccount?.employeeId as string);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePaginationChange = (newPage: number, newLimit: number) => {
    setPage(newPage);
    setLimit(newLimit);
  };

  return (
    <div>
      <HeaderTitle text="Thông tin lịch nghỉ của nhân viên" subText="Thông tin chi tiết về lịch nghỉ của nhân viên" />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-3 '><StatusCard
        value={pendingCount}
        unit="Yêu cầu"
        description="Số lượng yêu cầu nghỉ"
        color='yellow'
        buttonLabel="Duyệt tất cả"
        onButtonClick={() => console.log("Duyệt tất cả")}
      />
        <StatusCard
          value={approvedCount}
          unit="Yêu cầu"
          description="Số lượng yêu cầu đã duyệt"
          color='green'
        />
        <StatusCard
          value={rejectedCount}
          unit="Yêu cầu"
          description="Số lượng yêu cầu đã từ chối"
          color='red'
        />
      </div>
      <DataTable
        columns={columns()}
        data={leaverequests}
        page={page}
        limit={limit}
        total={total}
        onPaginationChange={handlePaginationChange}
        loading={loading}
      />
    </div>
  );
};

export default LeaveRequestPage;
