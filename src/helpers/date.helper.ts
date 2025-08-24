import { formatInTimeZone } from 'date-fns-tz';

// timezone cho Việt Nam
const VN_TIMEZONE = 'Asia/Ho_Chi_Minh';

/**
 * Format datetime theo múi giờ VN
 * @param date ISO string hoặc Date
 * @param formatStr pattern của date-fns (mặc định HH:mm dd/MM/yyyy)
 */
export function formatDateVN(date: string | Date, formatStr = 'HH:mm dd/MM/yyyy') {
  return formatInTimeZone(date, VN_TIMEZONE, formatStr);
}
