'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ShoppingBag, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { label: 'Về Công Ty', href: '/' },
  { label: 'Tìm việc', href: '/jobs' },
  { label: 'Dịch Vụ', href: '/services' },
  { label: 'Tin Tức', href: '/news' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Reset state khi đổi route
  useEffect(() => {
    setScrolled(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  const isHome = pathname === '/';

  return (
    <header className={cn('fixed top-0 left-0 w-full z-50 py-2 transition-all duration-300 bg-white shadow-md')}>
      <div className="mx-auto px-12 h-12 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold cursor-pointer text-primary">
          Kingree Luxe
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {/* Dynamic menu */}
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn('relative transition', !isActive(item.href) && 'hover:border-b-2 hover:border-primary')}
            >
              {item.label}

              {/* underline active */}
              {isActive(item.href) && <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-primary" />}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <ShoppingBag className={cn('w-5 h-5 cursor-pointer', scrolled || !isHome ? 'text-black' : 'text-white')} />
          <User className={cn('w-5 h-5 cursor-pointer', scrolled || !isHome ? 'text-black' : 'text-white')} />

          <Button className="rounded-full px-6 py-2 w-max">Đăng nhập</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
