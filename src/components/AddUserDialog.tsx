"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

interface AddUserDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export function AddUserDialog({ open, setOpen }: AddUserDialogProps) {
  const [role, setRole] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white hover:bg-blue-600 ">Tạo người dùng</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tạo người dùng</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Vai trò</Label>
            <Select onValueChange={(value) => setRole(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Quản trị</SelectItem>
                <SelectItem value="user">Người dùng</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Họ tên</Label>
            <Input placeholder="Nhập họ tên đầy đủ" />
          </div>

          <div className="grid gap-2">
            <Label>Tên đăng nhập</Label>
            <Input placeholder="Nhập tên đăng nhập" />
          </div>

          <div className="grid gap-2">
            <Label>Mật khẩu</Label>
            <Input type="password" placeholder="#Adfe8f8jhz!@" />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline">Đóng</Button>
          <Button type="submit">Lưu thông tin</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
