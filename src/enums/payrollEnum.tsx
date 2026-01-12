export enum Payroll {
  OPEN = 'OPEN',
  CALCULATED = 'CALCULATED',
  CLOSED = 'CLOSED',
}

export const PAYROLL_LABELS: Record<Payroll, string> = {
  [Payroll.OPEN]: 'Đang mở',
  [Payroll.CALCULATED]: 'Đang kiểm toán',
  [Payroll.CLOSED]: 'Đã đóng',
};

export const PAYROLL_STYLES: Record<Payroll, string> = {
  [Payroll.OPEN]:
    'text-center border text-xs font-medium bg-green-200/40 border-green-300 text-green-900 rounded-md dark:text-green-100',

  [Payroll.CALCULATED]:
    'text-center border text-xs font-medium bg-orange-100/30 border-orange-200 text-orange-900 rounded-md dark:text-orange-200',

  [Payroll.CLOSED]:
    'text-center border text-xs font-medium bg-destructive/10 border-destructive/10 dark:bg-destructive/50 text-destructive rounded-md dark:text-primary',
};
