import { redirect } from "next/navigation";
import { useEffect } from "react";
import useAuth from "./useAuth";

const useLogged = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Nếu đang ở trang login và user đã đăng nhập thì route đến dashboard
  useEffect(() => {
    if (isAuthenticated) {
      redirect("/dashboard");
    }
  }, [isAuthenticated]);
};

export default useLogged;
