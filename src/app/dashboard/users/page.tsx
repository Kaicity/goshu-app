"use client";
import ProtectPage from "@/components/auth/ProtectPage";

import { User, columns } from "./columns";
import { DataTable } from "../data-table";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const getData = async (): Promise<User[]> => {
  return [
    {
      id: "728ed521",
      email: "user1@example.com",
      password: "password1",
      role_id: "role1",
      employee_id: "employee1",
    },
    {
      id: "728ed522",
      email: "user2@example.com",
      password: "password2",
      role_id: "role2",
      employee_id: "employee2",
    },
  ];
};
const UsersPage =  () => {
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
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">All Users</h1>
      </div>
      {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-1 mb-6 *:mt-2">
          <Input 
            placeholder="Tìm kiếm theo tên..."
            className="max-w-sm sm:w-full"
          />
          <Button className="w-full md:w-[180px]">Tạo người dùng mới</Button>
          </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default ProtectPage(UsersPage);