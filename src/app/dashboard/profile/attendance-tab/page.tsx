import ProtectPage from '@/components/auth/ProtectPage';
import { DataTable } from '@/components/DataTable';
import { UserRole } from '@/enums/userRolesEnum';
import React, { useEffect, useState } from 'react';
import { columns } from './columns';
import { AttendanceDto } from '@/models/dto/attendanceDto';
import { toast } from 'sonner';
import { getAttendances } from '@/api/attendance/attendance';
import { useApp } from '@/contexts/AppContext';

const AttendanceTabsPage = () => {
  const { userAccount } = useApp();

  const [attendances, setAttendances] = useState<AttendanceDto[]>([]); // Replace with actual data
  const [employeeId, setEmployeeId] = useState<string>(userAccount?.employeeId as string);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    fetchAttendances();
  }, [1, 10, employeeId]);

  const fetchAttendances = async () => {
    setLoading(true);
    try {
      const res = await getAttendances(1, 10, employeeId);
      console.log(res);
      setAttendances(res.attendances);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <DataTable
        columns={columns()}
        data={attendances}
        loading={loading}
        page={1}
        limit={10}
        total={0}
        showPagination={false}
      />
    </div>
  );
};

export default ProtectPage(AttendanceTabsPage, { allowedRoles: [UserRole.ADMIN, UserRole.HR, UserRole.EMPLOYEE] });
