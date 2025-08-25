import { formatInTimeZone } from 'date-fns-tz';

function formatUTC(date: Date, formatStr?: string) {
  return formatInTimeZone(new Date(date), 'UTC', formatStr ?? 'HH:mm');
}

export { formatUTC };
