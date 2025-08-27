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

const LeaveRequestPage = () => {
  const [leaverequests, setLeaveRequests] = useState<LeaveRequestDto[]>([]);
  const { userAccount } = useApp();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [employeeId, setEmployeeId] = useState<string>(userAccount?.employeeId as string);

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
      tui nè
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
