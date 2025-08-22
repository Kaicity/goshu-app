'use client';

import { useApp } from '@/contexts/AppContext';
import useNotification from '@/hooks/useNotification';
import { formatTimeAgo } from '@/utils/formatTimeAgo';
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CircleOff,
  Clock,
  CreditCard,
  Eye,
  LogOut,
  Moon,
  Search,
  Settings,
  Sun,
  User,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { SidebarMenuButton, SidebarTrigger, useSidebar } from './ui/sidebar';
import Link from 'next/link';
import { getEmployee } from '@/api/employee/employee';
import type { EmployeeDto } from '@/models/dto/employeeDto';
import { Input } from './ui/input';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { logout } = useApp();
  const { isMobile } = useSidebar();
  const { userAccount } = useApp();

  const { notifications, setNotifications, unreadCount } = useNotification();
  const [readCount, setReadCount] = useState(unreadCount);

  const [employee, setEmployee] = useState<EmployeeDto | null>(null);
  const [fullname, setFullname] = useState<string>('');

  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('vi-VN', { hour12: false }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchEmployeeDetail = async () => {
      if (userAccount) {
        const res = await getEmployee(userAccount.employeeId as string);
        setEmployee(res);

        if (res.firstname || res.lastname) {
          setFullname(res.lastname + ' ' + res.firstname);
        }
      }
    };

    fetchEmployeeDetail();
  }, [userAccount]);

  useEffect(() => {
    setReadCount(notifications.filter((n) => !n.read).length);
  }, [notifications]);

  return (
    <nav className="p-4 flex items-center justify-between sticky top-0 bg-background z-10">
      {/* LEFT */}
      <SidebarTrigger />

      {/* CENTER */}
      <motion.div className="flex items-center bg-custom-cyan/60 text-white p-2 rounded-md">
        <Clock />
        <p className="text-lg">{currentTime}</p>
      </motion.div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <div className="hidden md:block relative max-w-sm sm:w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
          {/* Input có padding-left để tránh icon chồng lên chữ */}
          <Input placeholder="Tìm kiếm" className="pl-10" />
        </div>

        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="relative bg-secondary text-black dark:text-white">
                <Bell />
                {readCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {notifications.filter((n) => !n.read).length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[400px] max-h-96 overflow-auto p-2" sideOffset={8}>
              <div className="flex items-center justify-between px-2 py-1">
                <DropdownMenuLabel>Thông báo mới</DropdownMenuLabel>
                {notifications.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-blue-500 hover:underline"
                    onClick={() => {
                      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
                    }}
                  >
                    Xem tất cả
                  </Button>
                )}
              </div>
              <DropdownMenuSeparator />

              {notifications.length === 0 ? (
                <DropdownMenuItem disabled>
                  <div className="flex flex-col gap-2 items-center justify-center mx-auto">
                    <span>Không có thông báo</span>
                    <CircleOff />
                  </div>
                </DropdownMenuItem>
              ) : (
                notifications
                  .slice()
                  .reverse()
                  .map((notif, index) => (
                    <DropdownMenuItem
                      key={notif.id}
                      className="flex items-start space-x-2 hover:bg-accent cursor-pointer"
                      onSelect={(event) => {
                        event.preventDefault();
                        const updated = notifications.map((n) => (n.id === notif.id ? { ...n, read: true } : n));
                        setNotifications(updated);
                      }}
                    >
                      <div className="flex-shrink-0">
                        <Bell className="w-4 h-4 mt-1 text-blue-500" />
                      </div>
                      <div className="flex-1 text-sm">
                        <p className="font-medium text-foreground">{notif.message}</p>
                        <div className="flex items-center">
                          <p className="text-xs text-muted-foreground">{formatTimeAgo(notif.createdAt)}</p>
                        </div>
                      </div>
                      {notif.read && (
                        <div className="flex gap-2 text-xs items-center">
                          <Eye />
                          <span>Đã xem</span>
                        </div>
                      )}
                    </DropdownMenuItem>
                  ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* USER MENU */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={employee?.avatarUrl} alt={employee?.email} />
                <AvatarFallback className="rounded-lg">
                  {fullname
                    ? fullname
                        .split(' ') // Tách thành mảng ["Nguyễn", "Minh", "Thông"]
                        .map((word) => word[0]?.toUpperCase()) // Lấy ký tự đầu rồi viết hoa
                        .join('') // Ghép lại đi
                    : 'AR'}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{fullname ? fullname : 'Chưa cập nhật'}</span>
                <span className="truncate text-xs">{employee?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'right' : 'bottom'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={employee?.avatarUrl} alt={employee?.email} />
                  <AvatarFallback className="rounded-lg">
                    {fullname
                      ? fullname
                          .split(' ') // Tách thành mảng ["Nguyễn", "Minh", "Thông"]
                          .map((word) => word[0]?.toUpperCase()) // Lấy ký tự đầu rồi viết hoa
                          .join('') // Ghép lại đi
                      : 'AR'}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{fullname ? fullname : 'Chưa cập nhật'}</span>
                  <span className="truncate text-xs">{employee?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href={''}>
                  <BadgeCheck />
                  Tài khoản
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={''}>
                  <CreditCard />
                  Chính sách
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={''}>
                  <Bell />
                  Thông báo
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
