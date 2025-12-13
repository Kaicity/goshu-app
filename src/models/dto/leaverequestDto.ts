import type PaginationDto from './pagination';

interface CreateLeaveRequestDto {
  employeeId?: string;
  startDate?: string;
  endDate?: string;
  reason?: string;
  note?: string;
  status?: string;
}

interface LeaveRequestDto {
  leaveRequest: {
    id: string;
    startDate?: string;
    endDate?: string;
    reason?: string;
    status: string;
    approvedBy: {
      id: string;
      employeeCode: string;
      firstname?: string;
      lastname?: string;
    };
    note?: string;
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
  createdAt?: string;
}

interface LeaveRequestPaginationDto {
  leaveRequest: LeaveRequestDto[];
  pagination: PaginationDto;
}

interface FiltersLeaveRequest {
  search?: string;
  employeeId?: string;
  status?: string[];
  startDate?: string;
  endDate?: string;
}
export type { CreateLeaveRequestDto, LeaveRequestDto, LeaveRequestPaginationDto, FiltersLeaveRequest };
