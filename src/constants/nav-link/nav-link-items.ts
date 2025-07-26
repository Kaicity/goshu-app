import {
  Calendar,
  CoinsIcon,
  Home,
  Inbox,
  MessageCircleIcon,
  Presentation,
  Settings2,
  ShieldCheck,
  TimerIcon,
  User,
  Users2,
} from "lucide-react";

const humanManageitems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    children: [],
  },
  {
    title: "Chat",
    url: "/dashboard/chat",
    icon: MessageCircleIcon,
    children: [],
  },
  {
    title: "Nhân Viên",
    url: "",
    icon: Users2,
    children: [
      {
        title: "Danh sách nhân viên",
        url: "/dashboard/employees",
        icon: Inbox,
      },
      {
        title: "Chấm công",
        url: "/dashboard/attendances",
        icon: Inbox,
      },
      {
        title: "Lương",
        url: "/dashboard/payrolls",
        icon: CoinsIcon,
        chilren: [],
      },
    ],
  },
  {
    title: "Đơn Nghỉ Phép",
    url: "/dashboard/leave-requests",
    icon: Calendar,
    children: [],
  },
  {
    title: "Đang Chờ Duyệt",
    url: "/dashboard/request-pending",
    icon: TimerIcon,
    children: [],
  },
  {
    title: "Phòng Ban",
    url: "/department",
    icon: Presentation,
  },
];

const systemsManageItems = [
  {
    title: "Người Dùng",
    url: "/dashboard/users",
    icon: User,
  },
  {
    title: "Phân Quyền",
    url: "/dashboard/roles",
    icon: ShieldCheck,
  },
  {
    title: "Cài Đặt",
    url: "/dashboard/settings",
    icon: Settings2,
  },
];

export { humanManageitems, systemsManageItems };
