import { formatDistanceToNow, parseISO } from "date-fns";
import { vi } from "date-fns/locale";

export const formatTimeAgo = (isoDate: Date) => {
  return formatDistanceToNow(isoDate, {
    addSuffix: true,
    locale: vi,
  });
};
