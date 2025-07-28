"use client";

import ProtectPage from "@/components/auth/ProtectPage";

import { AddUserDialog } from "@/app/dashboard/users/AddUserDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Status } from "@/enums/statusEnum";
import { UserRole } from "@/enums/userRolesEnum";
import { ListFilterPlus, RotateCcwIcon, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import { DataTable } from "../../../components/data-table";
import { columns } from "./columns";
import { DataTableFacetedFilter } from "./DataTableFacetedFilter";
import { deleteAccountUser, getUsers } from "@/api/users/user";
import UserAccountDto from "@/models/dto/userAccountDto";
import { toast } from "sonner";
import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

const UsersPage = () => {
  const [users, setUsers] = useState<UserAccountDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserAccountDto | null>(null);

  const statusOptions = Object.entries(Status).map(([key, value]) => ({
    label: value,
    value,
  }));

  const roleOptions = Object.entries(UserRole).map(([key, value]) => ({
    label: value,
    value,
  }));

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      setUsers(res);
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
  const table = useReactTable({
    data: users,
    columns: columns(handleDelete, handleUpdate),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  useEffect(() => {
    fetchUsers();
  }, []);

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
          placeholder="Tìm kiếm theo tên..."
          className="max-w-sm sm:w-full"
        />
        <DataTableFacetedFilter
          title="Trạng Thái"
          options={statusOptions}
          column={table.getColumn("status")}
        />

        <DataTableFacetedFilter
          title="Chức Vụ"
          options={roleOptions}
          column={table.getColumn("role")}
        />

        <Button variant="outline">
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
        table={table}
        columns={columns(handleDelete, handleUpdate)}
        data={users}
      />
    </div>
  );
};

export default ProtectPage(UsersPage);
