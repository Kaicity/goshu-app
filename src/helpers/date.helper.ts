import { formatInTimeZone } from 'date-fns-tz';

/**
 * Format ngày/giờ theo UTC (giữ nguyên giờ gốc, không +7)
 * Ví dụ: 2025-08-25T14:37:28.000Z -> 14:37
 */
function formatUTC(date: Date, formatStr?: string) {
  return formatInTimeZone(new Date(date), 'UTC', formatStr ?? 'HH:mm');
}

/**
 * Format ngày/giờ theo múi giờ Việt Nam (Asia/Ho_Chi_Minh)
 * Ví dụ: 2025-08-25T14:37:28.000Z -> 21:37
 */
function formatVN(date: Date, formatStr?: string) {
  return formatInTimeZone(new Date(date), 'Asia/Ho_Chi_Minh', formatStr ?? 'HH:mm');
}

export { formatUTC, formatVN };
