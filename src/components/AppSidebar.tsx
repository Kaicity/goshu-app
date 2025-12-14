'use client';

import { humanManageitems, systemsManageItems } from '@/constants/nav-link/nav-link-items';
import { useApp } from '@/contexts/AppContext';
import { UserRole } from '@/enums/userRolesEnum';
import { cn } from '@/lib/utils';
import { ChevronRight, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from './ui/sidebar';
import { io, type Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

const AppSidebar = () => {
  const { userAccount } = useApp();
  const path = usePathname();

  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  const [numberNotification, setNumberNotification] = useState<number>(0);

  useEffect(() => {
    const socket: Socket = io(SOCKET_URL);

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('leave-request:added', (payload) => {
      console.log('vo chua');
      console.log(payload);

      if (payload) {
        setNumberNotification((prev) => prev + 1);
      }
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-max">
              <Link href="/">
                <Image src="/logo.svg" alt="logo" width={30} height={30} />
                <div className="flex flex-col">
                  <span className="text-md font-medium">Goshu</span>
                  <span className="text-xs text-gray-500">HR Admin System</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Quản Lý</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {humanManageitems
                .filter((item) => item.roles.includes(userAccount?.role as UserRole))
                .map((item) => {
                  const children = item.children?.filter((child) => child.roles.includes(userAccount?.role as UserRole));
                  return (
                    <Collapsible key={item.title} asChild defaultOpen={true} className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          {!children || children.length === 0 ? (
                            <SidebarMenuButton
                              tooltip={item.title}
                              asChild
                              className={cn(
                                'bg-transparent h-10',
                                item.url === path && 'bg-custom-cyan/30 font-medium hover:bg-custom-cyan/30',
                              )}
                            >
                              <Link href={item.url}>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          ) : (
                            <SidebarMenuButton tooltip={item.title}>
                              {item.icon && <item.icon />}
                              <span>{item.title}</span>
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          )}
                        </CollapsibleTrigger>

                        {children && children.length > 0 && (
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {children.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.url}>
                                  <SidebarMenuSubButton
                                    asChild
                                    className={cn(
                                      'bg-transparent h-10',
                                      subItem.url === path && 'bg-custom-cyan/30 font-medium hover:bg-custom-cyan/30',
                                    )}
                                  >
                                    <Link href={subItem.url}>
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        )}

                        {/* BADGET TAG MESSAGE */}
                        {item.tag && numberNotification > 0 && (
                          <SidebarMenuBadge>
                            <div className="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center text-white font-bold text-md">
                              {numberNotification}
                            </div>
                          </SidebarMenuBadge>
                        )}
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Người Dùng</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemsManageItems
                .filter((item) => item.roles?.includes(userAccount?.role as UserRole))
                .map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        'bg-transparent h-10',
                        item.url === path && 'bg-custom-cyan/30 font-medium hover:bg-custom-cyan/30',
                      )}
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex gap-1 justify-between px-3">
              <Button onClick={() => setTheme('light')} className="w-1/2" variant={theme === 'light' ? 'default' : 'ghost'}>
                <Sun className="h-5 w-5" />
                <span className="sr-only">Light mode</span>
              </Button>

              <Button onClick={() => setTheme('dark')} className="w-1/2" variant={theme === 'dark' ? 'default' : 'ghost'}>
                <Moon className="h-5 w-5" />
                <span className="sr-only">Dark mode</span>
              </Button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
