import type { ReactNode } from "react";

export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
  PENDING = "PENDING",
}
export const STATUS_LABELS: Record<Status, string> = {
  [Status.ACTIVE]: "Hoạt động",
  [Status.INACTIVE]: "Không hoạt động",
  [Status.SUSPENDED]: "Tạm dừng",
  [Status.PENDING]: "Đang chờ",
};
export const STATUS_STYLES: Record<Status, string> = {
  [Status.ACTIVE]:
    "border border-sky-500 text-xs font-medium bg-sky-200/40 text-sky-900 rounded-md dark:text-cyan-300 dark:border-cyan-500 dark:bg-cyan-900/30 ",
  [Status.INACTIVE]:
    "border border-sky-500 text-xs font-medium bg-gray-500 text-white border-gray-500 rounded-md dark:border-gray-400 dark:bg-gray-400 ",
  [Status.SUSPENDED]:
    "border border-yellow-500 text-xs font-medium bg-yellow-500 text-white rounded-md dark:border-yellow-400 dark:bg-yellow-400 ",
  [Status.PENDING]:
    "border border-blue-500 text-xs font-medium bg-blue-500 text-white rounded-md dark:border-blue-400 dark:bg-blue-400 ",
};
