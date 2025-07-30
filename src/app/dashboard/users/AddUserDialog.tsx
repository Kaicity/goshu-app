"use client";

import {
  createAccountUser,
  getUser,
  updateAccountUser,
} from "@/api/users/user";
import { SubmitButton } from "@/components/SummitButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROLE_ICONS, ROLE_LABELS, UserRole } from "@/enums/userRolesEnum";
import UserAccountDto from "@/models/dto/userAccountDto";
import {
  createAccountSchema,
  updateAccountSchema,
  type createAccountFormData,
  type updateAccountFormData,
} from "@/models/schemas/createAccountSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { changePassword } from "@/api/users/user";

interface AddUserDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user?: UserAccountDto | null;
  reloadData: () => void;
}

export function AddUserDialog({
  open,
  setOpen,
  user,
  reloadData: loadData,
}: AddUserDialogProps) {
  const [roleSelected, setRoleSelected] = useState<string>(UserRole.ADMIN);
  const isEdit = !!user; // Kiểm tra nếu có user thì là chỉnh sửa, ngược lại là tạo mới
  const formSchema = isEdit ? updateAccountSchema : createAccountSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createAccountFormData | updateAccountFormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        email: user.email,
        password: "",
        role: user.role,
      });
      setRoleSelected(user.role);
    } else {
      initialFormData();
    }
  }, [user]);

  useEffect(() => {
    if (roleSelected) {
      reset((prev) => ({
        ...prev, // lay gia tri thay doi truoc do
        role: roleSelected,
      }));
    }
  }, [roleSelected]);

  const initialFormData = () => {
    reset({
      email: "",
      password: "",
      role: UserRole.ADMIN,
    });
    setRoleSelected(UserRole.ADMIN);
  };

  const [state, submitAction, isPending] = useActionState(
    async (prevState: any, formData: isEditFormData) => {
      if (user) {
        try {
          if (formData.password && formData.password !== "") {
            //gọi Api ChangePassword API nếu có mật khẩu mới
            const resPassword = await changePassword({
              email: user.email,
              password: formData.password,
            });
          }

          //cập nhật thông tin mà không change password
          const { password, ...dataWithOutPassword } = formData;
          const res = await updateAccountUser(
            user.id as string,
            dataWithOutPassword
          );
          if (res) {
            toast.success("Cập nhật tài khoản người dùng thành công");
            setOpen(false);
            initialFormData();
            loadData();
          }
        } catch (error: any) {
          toast.error("Cập nhật tài khoản thất bại", {
            description: error.message,
          });
        }
      } else {
        try {
          const res = await createAccountUser(formData);
          if (res) {
            toast.success("Tạo tài khoản người dùng thành công");
            setOpen(false);
            initialFormData();
            loadData();
          }
        } catch (error: any) {
          toast.error("Tạo tài khoản thất bại", {
            description: error.message,
          });
        }
      }
    },
    undefined
  );

  //xử lý form submit cho update và create
  type isEditFormData = createAccountFormData | updateAccountFormData;

  const onSubmit = async (data: isEditFormData) => {
    console.log(data);
    startTransition(() => {
      submitAction(data);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md w-[500px] px-6 py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {user ? "Cập nhật người dùng" : "Tạo người dùng"}
            </DialogTitle>
            <DialogDescription>
              {user
                ? "Cập nhật thông tin người dùng"
                : "Điền thông tin người dùng để tạo tài khoản"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-2 space-y-2">
              <Label>Vai trò</Label>
              <Select value={roleSelected} onValueChange={setRoleSelected}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(ROLE_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2">
                        {ROLE_ICONS[key as UserRole]}
                        {label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role.message}</p>
              )}
            </div>

            <div className="grid gap-2 space-y-2">
              <Label>Email</Label>
              <Input
                {...register("email")}
                placeholder="Nhập email"
                autoComplete="new-email"
                className="h-10"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="grid gap-2 space-y-2">
              <Label>Mật khẩu</Label>
              <Input
                {...register("password")}
                type="password"
                placeholder="#Adfe8f8jhz!@"
                autoComplete="new-password"
                className="h-10"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false);
                initialFormData();
              }}
            >
              Đóng
            </Button>
            <SubmitButton text="Lưu" isPending={isPending} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
