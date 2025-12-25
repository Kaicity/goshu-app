'use client';

import { useState } from 'react';
import { Briefcase, CalendarCheck, FolderKanban, Mail, PlaneTakeoff, User } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import ProfileTabs from '@/app/dashboard/profile/profile-tab/page';
import AttendanceTabs from '@/app/dashboard/profile/attendance-tab/page';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';
import type { EmployeeDto } from '@/models/dto/employeeDto';

interface ProfileMenuItemProps {
  employee: EmployeeDto | null;
}

const ProfileMenuItem = (props: ProfileMenuItemProps) => {
  const { employee } = props;
  const [selectedTab, setSelectedTab] = useState('profile');

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Menu */}
      <div className="flex flex-col gap-4 items-center">
        <Card className="w-full">
          <CardContent>
            <div className="flex space-x-4">
              {/* Profile Image */}
              <Image
                src={(employee?.avatarUrl as string) ?? '/assets/default-avatar.png'}
                alt="Brooklyn Simmons"
                width={100}
                height={100}
                className="rounded-full object-cover w-14 h-14"
              />
              {/* Info */}
              <div className="flex flex-col gap-1">
                <CardTitle className="text-lg">
                  {employee?.firstname || employee?.lastname
                    ? `${employee?.lastname ?? ''} ${employee?.firstname ?? ''}`.trim()
                    : 'Họ tên: --/--'}
                </CardTitle>
                <span className="text-xs text-muted-foreground"> {employee?.designation || '--/--'}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full space-y-3">
              <h2 className="text-lg font-semibold">Liên Hệ</h2>
              <div className="space-y-2">
                <div className="flex flex-col gap-2 items-start text-xs">
                  <h4 className="text-muted-foreground">Email</h4>
                  <span>{employee?.email}</span>
                </div>
                <div className="flex flex-col gap-2 items-start text-xs">
                  <h4 className="text-muted-foreground">Số điện thoại</h4>
                  <span>{employee?.phone}</span>
                </div>
                <div className="flex flex-col gap-2 items-start text-xs">
                  <h4 className="text-muted-foreground">Địa chỉ</h4>
                  <span>{employee?.address}</span>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
        <ToggleGroup
          type="single"
          value={selectedTab}
          onValueChange={(val) => {
            if (val && val !== selectedTab) {
              setSelectedTab(val);
            }
          }}
          className="flex flex-col items-start w-full h-60 border rounded-lg"
        >
          <ToggleGroupItem value="profile" aria-label="Profile" className="px-4 justify-start gap-2 w-full">
            <User className="!h-5 !w-5 " />
            <span>Thông tin cá nhân</span>
          </ToggleGroupItem>

          <ToggleGroupItem value="attendance" aria-label="Attendance" className="px-4 justify-start gap-2 w-full">
            <CalendarCheck className="!h-5 !w-5" />
            <span>Chấm công</span>
          </ToggleGroupItem>

          <ToggleGroupItem value="project" aria-label="Project" className="px-4 justify-start gap-2 w-full">
            <FolderKanban className="!h-5 !w-5" />
            <span>Dự án</span>
          </ToggleGroupItem>

          <ToggleGroupItem value="leave" aria-label="Leave" className="px-4 justify-start gap-2 w-full">
            <PlaneTakeoff className="!h-5 !w-5" />
            <span>Đơn nghỉ phép</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Content */}
      <div className="flex-1">
        {selectedTab === 'profile' && <ProfileTabs />}
        {selectedTab === 'attendance' && <AttendanceTabs />}
        {selectedTab === 'project' && <div>Project Content</div>}
        {selectedTab === 'leave' && <div>Leave Content</div>}
      </div>
    </div>
  );
};

export default ProfileMenuItem;
