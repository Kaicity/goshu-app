import { PaginationDto } from './userAccountDto';

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
  type?: string;
  joinDate?: Date;
  workingDate?: Date;
  avatarUrl?: string;
  document?: string[];
  departmentId?: string;
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

export type { EmployeeDto, EmployeePaginationDto };
