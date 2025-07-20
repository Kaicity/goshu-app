"use client";

import { redirect, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
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

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY_CRYPTO as string;

const ChangePasswordPage = () => {
  const searchParams = useSearchParams();
  const [code, setCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      try {
        const bytes = CryptoJS.AES.decrypt(token, secretKey);
        const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        setCode(decrypted.code);
      } catch (err) {
        console.error("Giải mã thất bại:", err);
      }
    } else {
      redirect("/forgot-password");
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
          <div className="space-y-2">
            <Label>Mã code</Label>
            <div className="flex items-center gap-2">
              <Input
                id="code"
                placeholder="XXXXXX"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
              />
              <Button className="w-max" onClick={handleCheckCode}>
                {isLoading ? (
                  <Loader2 className="size-4 mr-2 animate-spin" />
                ) : (
                  "Xác nhận"
                )}
              </Button>
            </div>
          </div>

          {resetPassword && (
            <form onSubmit={() => {}} className="mt-5">
              <div className="flex flex-col gap-4">
                <div className="grid gap-3">
                  <Label>Email</Label>
                  <Input
                    //   {...register("email")}
                    id="email"
                    placeholder="david@example.com"
                  />
                  {/* {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )} */}
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label>Password</Label>
                  </div>
                  <Input
                    //   {...register("password")}
                    id="password"
                    type="password"
                  />
                  {/* {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )} */}
                </div>
                <div className="flex flex-col gap-3">
                  <SubmitButton
                    text="Đổi mật khẩu"
                    isPending={false}
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
