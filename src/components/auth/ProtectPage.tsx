"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

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
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
          <div className="w-max bg-primary flex flex-col items-center p-6 rounded-md">
            <Loader2 className="w-8 h-8 animate-spin mb-3 text-white dark:text-black" />
            <h1 className="font-semibold text-md  text-white dark:text-black">
              Đang xử lý...
            </h1>
          </div>
        </div>
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
