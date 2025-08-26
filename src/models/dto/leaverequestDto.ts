import type PaginationDto from './pagination';

interface LeaveRequestDto {
  leaverequest: {
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
  createdAt: string;
}

interface LeaveRequestPaginationDto {
    leaverequests: LeaveRequestDto[];
    pagination: PaginationDto;
}
