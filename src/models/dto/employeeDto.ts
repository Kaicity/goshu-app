import { TypeWork } from '@/enums/typeWorkEnum';
import { PaginationDto } from './userAccountDto';
import { DepartmentDto } from './departmentDto';

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
  status?: string;
  marital?: string;
  country?: string;
  identityCard?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface EmployeeFormSubmit {
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
  type?: string;
  joinDate?: Date;
  workingDate?: Date;
  avatarUrl?: string;
  document?: string[];
  departmentId?: string;
  status?: string;
  marital?: string;
  country?: string;
  identityCard?: string;
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

export type { EmployeeDto, EmployeePaginationDto, EmployeeFilterDto, EmployeeFormSubmit };
