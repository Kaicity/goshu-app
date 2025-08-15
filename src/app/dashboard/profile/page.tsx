'use client';

import { getEmployee } from '@/api/employee/employee';
import { HeaderTitle } from '@/components/HeaderTitle';
import ProfileMenuItem from '@/components/ProfileMenuItem';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useApp } from '@/contexts/AppContext';
import type { EmployeeDto } from '@/models/dto/employeeDto';
import { Bold, Briefcase, Italic, Mail, Pencil, Underline } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
  const { userAccount } = useApp();

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
      <Card>
        <div className="px-6 py-0">
          <div className="flex md:flex-row md:items-end md:justify-between">
            <div className="flex items-start space-x-4">
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
            <Button className="w-max">
              <Pencil className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>

          <Separator className="my-6" />

          <div className="">
            <div className="flex justify-between items-start gap-6">
              <div className="w-1/3 ">
                <ProfileMenuItem />
              </div>

              <div className="bg-amber-800 w-full h-60">
                <h5 className="text-xl text-center mt-20 text-blue-600 font-bold">
                  UI TRANG NÀY DỄ LẮM CHỈ GÁN DATA LÊN THÔI À :vvvvvv
                </h5>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ProfilePage;
