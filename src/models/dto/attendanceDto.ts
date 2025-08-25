import type { EmployeeDto } from './employeeDto';
import type PaginationDto from './pagination';

interface AttendanceDto {
  attendance: {
    id: string;
    date?: string;
    checkIn?: string;
    checkOut?: string;
    workingHour?: number;
    status: string;
  };
  employee: {
    id: string;
    employeeCode: string;
    firstname: string;
    lastname: string;
  };
  updatedAt?: string;
}

interface AttendancePaginationDto {
  attendances: AttendanceDto[];
  pagination: PaginationDto;
}

export type { AttendanceDto, AttendancePaginationDto };
