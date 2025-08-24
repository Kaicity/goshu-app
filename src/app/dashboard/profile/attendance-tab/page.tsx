import ProtectPage from '@/components/auth/ProtectPage';
import { DataTable } from '@/components/DataTable';
import { UserRole } from '@/enums/userRolesEnum';
import React, { useState } from 'react';
import { columns } from './columns';
const AttendanceTabsPage = () => {
  const data = [""]; // Replace with actual data
   const [page, setPage] = useState<number>(1);
   const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const loading = false; // Replace with actual loading state
    const handlePaginationChange = (newPage: number, newLimit: number) => {
    setPage(newPage);
    setLimit(newLimit);
  };

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        page={page}
        limit={limit}
        total={total}
        onPaginationChange={handlePaginationChange}
      />
  
      {loading && <p>Loading...</p>}
    </div>
    
  );
};

export default ProtectPage(AttendanceTabsPage, { allowedRoles: [UserRole.ADMIN, UserRole.HR, UserRole.EMPLOYEE] });
