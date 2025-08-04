'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

type ProtectPageOptions = {
  allowedRoles?: string[]; // ['ADMIN', 'HR', 'EMPLOYEE]
};

const ProtectPage = <P extends object>(WrappedComponent: React.ComponentType<P>, options?: ProtectPageOptions) => {
  const Wrapper: React.FC<P> = (props) => {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuth();

    const { userAccount } = useApp();
    const allowedRoles = options?.allowedRoles; // Các Role có quyền được truy cập

    useEffect(() => {
      if (!isLoading) {
        if (!isAuthenticated) {
          router.push('/');
        } else if (allowedRoles && userAccount && !allowedRoles.includes(userAccount.role)) {
          router.replace('/dashboard/403'); // permission về trang 403 không đủ quyền truy cập
        }
      }
    }, [isAuthenticated, isLoading, userAccount, allowedRoles, router]);

    if (isLoading) {
      return (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
          <div className="w-max bg-primary flex flex-col items-center p-6 rounded-md">
            <Loader2 className="w-8 h-8 animate-spin mb-3 text-white dark:text-black" />
            <h1 className="font-semibold text-md  text-white dark:text-black">Đang xử lý...</h1>
          </div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    if (allowedRoles && userAccount && !allowedRoles.includes(userAccount.role)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default ProtectPage;
