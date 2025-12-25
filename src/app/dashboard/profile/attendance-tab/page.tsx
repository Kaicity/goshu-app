import { getAttendances } from '@/api/attendance/attendance';
import ProtectPage from '@/components/auth/ProtectPage';
import { DataTable } from '@/components/DataTable';
import { useApp } from '@/contexts/AppContext';
import { UserRole } from '@/enums/userRolesEnum';
import { AttendanceDto } from '@/models/dto/attendanceDto';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { columns } from './columns';

const AttendanceTabsPage = () => {
  const { userAccount } = useApp();

  const [attendances, setAttendances] = useState<AttendanceDto[]>([]); // Replace with actual data
  const [employeeId, setEmployeeId] = useState<string>(userAccount?.employeeId as string);
  const [loading, setLoading] = useState(true);
  const [sumWorkHour, setSumWorkHour] = useState(0);

  useEffect(() => {
    if (attendances.length > 0) {
      setSumWorkHour(attendances.reduce((sum, item) => sum + (item.attendance.workingHour ?? 0), 0));
    }
  }, [attendances]);

  useEffect(() => {
    fetchAttendances();
  }, [1, 10, employeeId]);

  const fetchAttendances = async () => {
    setLoading(true);
    try {
      const res = await getAttendances(1, 31, { employeeId });
      setAttendances(res.attendances);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataTable
      columns={columns()}
      data={attendances}
      loading={loading}
      page={1}
      limit={10}
      total={0}
      showPagination={false}
      showFooter={true}
      totalValueFooter={sumWorkHour}
      titleFooter="/Giờ"
    />
  );
};

export default ProtectPage(AttendanceTabsPage, { allowedRoles: [UserRole.ADMIN, UserRole.HR, UserRole.EMPLOYEE] });
