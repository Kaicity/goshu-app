export enum LeaveRequest {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export const LEAVEREQUEST_LABELS: Record<LeaveRequest, string> = {
  [LeaveRequest.PENDING]: 'Đang chờ',
  [LeaveRequest.APPROVED]: 'Đã duyệt',
  [LeaveRequest.REJECTED]: 'Đã từ chối',
};

export const LEAVEREQUEST_STYLES: Record<LeaveRequest, string> = {
  [LeaveRequest.PENDING]:
    'text-center border text-xs font-medium bg-sky-200/40 border-sky-300 text-sky-900 rounded-md dark:text-sky-100',
  [LeaveRequest.APPROVED]:
    'text-center border text-xs font-medium bg-teal-100/30 border-teal-200 text-teal-900 rounded-md dark:text-teal-200',
  [LeaveRequest.REJECTED]:
    'text-center border text-xs font-medium bg-destructive/10 border-destructive/10 dark:bg-destructive/50 text-destructive rounded-md dark:text-primary',
};
