'use client';
import ProtectPage from '@/components/auth/ProtectPage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserRole } from '@/enums/userRolesEnum';
import { RotateCcwIcon, UsersRound } from 'lucide-react';

const DepartmentsPage = () => {
  return (
    <div className="">
      <div className="mb-5 py-2 rounded-md">
        <h1 className="font-semibold drop-shadow-md text-2xl">PHÒNG BAN</h1>
      </div>
      <div className="flex flex-wrap items-center gap-1 mb-6 *:mt-2">
        <Input placeholder="Tìm kiếm phòng ban..." className="max-w-sm sm:w-full" />
        <Button variant="outline">
          <RotateCcwIcon className="w-6 h-6" />
        </Button>
        <Button className="w-full md:w-[100px] ml-auto">
          <UsersRound className="w-4 h-4 mr-2" />
          Tạo
        </Button>
      </div>
    </div>
  );
};
export default ProtectPage(DepartmentsPage, { allowedRoles: [UserRole.ADMIN, UserRole.HR] });
