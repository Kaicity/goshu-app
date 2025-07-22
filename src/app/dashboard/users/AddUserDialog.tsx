"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { ROLE_ICONS, ROLE_LABELS, UserRole } from "@/enums/userRolesEnum";
import { createAccountUser } from "@/api/users/userAuth";
import {
  createAccountSchema,
  type createAccountFormData,
} from "@/models/schemas/createAccountSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface AddUserDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onCreated?: () => void;
}
export function AddUserDialog({
  open,
  setOpen,
  onCreated,
}: AddUserDialogProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<createAccountFormData>({
    resolver: zodResolver(createAccountSchema),
  });
  const onSubmit = async (user: createAccountFormData) => {
    try {
      await createAccountUser(user);
      onCreated?.();
      setOpen(false);
    } catch (err) {
      console.error("Tạo tài khoản thất bại:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[400px] lg:max-w-[500px] [&>button]:hidden">
        <DialogHeader>
          <DialogTitle>Tạo người dùng</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Vai trò</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Chọn vai trò" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(ROLE_LABELS).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    <div className={`flex items-center gap-2`}>
                      {ROLE_ICONS[key as UserRole]}
                      {label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Email</Label>
            <Input placeholder="Nhập email" />
          </div>
          <div className="grid gap-2">
            <Label>Mật khẩu</Label>
            <Input type="password" placeholder="#Adfe8f8jhz!@" />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Đóng
          </Button>
          <Button type="submit">Lưu thông tin</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
