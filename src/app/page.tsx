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
        const token = await login(formData);
        if (token) {
          Cookies.set("authToken", token, {
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
    startTransition(() => {
      submitAction(data);
    });
  };

  return (
    <div className="flex flex-1 min-h-screen items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
