import type PaginationDto from './pagination';

interface LeaveRequestDto {
  leaveRequest: {
    id: string;
    startDate?: string;
    endDate?: string;
    reason?: string;
    status: string;
    approvedBy: string;
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
  employeeId?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}
export type { LeaveRequestDto, LeaveRequestPaginationDto, FiltersLeaveRequest };
