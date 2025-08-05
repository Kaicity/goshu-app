'use client';

import ProtectPage from '@/components/auth/ProtectPage';

import { deleteAccountUser, getUsers } from '@/api/users/user';
import { AddUserDialog } from '@/app/dashboard/users/AddUserDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Status, STATUS_LABELS } from '@/enums/statusEnum';
import { ROLE_LABELS, UserRole } from '@/enums/userRolesEnum';
import { RotateCcwIcon, UsersRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { DataTable } from '../../../components/data-table';
import { columns } from './columns';

import type { UserAccountDto } from '@/models/dto/userAccountDto';
import { useRouter, useSearchParams } from 'next/navigation';
import { MultiSelect } from '@/components/multi-select';

const UsersPage = () => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const [users, setUsers] = useState<UserAccountDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserAccountDto | null>(null);

  const [page, setPage] = useState<number>(searchParams.get('page') ? Number(searchParams.get('page')) : 1);
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(searchParams.get('limit') ? Number(searchParams.get('limit')) : 10);

  // Parameters for the table
  const [search, setSearch] = useState<string>(searchParams.get('search') || '');
  const [roleSelected, setRoleSelected] = useState<string[]>((searchParams.get('role') ?? '').split(',').filter(Boolean));
  const [statusSelected, setStatusSelected] = useState<string[]>((searchParams.get('status') ?? '').split(',').filter(Boolean));

  useEffect(() => {
    updateSearchParams();
    fetchUsers();
  }, [page, limit, search, roleSelected, statusSelected]);

  const fetchUsers = async () => {
    setLoading(true);
    console.log(roleSelected.join(','));
    try {
      const res = await getUsers(page, limit, {
        search,
        role: roleSelected,
        status: statusSelected,
      });
      // console.log(res); // dùng cho biến

      setUsers(res.userAccounts);
      setTotal(res.pagination.total);
      setLimit(res.pagination.limit);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (resource: UserAccountDto) => {
    try {
      const res = await deleteAccountUser(resource.id || '');
      if (!res) {
        toast.success('Xoá tài khoản người dùng thành công');
        fetchUsers();
      }
    } catch (error: any) {
      toast.error('Xoá tài khoản người dùng thất bại', {
        description: error.message,
      });
    }
  };

  const handleUpdate = (resource: UserAccountDto) => {
    if (resource) {
      setUser(resource);
      setOpen(true);
    }
  };

  const resetFilters = () => {
    setSearch('');
    setRoleSelected([]);
    setStatusSelected([]);
    setPage(1);
    setLimit(10);

    router.push('/dashboard/users');
  };

  const updateSearchParams = () => {
    const params = new URLSearchParams();
    if (page) params.set('page', String(page));
    if (limit) params.set('limit', String(limit));
    if (search) params.set('search', search);
    if (roleSelected) params.set('role', roleSelected.join(','));
    if (statusSelected) params.set('status', statusSelected.join(','));
    router.push(`/dashboard/users?${params.toString()}`);
  };

  return (
    <div className="">
      <div className="mb-5 py-2 rounded-md">
        <h1 className="font-semibold drop-shadow-md text-2xl">QUẢN LÝ NGƯỜI DÙNG</h1>
      </div>
      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-6 *:mt-2">
        <Input
          placeholder="Tìm kiếm theo email..."
          className="max-w-sm sm:w-full"
          value={search} //value hiện tại 1 chiều. Khi giá trị mặc định bằng rỗng
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <MultiSelect
          options={Object.entries(UserRole).map(([__, value]) => ({
            label: ROLE_LABELS[value],
            value: value,
          }))}
          value={roleSelected}
          onValueChange={(values) => {
            setRoleSelected(values);
            setPage(1);
          }}
          placeholder="Chọn vai trò"
          className="relative sm:w-[200px] w-full justify-start"
        />
        <MultiSelect
          options={Object.entries(Status).map(([__, value]) => ({
            label: STATUS_LABELS[value],
            value,
          }))}
          value={statusSelected}
          onValueChange={(values) => {
            setStatusSelected(values);
            setPage(1);
          }}
          placeholder="Chọn trạng thái"
          className="relative sm:w-[220px] w-full justify-start"
        />
        <Button variant="outline" onClick={resetFilters}>
          <RotateCcwIcon className="w-6 h-6" />
        </Button>
        <Button
          className="w-full md:w-[100px] ml-auto"
          onClick={() => {
            setOpen(true);
            setUser(null);
          }}
        >
          <UsersRound className="w-4 h-4 mr-2" />
          Tạo
        </Button>
        <AddUserDialog open={open} setOpen={setOpen} user={user ? user : null} reloadData={fetchUsers} />
      </div>
      <DataTable
        columns={columns(handleDelete, handleUpdate)}
        data={users}
        total={total}
        page={page}
        limit={limit}
        onPaginationChange={(nextPage, nextLimit) => {
          setPage(nextPage);
          setLimit(nextLimit);
        }}
      />
    </div>
  );
};

export default ProtectPage(UsersPage, { allowedRoles: [UserRole.ADMIN] }); // cho phép only admin
