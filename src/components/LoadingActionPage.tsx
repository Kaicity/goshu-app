import { Loader2 } from 'lucide-react';
import React from 'react';

const LoadingActionPage = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" /> */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 w-max bg-primary flex flex-col items-center p-6 rounded-2xl shadow-lg">
        <Loader2 className="w-8 h-8 animate-spin mb-3 text-white dark:text-black" />
        <h1 className="font-semibold text-md text-white dark:text-black">Đang xử lý...</h1>
      </div>
    </div>
  );
};

export default LoadingActionPage;
