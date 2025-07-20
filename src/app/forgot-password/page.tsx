"use client";

import { forgotPassword } from "@/api/users/user";
import { SubmitButton } from "@/components/SummitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  forgotPasswordFormSchema,
  type forgotPasswordFormData,
} from "@/models/schemas/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import CryptoJS from "crypto-js";

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordFormSchema),
  });
  const router = useRouter();

  // Action user login trong một chuỗi actions lưu cookies, chuyển page, login failed or success
  const [state, submitAction, isPending] = useActionState(
    async (prevState: any, formData: forgotPasswordFormData) => {
      try {
        const res = await forgotPassword(formData.email);
        if (res) {
          const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY_CRYPTO as string;
          const code = res.resetCode;

          const encrypted = CryptoJS.AES.encrypt(
            JSON.stringify({ code }),
            secretKey
          ).toString();

          router.push(
            `/change-password?token=${encodeURIComponent(encrypted)}`
          );
        }
      } catch (error: any) {
        toast.error("Đã xảy ra lỗi khi gửi yêu cầu", {
          description: error.message,
        });
      }
    },
    undefined
  );

  // Sự kiện form lồng kép
  const onSubmit = (data: forgotPasswordFormData) => {
    startTransition(() => {
      submitAction(data);
    });
  };

  return (
    <div className="w-full min-h-screen">
      <div className="p-4">
        <Link href="/" className="flex gap-1 items-center">
          <ArrowLeft size={20} />
          <span className="text-sm">quay lại</span>
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center p-6 md:p-10">
        <Card>
          <CardHeader>
            <>
              <CardTitle>Quên mật khẩu</CardTitle>
              <CardDescription>
                Nhập tài khoản email để khôi phục mật khẩu
              </CardDescription>
            </>
          </CardHeader>
          <CardContent className="w-[400px]">
            <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
              <Label>Email</Label>
              <Input
                {...register("email")}
                id="email"
                placeholder="david@example.com"
              />

              <div className="mt-2">
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="mt-4">
                <SubmitButton
                  text="Gửi yêu cầu"
                  isPending={isPending}
                  className="w-full"
                />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
