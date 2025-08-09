'use client';
import { getDepartments } from '@/api/users/department';
import ProtectPage from '@/components/auth/ProtectPage';
import { DataTable } from '@/components/data-table';
import { HeaderTitle } from '@/components/HeaderTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserRole } from '@/enums/userRolesEnum';
import { DepartmentPaginationDto, DepartmentDto } from '@/models/dto/departmentDto';
import { RotateCcwIcon, UsersRound } from 'lucide-react';
import { set } from 'nprogress';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { columns } from './column';
import { AddDepartmentDialog } from './AddDepartmentDialog';

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState<DepartmentDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [department, setDepartment] = useState<DepartmentDto | null>(null);

  useEffect(() => {
    fetchDepartments();
  }, [page, limit]);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const res = await getDepartments(page, limit);
      console.log(res);
      setDepartments(res.departments);
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

  return (
    <div className="">
      <HeaderTitle text="PHÒNG BAN" subText="Quản lý các phòng ban trong công ty" />
      <div className="flex flex-wrap items-center gap-1 mb-6 *:mt-2">
        <Input placeholder="Tìm kiếm phòng ban..." className="max-w-sm sm:w-full" />
        <Button variant="outline">
          <RotateCcwIcon className="w-6 h-6" />
        </Button>
        <Button
          className="w-full md:w-[100px] ml-auto"
          onClick={() => {
            setOpen(true);
            setDepartment(null);
          }}
        >
          <UsersRound className="w-4 h-4 mr-2" />
          Tạo
        </Button>
        <AddDepartmentDialog open={open} setOpen={setOpen} department={department ? department : null} reloadData={fetchDepartments} />
      </div>
      <DataTable
        data={departments}
        columns={columns}
        page={page}
        limit={limit}
        total={total}
        onPaginationChange={handlePaginationChange}
        loading={loading}
      />
    </div>
  );
};
export default ProtectPage(DepartmentsPage, { allowedRoles: [UserRole.ADMIN, UserRole.HR] });
