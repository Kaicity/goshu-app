"use client";
import ProtectPage from "@/components/auth/ProtectPage";

import { columns } from "./columns";
import { DataTable } from "../data-table";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotateCcwIcon, UsersRound, ListFilterPlus, Users } from "lucide-react";
import { UserRole } from "@/enums/userRolesEnum";
import { Status } from "@/enums/statusEnum";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddUserDialog } from "@/components/AddUserDialog";
import { getUsers } from "@/api/users/userAuth";
import { set } from "react-hook-form";
import UserAccountDto from "@/models/dto/userAccountDto";

const UsersPage = () => {
  const [users, setUsers] = useState<UserAccountDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const users = await getUsers();
      console.log("🟡 [DEBUG] Fetched users:", users);
      setUsers(users);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
    } finally {
      setLoading(false);
    }
  };
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <ListFilterPlus className="w-6 h-6" /> Trạng Thái
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ml-3">
            {Object.entries(Status).map(([key, value]) => (
              <DropdownMenuItem
                key={key}
                onClick={() => console.log("Lọc trạng thái:", value)}
              >
                {value}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <ListFilterPlus className="w-6 h-6" /> Chức Vụ
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ml-6">
            {Object.entries(UserRole).map(([key, value]) => (
              <DropdownMenuItem
                key={key}
                onClick={() => console.log("Lọc chức vụ:", value)}
              >
                {value}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline">
          <RotateCcwIcon className="w-6 h-6" />
        </Button>
        <Button
          className="w-full md:w-[100px] ml-auto"
          onClick={() => setOpen(true)}
        >
          <UsersRound className="w-4 h-4 mr-2" />
          Tạo
        </Button>

        <AddUserDialog open={open} setOpen={setOpen} />
      </div>
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default ProtectPage(UsersPage);
