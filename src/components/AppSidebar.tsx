'use client';

import { humanManageitems, systemsManageItems } from '@/constants/nav-link/nav-link-items';
import { BadgeCheck, Bell, ChevronRight, ChevronsUpDown, ChevronUp, CreditCard, LogOut, Sparkles, User2 } from 'lucide-react';
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
  SidebarSeparator,
  useSidebar,
} from './ui/sidebar';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';
import { UserRole } from '@/enums/userRolesEnum';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { EmployeeDto } from '@/models/dto/employeeDto';
import { getEmployee } from '@/api/employee/employee';

const AppSidebar = () => {
  const { userAccount } = useApp();
  const { isMobile } = useSidebar();
  const path = usePathname();

  const [employee, setEmployee] = useState<EmployeeDto | null>(null);

  useEffect(() => {
    const fetchEmployeeDetail = async () => {
      if (userAccount) {
        const res = await getEmployee(userAccount.employeeId as string);
        console.log(res);

        setEmployee(res);
      }
    };

    fetchEmployeeDetail();
  }, [userAccount]);

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={employee?.avatarUrl} alt={employee?.email} />
                    <AvatarFallback className="rounded-lg">
                      {employee?.fullname
                        ? employee.fullname
                            .split(' ') // Tách thành mảng ["Nguyễn", "Minh", "Thông"]
                            .map((word) => word[0]?.toUpperCase()) // Lấy ký tự đầu rồi viết hoa
                            .join('') // Ghép lại đi
                        : 'AR'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{employee?.fullname ? employee.fullname : 'Alexander Rio'}</span>
                    <span className="truncate text-xs">{employee?.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? 'bottom' : 'right'}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={employee?.avatarUrl} alt={employee?.email} />
                      <AvatarFallback className="rounded-lg">
                        {employee?.fullname
                          ? employee.fullname
                              .split(' ') // Tách thành mảng ["Nguyễn", "Minh", "Thông"]
                              .map((word) => word[0]?.toUpperCase()) // Lấy ký tự đầu rồi viết hoa
                              .join('') // Ghép lại đi
                          : 'AR'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{employee?.fullname ? employee.fullname : 'Alexander Rio'}</span>
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
                <DropdownMenuItem>
                  <LogOut />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
