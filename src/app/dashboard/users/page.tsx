"use client";
import ProtectPage from "@/components/auth/ProtectPage";

import { User, columns } from "./columns";
import { DataTable } from "../data-table";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotateCcwIcon, UsersRound, ListFilterPlus } from "lucide-react";
import { UserRole } from "@/enums/userRolesEnum";
import { Status } from "@/enums/statusEnum";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const getData = async (): Promise<User[]> => {
  return [
    {
      id: "728ed521",
      email: "user1@example.com",
      password: "password1",
      role_id: UserRole.ADMIN,
      status: Status.ACTIVE,
      employee_id: "employee1",
    },
    {
      id: "728ed522",
      email: "user2@example.com",
      password: "password2",
      role_id: UserRole.EMPLOYEE,
      status: Status.INACTIVE,
      employee_id: "employee2",
    },
  ];
};
const UsersPage = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const payments = await getData();
        setData(payments);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
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
        <Button className="w-full md:w-[100px] ml-auto">
          <UsersRound className="w-4 h-4 mr-2" />
          Tạo
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default ProtectPage(UsersPage);
