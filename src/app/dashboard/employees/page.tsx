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

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [departmentSelected, setDepartmentSelected] = useState<string[]>([]);

  const [typeWorkSelected, setTypeWorkSelected] = useState<string[]>([]);

  const router = useRouter();

  const [page, setPage] = useState<number>(searchParams.get('page') ? Number(searchParams.get('page')) : 1);
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(searchParams.get('limit') ? Number(searchParams.get('limit')) : 10);

  useEffect(() => {
    updateSearchParams();
    fetchEmployees();
    console.log('Table data:', employees);
  }, [page, limit, search, departmentSelected, typeWorkSelected]);

  const fetchEmployees = async () => {
    setLoading(true);
    console.log('Fetching employees with filters:', departmentSelected);
    try {
      const res = await getEmployees(page, limit, { search, departments: departmentSelected, typeWorks: typeWorkSelected });
      console.log('res', res);
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
    setDepartmentSelected([]);
    setTypeWorkSelected([]);

    router.push('/dashboard/employees');
  };

  const updateSearchParams = () => {
    const params = new URLSearchParams();
    if (page) params.set('page', String(page));
    if (limit) params.set('limit', String(limit));
    if (search) params.set('search', String(search));
    if (departmentSelected) params.set('department', departmentSelected.join(','));
    if (typeWorkSelected) params.set('type', typeWorkSelected.join(','));

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

        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Sắp Xếp
        </Button>
        <FilterDialog
          open={open}
          setOpen={setOpen}
          // departmentSelected={departmentSelected}
          // typeWorkSelected={typeWorkSelected}
          // setDepartmentSelected={setDepartmentSelected}
          // setTypeWorkSelected={setTypeWorkSelected}
          onFilter={(newFilter) => {
            setDepartmentSelected(newFilter.departments);
            setTypeWorkSelected(newFilter.typeWorks);
          }}
        />
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
