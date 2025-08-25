export enum AttendanceStatus {
  ABSENT = 'ABSENT',
  LATE = 'LATE',
  PRESENT = 'PRESENT',
  ONLEAVE = 'ONLEAVE',
}

export const ATTENDANCE_LABELS: Record<AttendanceStatus, string> = {
  [AttendanceStatus.ABSENT]: 'Vắng',
  [AttendanceStatus.LATE]: 'Trễ',
  [AttendanceStatus.PRESENT]: 'Có mặt',
  [AttendanceStatus.ONLEAVE]: 'Nghỉ phép',
};

export const ATTENDANCE_COLOR: Record<AttendanceStatus, string> = {
  [AttendanceStatus.ABSENT]:
    'w-[90px] border text-sm text-center font-medium bg-destructive/10 border-destructive/10 dark:bg-destructive/50 text-destructive rounded-md dark:text-primary',
  [AttendanceStatus.LATE]:
    'w-[90px] border text-sm text-center font-medium bg-yellow-100/30 border-yellow-200 text-yellow-900 rounded-md dark:text-yellow-200',
  [AttendanceStatus.PRESENT]:
    'w-[90px] border text-sm text-center font-medium bg-teal-100/30 border-teal-200 text-teal-900 rounded-md dark:text-teal-200 ',
  [AttendanceStatus.ONLEAVE]:
    'w-[90px] border text-sm text-center font-medium bg-orange-100/30 border-orange-200 text-orange-900 rounded-md dark:text-orange-200',
};
