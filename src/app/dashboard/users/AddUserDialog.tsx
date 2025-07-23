"use client";

import { createAccountUser } from "@/api/users/user";
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
import { Status } from "@/enums/statusEnum";
import { ROLE_ICONS, ROLE_LABELS, UserRole } from "@/enums/userRolesEnum";
import {
  createAccountSchema,
  type createAccountFormData,
} from "@/models/schemas/createAccountSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface AddUserDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onCreated?: () => void;
}
export function AddUserDialog({ open, setOpen }: AddUserDialogProps) {
  const [roleSelected, setRoleSelected] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createAccountFormData>({
    resolver: zodResolver(createAccountSchema),
  });

  //reset hàm để gán giá trị
  useEffect(() => {
    if (roleSelected) {
      reset({ role: roleSelected, status: Status.ACTIVE });
    }
  }, [roleSelected]);

  const [state, submitAction, isPending] = useActionState(
    async (prevState: any, formData: createAccountFormData) => {
      try {
        const res = await createAccountUser(formData);
        if (res) {
          toast.success("Tạo tài khoản người dùng thành công");
          setOpen(false);
        }
      } catch (error: any) {
        toast.error("Tạo tài khoản thất bại", {
          description: error.message,
        });
      }
    },
    undefined
  );

  const onSubmit = async (data: createAccountFormData) => {
    console.log(data);
    startTransition(() => {
      submitAction(data);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[400px] lg:max-w-[500px] [&>button]:hidden">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Tạo người dùng</DialogTitle>
            <DialogDescription>
              Điền thông tin người dùng để tạo tài khoản
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Vai trò</Label>
              <Select onValueChange={(role) => setRoleSelected(role)}>
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
              <Input {...register("email")} placeholder="Nhập email" />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Mật khẩu</Label>
              <Input
                {...register("password")}
                type="password"
                placeholder="#Adfe8f8jhz!@"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
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
            <SubmitButton text="Lưu" isPending={isPending} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
