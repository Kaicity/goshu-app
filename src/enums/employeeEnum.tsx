export enum EmployeeStatus {
  ACTIVE = 'ACTIVE',
  TERMINATED = 'TERMINATED',
  PROBATION = 'PROBATION',
  LEAVE = 'LEAVE',
}

export const EMPLOYEE_STATUS_LABELS: Record<EmployeeStatus, string> = {
  [EmployeeStatus.ACTIVE]: 'Đang làm việc',
  [EmployeeStatus.TERMINATED]: 'Đã nghỉ việc',
  [EmployeeStatus.PROBATION]: 'Thử việc',
  [EmployeeStatus.LEAVE]: 'Nghỉ phép',
};

import { CheckCircle, XCircle, Clock, Umbrella } from 'lucide-react';
import type { ReactNode } from 'react';

export const EMPLOYEE_STATUS_ICON: Record<EmployeeStatus, ReactNode> = {
  [EmployeeStatus.ACTIVE]: <CheckCircle className="w-4 h-4 mr-1" />,
  [EmployeeStatus.TERMINATED]: <XCircle className="w-4 h-4 mr-1" />,
  [EmployeeStatus.PROBATION]: <Clock className="w-4 h-4 mr-1" />,
  [EmployeeStatus.LEAVE]: <Umbrella className="w-4 h-4 mr-1" />,
};

export const EMPLOYEE_STATUS_COLOR: Record<EmployeeStatus, string> = {
  [EmployeeStatus.ACTIVE]:
    'w-[100px] py-1 border text-xs text-center font-medium bg-green-100/40 border-green-300 text-green-700 rounded-md dark:bg-green-500/20 dark:text-green-300',

  [EmployeeStatus.TERMINATED]:
    'w-[100px] py-1 border text-xs text-center font-medium bg-red-100/40 border-red-300 text-red-700 rounded-md dark:bg-red-500/20 dark:text-red-300',

  [EmployeeStatus.PROBATION]:
    'w-[100px] py-1 border text-xs text-center font-medium bg-blue-100/40 border-blue-300 text-blue-700 rounded-md dark:bg-blue-500/20 dark:text-blue-300',

  [EmployeeStatus.LEAVE]:
    'w-[100px] py-1 border text-xs text-center font-medium bg-orange-100/40 border-orange-300 text-orange-700 rounded-md dark:bg-orange-500/20 dark:text-orange-300',
};
