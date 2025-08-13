'use client';

import { getEmployees } from '@/api/employee/employee';
import ProtectPage from '@/components/auth/ProtectPage';

import { UserRole } from '@/enums/userRolesEnum';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/DataTable';
import { columns } from './columns';

import { EmployeeDto } from '@/models/dto/employeeDto';
import { FileSpreadsheet, RotateCcwIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { HeaderTitle } from '@/components/HeaderTitle';
import { FilterDialog } from './FilterDiaglog';

const EmployeesPage = () => {
  //search
  const searchParams = useSearchParams();
  const [employees, setEmployees] = useState<EmployeeDto[]>([]);
  const [search, setSearch] = useState<string>(searchParams.get('search') || '');
  const [employee, setEmployee] = useState<EmployeeDto | null>(null);

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const [page, setPage] = useState<number>(searchParams.get('page') ? Number(searchParams.get('page')) : 1);
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(searchParams.get('limit') ? Number(searchParams.get('limit')) : 10);

  useEffect(() => {
    updateSearchParams();
    fetchEmployees();
    console.log('Table data:', employees);
  }, [page, limit, search]);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await getEmployees(page, limit, { search });
      console.log('res',res);
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

  const resetFilters = () => {
    setSearch('');
    setPage(1);
    setLimit(10);

    router.push('/dashboard/employees');
  };

  const updateSearchParams = () => {
    const params = new URLSearchParams();
    if (page) params.set('page', String(page));
    if (limit) params.set('limit', String(limit));
    if (search) params.set('search', String(search));

    router.push(`/dashboard/employees?${params.toString()}`);
  };

  return (
    <>
      <HeaderTitle text="NHÂN VIÊN" subText="Quản lý nhân viên trong công ty" />
      <div className="flex flex-wrap items-center gap-1 mb-6 *:mt-2">
        <Input
          placeholder="Tìm kiếm nhân viên..."
          className="max-w-sm sm:w-full"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <Button variant="outline" onClick={resetFilters}>
          <RotateCcwIcon className="w-6 h-6" />
        </Button>
        <Button
          onClick={() => {}}
          className="w-full md:w-[130px] ml-auto bg-green-600 hover:bg-green-700 text-white font-medium shadow-sm transition-all duration-200"
        >
          <FileSpreadsheet className="w-5 h-5 mr-2" />
          Xuất Excel
        </Button>

        <Button onClick = {() => {setOpen(true);}}>Sắp Xếp</Button>
          <FilterDialog open={open} setOpen={setOpen}  />

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
