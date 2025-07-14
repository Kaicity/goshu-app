import { LoginForm } from "@/components/LoginForm";
import Image from "next/image";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex flex-1 min-h-screen items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
