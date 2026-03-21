import Link from 'next/link';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="max-w-[1440px] mx-auto px-[100px] py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-[39px] font-semibold leading-none">
              <span className="text-[#194174]">Talent </span>
              <span className="text-brand-green">Hunt</span>
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-4">
            <Link href="#about" className="px-2.5 py-2.5 text-sm text-[#3A3A3A] hover:text-brand-green transition-colors">
              About
            </Link>
            <Link href="#how-it-works" className="px-2.5 py-2.5 text-sm text-[#3A3A3A] hover:text-brand-green transition-colors">
              How it works
            </Link>
            <Link href="#reviews" className="px-2.5 py-2.5 text-sm text-[#3A3A3A] hover:text-brand-green transition-colors">
              Reviews
            </Link>
            <Link href="#pricing" className="px-2.5 py-2.5 text-sm text-[#3A3A3A] hover:text-brand-green transition-colors">
              Pricing
            </Link>
            <Link href="#faqs" className="px-2.5 py-2.5 text-sm text-[#3A3A3A] hover:text-brand-green transition-colors">
              FAQs
            </Link>
            <div className="flex items-center gap-2 px-2.5 py-2.5 text-sm text-[#3A3A3A]">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.965 8.0925C6.045 10.215 7.785 11.9475 9.9075 13.035L11.5575 11.385C11.76 11.1825 12.06 11.115 12.3225 11.205C13.1625 11.4825 14.07 11.6325 15 11.6325C15.4125 11.6325 15.75 11.97 15.75 12.3825V15C15.75 15.4125 15.4125 15.75 15 15.75C7.9575 15.75 2.25 10.0425 2.25 3C2.25 2.5875 2.5875 2.25 3 2.25H5.625C6.0375 2.25 6.375 2.5875 6.375 3C6.375 3.9375 6.525 4.8375 6.8025 5.6775C6.885 5.94 6.825 6.2325 6.615 6.4425L4.965 8.0925Z"
                  fill="#3D3D3D"
                />
              </svg>
              <span>0100 000 2000</span>
            </div>
            <Link href="#blog" className="px-2.5 py-2.5 text-sm text-[#3A3A3A] hover:text-brand-green transition-colors">
              Blog
            </Link>
            <Link href="#employers" className="px-2.5 py-2.5 text-sm text-[#3A3A3A] hover:text-brand-green transition-colors">
              Employers
            </Link>
            <Link href="#partnership" className="px-2.5 py-2.5 text-sm text-[#3A3A3A] hover:text-brand-green transition-colors">
              Partnership
            </Link>
            <Link
              href="#client-login"
              className="px-3 py-2 text-sm text-[#3A3A3A] border border-[rgba(58,58,58,0.1)] rounded-3xl hover:border-brand-green hover:text-brand-green transition-colors"
            >
              Client Login
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
