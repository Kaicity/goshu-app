"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  humanManageitems,
  systemsManageItems,
} from "@/constants/nav-link/nav-link-items";
import { findBreadcrumbPath } from "@/helpers/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppBreadcrumb() {
  const pathname = usePathname();

  const items = [...humanManageitems, ...systemsManageItems];
  const pathItems = findBreadcrumbPath(items, pathname);

  if (pathItems.length === 0) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Trang chủ</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathItems.map((item, index) => (
          <div key={item.url} className="flex items-center">
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {index === pathItems.length - 1 ? (
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.url}>{item.title}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
