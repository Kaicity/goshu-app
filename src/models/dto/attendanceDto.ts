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
    firstname?: string;
    lastname?: string;
    avatarUrl?: string;
    type?: string;
    designation?: string;
  };
  updatedAt?: string;
}

interface AttendancePaginationDto {
  attendances: AttendanceDto[];
  pagination: PaginationDto;
}

interface AttendanceFilters {
  employeeId?: string;
  search?: string;
  date?: string;
  status?: string;
}

export type { AttendanceDto, AttendancePaginationDto, AttendanceFilters };
