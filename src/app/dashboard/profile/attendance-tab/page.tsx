import ProtectPage from '@/components/auth/ProtectPage';
import { UserRole } from '@/enums/userRolesEnum';
import React from 'react';

const AttendanceTabsPage = () => {
  return <div>Tui ne </div>;
};

export default ProtectPage(AttendanceTabsPage, { allowedRoles: [UserRole.ADMIN, UserRole.HR, UserRole.EMPLOYEE] });
