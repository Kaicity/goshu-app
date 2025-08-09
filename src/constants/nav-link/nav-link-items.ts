import { UserRole } from '@/enums/userRolesEnum';
import {
  Calendar,
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
    roles: [UserRole.ADMIN, UserRole.HR],
  },
  {
    title: 'Chat',
    url: '/dashboard/chat',
    icon: MessageCircleIcon,
    children: [],
    roles: [UserRole.ADMIN, UserRole.HR, UserRole.EMPLOYEE],
  },
  {
    title: 'Nhân Viên',
    url: '',
    icon: Users2,
    roles: [UserRole.ADMIN, UserRole.HR, UserRole.EMPLOYEE],
    children: [
      {
        title: 'Danh mục nhân viên',
        url: '/dashboard/employees',
        icon: Inbox,
        children: [
          {
            title: 'Thêm nhân viên',
            url: '/dashboard/employees/add-employee',
            icon: Inbox,
            roles: [UserRole.ADMIN, UserRole.HR],
          },
        ],
        roles: [UserRole.ADMIN, UserRole.HR],
      },

      {
        title: 'Chấm công',
        url: '/dashboard/attendances',
        icon: Inbox,
        roles: [UserRole.ADMIN, UserRole.HR, UserRole.EMPLOYEE],
      },
      {
        title: 'Lương',
        url: '/dashboard/payrolls',
        icon: CoinsIcon,
        chilren: [],
        roles: [UserRole.ADMIN, UserRole.HR],
      },
    ],
  },
  {
    title: 'Cuộc Họp Nội Bộ',
    url: '/dashboard/meeting',
    icon: Workflow,
    children: [],
    roles: [UserRole.ADMIN, UserRole.HR, UserRole.EMPLOYEE],
  },
  {
    title: 'Task',
    url: '/dashboard/task',
    icon: FolderCheck,
    children: [],
    roles: [UserRole.ADMIN, UserRole.HR, UserRole.EMPLOYEE],
  },
  {
    title: 'Đơn Nghỉ Phép',
    url: '/dashboard/leave-requests',
    icon: Calendar,
    children: [],
    roles: [UserRole.ADMIN, UserRole.HR, UserRole.EMPLOYEE],
  },
  {
    title: 'Đang Chờ Duyệt',
    url: '/dashboard/request-pending',
    icon: TimerIcon,
    children: [],
    roles: [UserRole.ADMIN, UserRole.HR],
  },
  {
    title: 'Phòng Ban',
    url: '/dashboard/departments',
    icon: Presentation,
    roles: [UserRole.ADMIN, UserRole.HR],
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
