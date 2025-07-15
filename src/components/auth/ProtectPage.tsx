"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const ProtectPage = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Wrapper: React.FC<P> = (props) => {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push("/");
      }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
      return (
        <h1 className="text-primary font-semibold text-md">Đang xử lý...</h1>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default ProtectPage;
