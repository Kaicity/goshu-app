'use client';

import { getEmployee } from '@/api/employee/employee';
import ProtectPage from '@/components/auth/ProtectPage';
import { HeaderTitle } from '@/components/HeaderTitle';
import ProfileMenuItem from '@/components/ProfileMenuItem';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { UserRole } from '@/enums/userRolesEnum';
import { EmployeeDto } from '@/models/dto/employeeDto';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
const ProfilePage = () => {
  const { userAccount } = useApp();
  const router = useRouter();
  const [employee, setEmployee] = useState<EmployeeDto | null>(null);

  useEffect(() => {
    const fetchEmployeeDetail = async () => {
      if (userAccount) {
        const res = await getEmployee(userAccount.employeeId as string);
        setEmployee(res);
      }
    };
    fetchEmployeeDetail();
  }, [userAccount]);

  return (
    <>
      <HeaderTitle text="Thông tin nhân viên" subText="Thông tin chi tiết của nhân viên" />
      <div className="flex justify-end pb-4">
        <Button
          className="w-full md:w-auto"
          onClick={() => {
            router.push(`/dashboard/employees/info-update/${userAccount?.employeeId}`);
          }}
        >
          <Pencil className="w-4 h-4 mr-2" />
          Cập nhật thông tin
        </Button>
      </div>
      <Card className="px-6">
        <ProfileMenuItem employee={employee} />
      </Card>
    </>
  );
};
export default ProtectPage(ProfilePage, { allowedRoles: [UserRole.HR, UserRole.EMPLOYEE] });
