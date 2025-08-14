import { TypeWork } from '@/enums/typeWorkEnum';
import { PaginationDto } from './userAccountDto';
import { DepartmentDto } from './departmentDto';

interface EmployeeDto {
  id: string;
  fullname?: string;
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
  status?: string;
  marital?: string;
  country?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface EmployeePaginationDto {
  employees: EmployeeDto[];
  pagination: PaginationDto;
}

interface EmployeeFilterDto {
  search?: string;
  typeWorks?: string[];
  departments?: string[];
}

export type { EmployeeDto, EmployeePaginationDto, EmployeeFilterDto };
