export enum Status {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING = 'PENDING',
}
export const STATUS_LABELS: Record<Status, string> = {
  [Status.ACTIVE]: 'Hoạt động',
  [Status.SUSPENDED]: 'Tạm dừng',
  [Status.PENDING]: 'Đang chờ',
};
export const STATUS_STYLES: Record<Status, string> = {
  [Status.ACTIVE]: 'border text-xs font-medium bg-teal-100/30 border-teal-200 text-teal-900 rounded-md dark:text-teal-200',

  [Status.SUSPENDED]:
    'border text-xs font-medium bg-destructive/10 border-destructive/10 dark:bg-destructive/50 text-destructive rounded-md dark:text-primary ',
  [Status.PENDING]: 'border text-xs font-medium bg-sky-200/40 border-sky-300 text-sky-900 rounded-md dark:text-sky-100',
};
