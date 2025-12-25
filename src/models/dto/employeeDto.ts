import type { EmployeeStatus } from '@/enums/employeeEnum';
import { TypeWork } from '@/enums/typeWorkEnum';
import { DepartmentDto } from './departmentDto';
import { PaginationDto } from './userAccountDto';

interface EmployeeDto {
  id: string;
  firstname?: string;
  lastname?: string;
  username?: string;
  employeeCode: string;
  email: string;
  internalEmail?: string;
  githubId?: string;
  slackId?: string;
  microsoftTeamId?: string;
  address?: string;
  phone?: string;
  birthday?: Date;
  gender?: string;
  designation?: string;
  type?: TypeWork;
  joinDate?: Date;
  workingDate?: Date;
  avatarUrl?: string;
  document?: string[];
  departmentId?: DepartmentDto;
  status?: EmployeeStatus;
  marital?: string;
  country?: string;
  identityCard?: string;
  basicSalary?: number;
  allowance?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type EmployeeFormDto = Omit<EmployeeDto, 'departmentId' | 'type' | 'status'> & {
  type?: string;
  departmentId?: string;
  status?: string;
};

interface EmployeePaginationDto {
  employees: EmployeeDto[];
  pagination: PaginationDto;
}

interface EmployeeFilterDto {
  search?: string;
  typeWorks?: string[];
  departments?: string[];
}

export type { EmployeeDto, EmployeeFilterDto, EmployeeFormDto, EmployeePaginationDto };
