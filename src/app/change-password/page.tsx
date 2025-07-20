"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import CryptoJS from "crypto-js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/SummitButton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  loginFormSchema,
  type loginFormData,
} from "@/models/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePassword } from "@/api/users/user";
import { cn } from "@/lib/utils";

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY_CRYPTO as string;

const ChangePasswordPage = () => {
  const searchParams = useSearchParams();
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);

  const navigate = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<loginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const [state, submitAction, isPending] = useActionState(
    async (prevState: any, formData: loginFormData) => {
      try {
        const res = await changePassword(formData);

        if (res) {
          toast.success("Đổi mật khẩu thành công");
          navigate.replace("/");
        }
      } catch (error: any) {
        toast.error("Khôi phục mật khẩu thất bại", {
          description: error.message,
        });
        navigate.replace("/");
      }
    },
    undefined
  );

  const onSubmit = (data: loginFormData) => {
    startTransition(() => {
      submitAction(data);
    });
  };

  useEffect(() => {
    const token = searchParams.get("token");
    const account = searchParams.get("account");

    if (token && account) {
      try {
        const bytes = CryptoJS.AES.decrypt(token, secretKey);
        const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        setCode(decrypted.code);
        setEmail(account);
        reset({ email: account });
      } catch (err) {
        console.error("Giải mã thất bại:", err);
      }
    } else {
      navigate.push("/forgot-password");
    }
  }, [searchParams]);

  const handleCheckCode = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (!code) {
        toast.error("Không tìm thấy mã xác thực.");
        return;
      }

      if (inputCode.trim() === code.toString()) {
        setResetPassword(true);
      } else {
        setResetPassword(false);
        toast.error("Sai mã xác nhận. Vui lòng kiểm tra lại.");
      }
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-1 items-center justify-center p-6 md:p-10">
      <Card>
        <CardHeader>
          <>
            <CardTitle>Đổi mật khẩu</CardTitle>
            <CardDescription>
              Nhập mã code được gửi đến email và đổi mật khẩu mới
            </CardDescription>
          </>
        </CardHeader>
        <CardContent className="w-[400px]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCheckCode();
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="code">Mã code</Label>
              <div className="flex items-center gap-2">
                <Input
                  readOnly={resetPassword}
                  id="code"
                  name="code"
                  required
                  placeholder="XXXXXX"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className={cn(resetPassword && "cursor-not-allowed")}
                />
                <Button
                  className="w-max"
                  type="submit"
                  disabled={resetPassword}
                >
                  {isLoading ? (
                    <Loader2 className="size-4 mr-2 animate-spin" />
                  ) : (
                    "Xác nhận"
                  )}
                </Button>
              </div>
            </div>
          </form>

          {resetPassword && (
            <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
              <div className="flex flex-col gap-4">
                <div className="grid gap-3">
                  <Label>Mật khẩu mới</Label>
                  <Input
                    {...register("password")}
                    id="password"
                    type="password"
                  />

                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <SubmitButton
                    text="Đổi mật khẩu"
                    isPending={isPending}
                    className="w-full"
                  />
                </div>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePasswordPage;
