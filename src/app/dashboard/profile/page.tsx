'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ProfileTabs from './ProfileTabs';
import { HeaderTitle } from '@/components/HeaderTitle';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { getEmployee } from '@/api/employee/employee';
import { useEffect, useState } from 'react';
import { EmployeeDto } from '@/models/dto/employeeDto';
import { useRouter } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';
import { Briefcase, Mail, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProfileMenuItem from '@/components/ProfileMenuItem';
import { UserRole } from '@/enums/userRolesEnum';
import ProtectPage from '@/components/auth/ProtectPage';
const ProfilePage = () => {
  const { userAccount } = useApp();
  const router = useRouter();

  const [employee, setEmployee] = useState<EmployeeDto | null>(null);
  useEffect(() => {
    const fetchEmployeeDetail = async () => {
      if (userAccount) {
        const res = await getEmployee(userAccount.employeeId as string);
        console.log('res', res);
        console.log('resss', userAccount?.employeeId);
        setEmployee(res);
      }
    };

    fetchEmployeeDetail();
  }, [userAccount]);

  return (
    <>
      <HeaderTitle text="Thông tin nhân viên" subText="Thông tin chi tiết của nhân viên" />
      <Card>
        <div className="px-6 py-0 ">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {/* Left Content */}
            <div className="flex md:flex-row md:items-start space-x-4">
              {/* Profile Image */}
              <Image
                src={(employee?.avatarUrl as string) ?? '/assets/default-avatar.png'}
                alt="Brooklyn Simmons"
                width={100}
                height={100}
                className="rounded-md object-cover w-24 h-24"
              />

              {/* Info */}
              <div className="space-y-2">
                <CardTitle className="text-xl">
                  {employee?.firstname || employee?.lastname
                    ? `${employee?.lastname ?? ''} ${employee?.firstname ?? ''}`.trim()
                    : '--/--'}
                </CardTitle>

                <CardDescription className="flex items-center text-sm mt-1">
                  <Briefcase className="w-4 h-4 mr-2" />
                  {employee?.designation ?? '--/--'}
                </CardDescription>
                <CardDescription className="flex items-center text-sm mt-1">
                  <Mail className="w-4 h-4 mr-2" />
                  {employee?.internalEmail ?? '--/--'}
                </CardDescription>
              </div>
            </div>

            {/* Edit Button */}
            <Button
              className="w-full md:w-auto lg:w-auto"
              onClick={() => {
                router.push(`/dashboard/employees/info-update/${userAccount?.employeeId}`);
              }}
            >
              <Pencil className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
          
            {/* Profile Menu */}
           
              <div className="mt-2">
                <ProfileMenuItem />
              </div>
            
            {/* Tabs */}

         
        </div>
      </Card>
    </>
  );
}
export default ProtectPage(ProfilePage, { allowedRoles: [UserRole.ADMIN, UserRole.HR, UserRole.EMPLOYEE] });