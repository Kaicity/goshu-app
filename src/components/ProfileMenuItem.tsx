'use client';

import { useState } from 'react';
import { CalendarCheck, FolderKanban, PlaneTakeoff, User } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import ProfileTabs from '@/app/dashboard/profile/ProfileTabs';

const ProfileMenuItem = () => {
  const [selectedTab, setSelectedTab] = useState('profile');

  return (
    <div className="flex gap-4 max-w-full">
      {/* Menu */}
      <ToggleGroup
        type="single"
        value={selectedTab}
        onValueChange={(val) => {
          if (val && val !== selectedTab) {
            setSelectedTab(val);
          }
        }}
        className="flex flex-col items-start w-12 md:w-auto h-60 border rounded-lg"
      >
        <ToggleGroupItem value="profile" aria-label="Profile" className="px-4 justify-start gap-2 w-full">
          <User className="!h-5 !w-5 " />
          <span className="hidden md:inline">Profile</span>
        </ToggleGroupItem>

        <ToggleGroupItem value="attendance" aria-label="Attendance" className="px-4 justify-start gap-2 w-full">
          <CalendarCheck className="!h-5 !w-5" />
          <span className="hidden md:inline">Attendance</span>
        </ToggleGroupItem>

        <ToggleGroupItem value="project" aria-label="Project" className="px-4 justify-start gap-2 w-full">
          <FolderKanban className="!h-5 !w-5" />
          <span className="hidden md:inline">Project</span>
        </ToggleGroupItem>

        <ToggleGroupItem value="leave" aria-label="Leave" className="px-4 justify-start gap-2 w-full">
          <PlaneTakeoff className="!h-5 !w-5" />
          <span className="hidden md:inline">Leave</span>
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Content */}
      <div className="flex-1">
        {selectedTab === 'profile' && <ProfileTabs />}
        {selectedTab === 'attendance' && <div>Attendance Content</div>}
        {selectedTab === 'project' && <div>Project Content</div>}
        {selectedTab === 'leave' && <div>Leave Content</div>}
      </div>
    </div>
  );
};

export default ProfileMenuItem;
