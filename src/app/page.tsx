"use client";

import { login } from "@/api/users/userAuth";
import { SubmitButton } from "@/components/SummitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import {
  loginFormSchema,
  type loginFormData,
} from "@/models/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Nếu đang ở trang login và user đã đăng nhập thì route đến dashboard
  useEffect(() => {
    if (isAuthenticated) {
      redirect("/dashboard");
    }
  }, [isAuthenticated]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormData>({
    resolver: zodResolver(loginFormSchema),
  });
  const router = useRouter();

  // Action user login trong một chuỗi actions lưu cookies, chuyển page, login failed or success
  const [state, submitAction, isPending] = useActionState(
    async (prevState: any, formData: loginFormData) => {
      try {
        const res = await login(formData);

        // Lấy được object có access token rồi thì lưu vào cookies storage
        if (res) {
          Cookies.set("authToken", res.accesstoken, {
            expires: 1,
            path: "/",
            secure: true,
            sameSite: "Strict",
          });

          router.push("/dashboard");
        }
      } catch (error: any) {
        console.log("Login Error");
      }
    },
    undefined
  );

  // Sự kiện form lồng kép
  const onSubmit = (data: loginFormData) => {
    startTransition(() => {
      submitAction(data);
    });
  };

  return (
    <div className="flex flex-1 min-h-screen items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <>
                <div className="flex justify-center mb-4">
                  <Image
                    width={100}
                    height={100}
                    src="logo.svg"
                    alt=""
                    className="w-20 h-20 object-cover"
                  />
                </div>
                <CardTitle>Đăng nhập tài khoản</CardTitle>
                <CardDescription>
                  Nhập Email và Password để đăng nhập vào hệ thống
                </CardDescription>
              </>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label>Email</Label>
                    <Input
                      {...register("email")}
                      id="email"
                      placeholder="david@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label>Password</Label>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Quên mật khẩu
                      </a>
                    </div>
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
                    {/* <Button type="submit" className="w-full">
                      Đăng nhập
                    </Button> */}
                    <SubmitButton
                      text="Đăng nhập"
                      isPending={isPending}
                      className="w-full"
                    />
                    <Button variant="outline" className="w-full">
                      Đăng nhập với Google
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
