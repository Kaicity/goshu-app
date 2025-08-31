'use client';
import ProtectPage from '@/components/auth/ProtectPage';
import { DataTable } from '@/components/DataTable';
import { HeaderTitle } from '@/components/HeaderTitle';
import { UserRole } from '@/enums/userRolesEnum';
import React, { useEffect, useState } from 'react';
import { columns } from './columns';
import { useSearchParams } from 'next/navigation';
import { LeaveRequestDto } from '@/models/dto/leaverequestDto';
import { toast } from 'sonner';
import { getLeaveRequests } from '@/api/leaverequest/leaverequest';
import { set } from 'nprogress';
import { useApp } from '@/contexts/AppContext';

const LeaveRequestPage = () => {
  const searchParams = useSearchParams();

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequestDto[]>([]);

  const [page, setPage] = useState<number>(searchParams.get('page') ? Number(searchParams.get('page')) : 1);
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(searchParams.get('limit') ? Number(searchParams.get('limit')) : 10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaveRequests();
  }, [page, limit]);

  const fetchLeaveRequests = async () => {
    setLoading(true);
    try {
      const res = await getLeaveRequests(page, limit,{});
      console.log('hello', res.leaveRequest);
      setTotal(res.pagination.total);
      setLimit(res.pagination.limit);
      setLeaveRequests(res.leaveRequest);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <HeaderTitle text="Quản Lý Tài Khoản" subText="Quản lý tài khoản người dùng truy cập" />
      <DataTable
        columns={columns()}
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
