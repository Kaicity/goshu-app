'use client';

import { humanManageitems, systemsManageItems } from '@/constants/nav-link/nav-link-items';
import {
  BadgeCheck,
  Bell,
  ChevronRight,
  ChevronsUpDown,
  ChevronUp,
  CreditCard,
  LogOut,
  Moon,
  Sparkles,
  Sun,
  User2,
} from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from './ui/sidebar';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';
import { UserRole } from '@/enums/userRolesEnum';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getEmployee } from '@/api/employee/employee';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';

const AppSidebar = () => {
  const { userAccount } = useApp();
  const { isMobile } = useSidebar();
  const path = usePathname();

  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

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
