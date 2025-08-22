export enum AttendanceStatus {
  ABSENT = 'ABSENT',
  LATE = 'LATE',
  PRESENT = 'PRESENT',
}

export const ATTENDANCE_LABELS: Record<AttendanceStatus, string> = {
  [AttendanceStatus.ABSENT]: 'Vắng',
  [AttendanceStatus.LATE]: 'Trễ',
  [AttendanceStatus.PRESENT]: 'Có mặt',
};

export const ATTENDANCE_COLOR: Record<AttendanceStatus, string> = {
  [AttendanceStatus.ABSENT]: 'text-red-500',
  [AttendanceStatus.LATE]: 'text-yellow-500',
  [AttendanceStatus.PRESENT]: 'text-green-500',
};
