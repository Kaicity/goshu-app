"use client";
import { getValidateBorder } from "@/utils/inputUtils";
import { login } from "@/api/users/userAuth";
import { Particles } from "@/components/magicui/particles";
import { SubmitButton } from "@/components/SummitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import {
  loginFormSchema,
  type loginFormData,
} from "@/models/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const { resolvedTheme } = useTheme();
  const { setTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

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
    <div className="relative flex flex-1 min-h-screen w-full items-center justify-center p-6 md:p-10">
      <div className="absolute top-0 right-0 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />

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
                      className= {getValidateBorder(errors.email)}
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
                      className= {getValidateBorder(errors.password)}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    <SubmitButton
                      text="Đăng nhập"
                      isPending={isPending}
                      className="w-full"
                    />
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
