import { Status } from '@/enums/statusEnum';
import { PaginationDto } from './userAccountDto';

interface EmployeeDto {
  id: string;
  fullname: string; //
  username?: string; //
  employeeCode: string; //
  email: string; //
  github?: string;
  slackId?: string;
  microsoftTeamsId?: string;
  address?: string; //
  phone?: number; //
  birthday?: Date; //
  gender?: string; //
  designation?: string; //
  type?: string; //
  joinDate?: Date; //
  workingDate?: Date; //
  avatarUrl?: string; //
  document?: string;
  departmentId?: string; //
  status?: Status;
  createdAt?: Date;
  updatedAt?: Date;
}

interface EmployeePaginationDto {
  employees: EmployeeDto[];
  pagination: PaginationDto;
}

export type { EmployeeDto, EmployeePaginationDto };
