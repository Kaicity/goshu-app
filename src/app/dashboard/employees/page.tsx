'use client';

import ProtectPage from '@/components/auth/ProtectPage';
import { UserRole } from '@/enums/userRolesEnum';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcwIcon, UsersRound } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import { useRouter } from 'next/navigation';
import { EmployeeDto } from '@/models/dto/employeeDto';
import { toast } from 'sonner';
import { getEmployees } from '@/api/users/employee';

const EmployeesPage = () => {
  const [employees, setEmployees] = useState<EmployeeDto[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  useEffect(() => {
    fetchUsers();
  }, [page, limit]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getEmployees(page, limit);
      console.log(res);
      setEmployees(res.employees);
      setTotal(res.pagination.total);
      setLimit(res.pagination.limit);
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

  const router = useRouter();
  const handleAddEmployee = () => {
    router.push('/dashboard/employees/add-employee');
  };

  return (
    <div className="">
      <div className="mb-5 py-2 rounded-md">
        <h1 className="font-semibold drop-shadow-md text-2xl">NHÂN VIÊN</h1>
      </div>
      <div className="flex flex-wrap items-center gap-1 mb-6 *:mt-2">
        <Input placeholder="Tìm kiếm nhân viên..." className="max-w-sm sm:w-full" />
        <Button variant="outline">
          <RotateCcwIcon className="w-6 h-6" />
        </Button>
        <Button className="w-full md:w-[100px] ml-auto" onClick={handleAddEmployee}>
          <UsersRound className="w-4 h-4 mr-2" />
          Tạo
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={employees}
        page={page}
        limit={limit}
        total={total}
        onPaginationChange={handlePaginationChange}
        loading={loading}
      />
    </div>
  );
};

export default ProtectPage(EmployeesPage, { allowedRoles: [UserRole.ADMIN, UserRole.HR] });
