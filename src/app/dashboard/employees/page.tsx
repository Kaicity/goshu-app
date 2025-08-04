'use client';

import ProtectPage from '@/components/auth/ProtectPage';
import { UserRole } from '@/enums/userRolesEnum';
import React from 'react';

const EmployeesPage = () => {
  return <div>{'EMPOYEE DEV TIẾP ĐI EM ơIIIIII !'}</div>;
};

export default ProtectPage(EmployeesPage, { allowedRoles: [UserRole.ADMIN, UserRole.HR] });
