'use client';

import ProtectPage from '@/components/auth/ProtectPage';

import { deleteAccountUser, getUsers } from '@/api/users/user';
import { AddUserDialog } from '@/app/dashboard/users/AddUserDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Status, STATUS_LABELS } from '@/enums/statusEnum';
import { ROLE_LABELS, UserRole } from '@/enums/userRolesEnum';
import { PlusCircle, RotateCcwIcon, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { DataTable } from '../../../components/DataTable';
import { columns } from './columns';

import { HeaderTitle } from '@/components/HeaderTitle';
import { MultiSelect } from '@/components/MultiSelect';
import type { UserAccountDto } from '@/models/dto/userAccountDto';
import { useRouter, useSearchParams } from 'next/navigation';

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
    <>
      <HeaderTitle text="Quản Lý Tài Khoản" subText="Quản lý tài khoản người dùng truy cập" />
      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-6 *:mt-2">
        <div className="relative max-w-sm sm:w-full">
          {/* Icon Search bên trái */}
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
          {/* Input có padding-left để tránh icon chồng lên chữ */}
          <Input
            placeholder="Tìm kiếm theo email..."
            className="pl-10"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
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
          className="relative justify-start px-4"
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
          className="relative justify-start px-4"
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
          <PlusCircle className="w-4 h-4 mr-2" />
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
        loading={loading}
      />
    </>
  );
};

export default ProtectPage(UsersPage, { allowedRoles: [UserRole.ADMIN] });
