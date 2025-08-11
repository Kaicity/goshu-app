import { PaginationDto } from './userAccountDto';
import { Type } from '@/enums/typeEnum';

interface EmployeeDto {
  id: string;
  fullname?: string; //
  username?: string; //
  employeeCode: string; //
  email: string; //
  githubId?: string;
  slackId?: string;
  microsoftTeamId?: string;
  address?: string; //
  phone?: number; //
  birthday?: Date; //
  gender?: string; //
  designation?: string; //
  type?: Type; //
  joinDate?: Date; //
  workingDate?: Date; //
  avatarUrl?: string; //
  document?: string;
  departmentId?: string; //
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface EmployeePaginationDto {
  employees: EmployeeDto[];
  pagination: PaginationDto;
}

export type { EmployeeDto, EmployeePaginationDto };
