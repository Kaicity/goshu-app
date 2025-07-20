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
  [Status.ACTIVE]: "bg-green-500 text-white",
  [Status.INACTIVE]: "bg-gray-500 text-white",
  [Status.SUSPENDED]: "bg-yellow-500 text-white",
  [Status.PENDING]: "bg-blue-500 text-white",
};