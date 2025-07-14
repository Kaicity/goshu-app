"use client";

import { login } from "@/api/users/userAuth";
import { LoginForm } from "@/components/LoginForm";
import {
  loginFormSchema,
  type loginFormData,
} from "@/models/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/SummitButton";
import { is } from "date-fns/locale";
import { userInfo } from "os";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormData>({
    resolver: zodResolver(loginFormSchema),
  });
  const router = useRouter();

  const [state, submitAction, isPending] = useActionState(
    async (prevState: any, formData: loginFormData) => {
      try {
        const userData = await login(formData);
        console.log("Login successful, token:", userData);

        if (userData) {
          Cookies.set("authToken", userData, {
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

  const onSubmit = (data: loginFormData) => {
    console.log("Form submitted with data:", data);

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
