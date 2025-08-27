import { UserRole } from '@/enums/userRolesEnum';
import {
  Calendar,
  CalendarCheck,
  CoinsIcon,
  FolderCheck,
  Home,
  Inbox,
  MessageCircleIcon,
  PersonStanding,
  Presentation,
  Settings2,
  ShieldCheck,
  TimerIcon,
  User,
  Users2,
  Workflow,
} from 'lucide-react';

const humanManageitems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
    children: [],
    roles: [UserRole.ADMIN, UserRole.HR, UserRole.EMPLOYEE],
  },
  {
    title: 'Chat',
    url: '/dashboard/chats',
    icon: MessageCircleIcon,
    children: [],
    roles: [UserRole.HR, UserRole.EMPLOYEE],
  },
  {
    title: 'Nhân Viên',
    url: '',
    icon: Users2,
    roles: [UserRole.HR, UserRole.EMPLOYEE],
    children: [
      {
        title: 'Danh mục nhân viên',
        url: '/dashboard/employees',
        icon: Inbox,
        children: [
          {
            title: 'Thêm nhân viên',
            url: '/dashboard/employees/info-update',
            icon: Inbox,
            roles: [UserRole.HR],
          },
        ],
        roles: [UserRole.HR],
      },
      {
        title: 'Chấm Công',
        url: `/dashboard/employees/attendance`,
        icon: Inbox,
        roles: [UserRole.HR, UserRole.EMPLOYEE],
      },
      {
        title: 'Nghỉ Phép',
        url: `/dashboard/employees/leave-request`,
        icon: Inbox,
        roles: [UserRole.HR, UserRole.EMPLOYEE],
      },
      {
        title: 'Lương',
        url: '/dashboard/payrolls',
        icon: CoinsIcon,
        chilren: [],
        roles: [UserRole.EMPLOYEE, UserRole.HR],
      },
    ],
  },
  {
    title: 'Bảng Ngày Công',
    url: '/dashboard/attendances',
    icon: CalendarCheck,
    children: [],
    roles: [UserRole.HR],
  },
  {
    title: 'Cuộc Họp Nội Bộ',
    url: '/dashboard/meetings',
    icon: Workflow,
    children: [],
    roles: [UserRole.HR, UserRole.EMPLOYEE],
  },
  {
    title: 'Dự Án',
    url: '/dashboard/projects',
    icon: FolderCheck,
    children: [],
    roles: [UserRole.HR, UserRole.EMPLOYEE],
  },
  {
    title: 'Đơn Nghỉ Phép',
    url: '/dashboard/leave-requests',
    icon: Calendar,
    children: [],
    roles: [UserRole.HR],
  },
  {
    title: 'Đang Chờ Duyệt',
    url: '/dashboard/request-pendings',
    icon: TimerIcon,
    children: [],
    roles: [UserRole.HR],
  },
  {
    title: 'Phòng Ban',
    url: '/dashboard/departments',
    icon: Presentation,
    roles: [UserRole.HR],
  },
];

const systemsManageItems = [
  {
    title: 'Tài Khoản Người Dùng',
    url: '/dashboard/users',
    icon: User,
    roles: [UserRole.ADMIN],
  },
  {
    title: 'Thông tin Nhân Viên',
    url: '/dashboard/profile',
    icon: PersonStanding,
    roles: [UserRole.EMPLOYEE, UserRole.HR],
  },
  {
    title: 'Phân Quyền',
    url: '/dashboard/roles',
    icon: ShieldCheck,
    roles: [UserRole.ADMIN],
  },
  {
    title: 'Cài Đặt Hệ Thống',
    url: '/dashboard/settings',
    icon: Settings2,
    roles: [UserRole.ADMIN],
  },
];

export { humanManageitems, systemsManageItems };
