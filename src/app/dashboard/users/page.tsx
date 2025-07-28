"use client";

import ProtectPage from "@/components/auth/ProtectPage";

import { deleteAccountUser, getUsers } from "@/api/users/user";
import { AddUserDialog } from "@/app/dashboard/users/AddUserDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Status, STATUS_LABELS } from "@/enums/statusEnum";
import { ROLE_LABELS, UserRole } from "@/enums/userRolesEnum";
import UserAccountDto from "@/models/dto/userAccountDto";
import { RotateCcwIcon, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "../../../components/data-table";
import { columns } from "./columns";
const UsersPage = () => {
  const [users, setUsers] = useState<UserAccountDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserAccountDto | null>(null);
  const statusOptions = Object.entries(Status).map(([value]) => ({
    label: value,
    value,
  }));

  const roleOptions = Object.entries(UserRole).map(([value]) => ({
    label: value,
    value,
  }));

  // Pagination
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);

  // Parameters for the table
  const [search, setSearch] = useState<string>("");
  const [roleSelected, setRoleSelected] = useState<string>("");
  const [statusSelected, setStatusSelected] = useState<string>("");

  useEffect(() => {
    fetchUsers();
  }, [page, limit, search, roleSelected, statusSelected]);

  const fetchUsers = async () => {
    setLoading(true);
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
      const res = await deleteAccountUser(resource.id || "");
      if (!res) {
        toast.success("Xoá tài khoản người dùng thành công");
        fetchUsers();
      }
    } catch (error: any) {
      toast.error("Xoá tài khoản người dùng thất bại", {
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
    setSearch("");
    setRoleSelected("");
    setStatusSelected("");
    setPage(1);
  };

  return (
    <div className="">
      <div className="mb-5 py-2 rounded-md">
        <h1 className="font-semibold drop-shadow-md text-2xl">
          QUẢN LÝ NGƯỜI DÙNG
        </h1>
      </div>
      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-1 mb-6 *:mt-2">
        <Input
          placeholder="Tìm kiếm theo email..."
          className="max-w-sm sm:w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* <DataTableFacetedFilter
          title="Trạng Thái"
          options={statusOptions}
          value={statusOptions}
          onChange={setStatus}
        />
        <DataTableFacetedFilter
          title="Chức Vụ"
          options={roleOptions}
          value={role}
          onChange={setRole}
        /> */}

        <Select value={roleSelected} onValueChange={setRoleSelected}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Chọn chức vụ" />
            <SelectContent>
              {Object.entries(UserRole).map(([key, value]) => (
                <SelectItem key={key} value={value}>
                  {ROLE_LABELS[value]}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectTrigger>
        </Select>

        <Select value={statusSelected} onValueChange={setStatusSelected}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Chọn trạng thái" />
            <SelectContent>
              {Object.entries(Status).map(([key, value]) => (
                <SelectItem key={key} value={value}>
                  {STATUS_LABELS[value]}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectTrigger>
        </Select>

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
        <AddUserDialog
          open={open}
          setOpen={setOpen}
          user={user ? user : null}
          reloadData={fetchUsers}
        />
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

export default ProtectPage(UsersPage);
