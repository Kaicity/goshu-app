import { ShieldCheck, Wrench, User } from 'lucide-react';
import type { ReactNode } from 'react';

export enum UserRole {
  ADMIN = "ADMIN",
  HR = "HR",
  EMPLOYEE = "EMPLOYEE",
}

export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.ADMIN]: 'Quản trị viên',
  [UserRole.HR]: 'Nhân sự',
  [UserRole.EMPLOYEE]: 'Nhân viên',
};

export const ROLE_STYLES: Record<UserRole, string> = {
  [UserRole.ADMIN]: 'bg-yellow-500 text-white dark:bg-yellow-400',
  [UserRole.HR]: 'bg-cyan-500 text-white',
  [UserRole.EMPLOYEE]: 'bg-blue-500 text-white',
};

export const ROLE_ICONS: Record<UserRole, ReactNode> = {
  [UserRole.ADMIN]: <User className="w-4 h-4 mr-1" />,
  [UserRole.HR]: <Wrench className="w-4 h-4 mr-1" />,
  [UserRole.EMPLOYEE]: <ShieldCheck className="w-4 h-4 mr-1" />,
};