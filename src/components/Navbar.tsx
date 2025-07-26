"use client";

import { useApp } from "@/contexts/AppContext";
import useNotification from "@/hooks/useNotification";
import { formatTimeAgo } from "@/utils/formatTimeAgo";
import {
  Bell,
  CircleOff,
  Eye,
  LogOut,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SidebarTrigger } from "./ui/sidebar";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const { logout } = useApp();

  const { notifications, setNotifications, unreadCount } = useNotification();
  const [readCount, setReadCount] = useState(unreadCount);

  useEffect(() => {
    setReadCount(notifications.filter((n) => !n.read).length);
  }, [notifications]);

  return (
    <nav className="p-4 flex items-center justify-between sticky top-0 bg-background z-10">
      {/* LEFT */}
      <SidebarTrigger />
      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* THEME MENU */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="relative">
                <Bell />
                {readCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {notifications.filter((n) => !n.read).length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-[400px] max-h-96 overflow-auto p-2"
            >
              <div className="flex items-center justify-between px-2 py-1">
                <DropdownMenuLabel>Thông báo mới</DropdownMenuLabel>
                {notifications.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-blue-500 hover:underline"
                    onClick={() => {
                      setNotifications((prev) =>
                        prev.map((n) => ({ ...n, read: true }))
                      );
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
                        const updated = notifications.map((n) =>
                          n.id === notif.id ? { ...n, read: true } : n
                        );
                        setNotifications(updated);
                      }}
                    >
                      <div className="flex-shrink-0">
                        <Bell className="w-4 h-4 mt-1 text-blue-500" />
                      </div>
                      <div className="flex-1 text-sm">
                        <p className="font-medium text-foreground">
                          {notif.message}
                        </p>
                        <div className="flex items-center">
                          <p className="text-xs text-muted-foreground">
                            {formatTimeAgo(notif.createdAt)}
                          </p>
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
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://avatars.githubusercontent.com/u/80609391?v=4" />
              <AvatarFallback>NMT</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent sideOffset={10}>
            <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="h-[1.2rem] w-[1.2rem] mr-2" />
              Thông tin cá nhân
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-[1.2rem] w-[1.2rem] mr-2" />
              Cài đặt
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={logout}>
              <LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
