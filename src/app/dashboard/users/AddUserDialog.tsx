"use client";

import { createAccountUser, getUser } from "@/api/users/user";
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
import UserAccountDto from "@/models/dto/userAccountDto";
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
  mode: "create" | "update";
  setMode?: (mode: "create" | "update") => void;
  email?: string | null;
}
export function AddUserDialog({
  open,
  setOpen,
  mode,
  setMode,
  email,
}: AddUserDialogProps) {
  const [roleSelected, setRoleSelected] = useState<string>("");
  const [user, setUser] = useState<UserAccountDto | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createAccountFormData>({
    resolver: zodResolver(createAccountSchema),
  });

  // Nếu mode là update thì gán giá trị cho form
  useEffect(() => {
    if (mode === "create") {
      reset();
      setRoleSelected("");
    }
    if (mode === "update" && email) {
      setRoleSelected("");
      reset({
        email: user?.email,
        role: user?.role,
        status: user?.status,
      });
      setRoleSelected(user?.role || "");
    }
  }, [mode, email, reset]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await handleGetUser(email as string);
      if (res) {
        setUser(res);
      }
    };
    fetchUser();
  }, [email]);

  //reset hàm để gán giá trị
  useEffect(() => {
    if (roleSelected) {
      reset({ role: roleSelected, status: Status.ACTIVE });
    }
  }, [roleSelected]);

  const handleGetUser = async (
    email: string
  ): Promise<UserAccountDto | null> => {
    try {
      const user = await getUser(email);
      return user;
    } catch (error: any) {
      toast.error("Lấy thông tin người dùng thất bại", {
        description: error.message,
      });
    }
    return null;
  };

  const [state, submitAction, isPending] = useActionState(
    async (prevState: any, formData: createAccountFormData) => {
      try {
        const res = await createAccountUser(formData);
        if (res) {
          toast.success("Tạo tài khoản người dùng thành công");
          setOpen(false);
          reset();
          setRoleSelected("");
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
      <DialogContent className="max-w-md w-[500px] px-6 py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <DialogHeader>
            <DialogTitle className="text-xl">Tạo người dùng</DialogTitle>
            <DialogDescription>
              Điền thông tin người dùng để tạo tài khoản
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
            </div>

            <div className="grid gap-2 space-y-2">
              <Label>Email</Label>
              <Input
                {...register("email")}
                placeholder="Nhập email"
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
                reset();
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
