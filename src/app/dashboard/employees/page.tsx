'use client';

import { getEmployees } from '@/api/employee/employee';
import ProtectPage from '@/components/auth/ProtectPage';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserRole } from '@/enums/userRolesEnum';
import { EmployeeDto } from '@/models/dto/employeeDto';
import { FileSpreadsheet, RotateCcwIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { columns } from './columns';

const EmployeesPage = () => {
  const [employees, setEmployees] = useState<EmployeeDto[]>([]);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  useEffect(() => {
    fetchEmployees();
  }, [page, limit]);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await getEmployees(page, limit);
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

  return (
    <>
      <div className="mb-5 py-2 rounded-md">
        <h1 className="font-semibold drop-shadow-md text-2xl">NHÂN VIÊN</h1>
      </div>
      <div className="flex flex-wrap items-center gap-1 mb-6 *:mt-2">
        <Input placeholder="Tìm kiếm nhân viên..." className="max-w-sm sm:w-full" />
        <Button variant="outline">
          <RotateCcwIcon className="w-6 h-6" />
        </Button>
        <Button
          onClick={() => {}}
          className="w-full md:w-[130px] ml-auto bg-green-600 hover:bg-green-700 text-white font-medium shadow-sm transition-all duration-200"
        >
          <FileSpreadsheet className="w-5 h-5 mr-2" />
          Xuất Excel
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
    </>
  );
};

export default ProtectPage(EmployeesPage, { allowedRoles: [UserRole.ADMIN, UserRole.HR] });
