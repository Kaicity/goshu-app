import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative bg-white overflow-hidden">
      {/* CTA Section */}
      <div className="relative py-32 px-6">
        {/* Decorative Gradient Shapes */}
        <div className="absolute left-[-200px] bottom-0 pointer-events-none">
          <svg width="473" height="593" viewBox="0 0 473 593" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.0769 149.795C1.74969 130.217 14.4 111.981 33.553 107.304L424.749 11.782C449.311 5.78435 473 24.3848 473 49.6688L473 444.639C473 462.051 461.458 477.354 444.716 482.138L100.797 580.416C77.7027 587.016 54.1891 571.371 51.354 547.521L4.0769 149.795Z"
              stroke="url(#paint0_linear)"
              strokeWidth="74"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="484.262"
                y1="-42.696"
                x2="53.0734"
                y2="614.169"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#194174" />
                <stop offset="1" stopColor="#24C838" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="absolute right-[-200px] bottom-0 pointer-events-none">
          <svg width="473" height="593" viewBox="0 0 473 593" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.0769 149.795C1.74969 130.217 14.4 111.981 33.553 107.304L424.749 11.782C449.311 5.78435 473 24.3848 473 49.6688L473 444.639C473 462.051 461.458 477.354 444.716 482.138L100.797 580.416C77.7027 587.016 54.1891 571.371 51.354 547.521L4.0769 149.795Z"
              stroke="#194174"
              strokeWidth="74"
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-[761px] mx-auto">
          <div className="flex flex-col items-center justify-center gap-7">
            <div className="flex flex-col items-start gap-5 w-full">
              <h3 className="text-2xl font-semibold text-[#3A3A3A] text-center capitalize w-full">Fill Job Roles instantly!</h3>
              <p className="text-base font-normal text-[#3A3A3A] text-center capitalize w-full">
                Lorem ipsum dolor sit amet consectetur. Euismod faucibus tincidunt elementum cras mus amet fusce consectetur.
                Condimentum nisl proin.
              </p>
            </div>
            <div className="w-full flex items-center justify-between gap-4 px-6 py-2 rounded-full border border-[rgba(0,0,0,0.2)] bg-[rgba(255,255,255,0.1)] backdrop-blur-sm">
              <input
                type="email"
                placeholder="Your Email address"
                className="flex-1 bg-transparent border-none outline-none text-sm text-black placeholder:text-black"
              />
              <button className="px-16 py-4 bg-brand-dark-blue text-white text-sm rounded-full hover:opacity-90 transition-opacity whitespace-nowrap">
                Get Free Employer Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-black text-white py-12">
        <div className="max-w-[1240px] mx-auto px-6">
          {/* Logo and Description */}
          <div className="flex flex-col items-start gap-2.5 mb-12">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/0ca7a08c5df95f749f5ea301441cb7bc949b0cfb?width=262"
              alt="Talent Hunt"
              className="h-[17px]"
            />
            <p className="text-base font-normal text-white capitalize max-w-[416px]">
              Lorem ipsum dolor sit amet consectetur. Eget habitant luctus at urna vitae non nunc elementum.
            </p>
          </div>

          {/* Footer Navigation */}
          <div className="flex items-end gap-5 mb-12">
            <Link href="#about" className="text-base font-normal text-white capitalize hover:text-brand-green transition-colors">
              About
            </Link>
            <Link
              href="#how-it-works"
              className="text-base font-normal text-white capitalize hover:text-brand-green transition-colors"
            >
              How it works
            </Link>
            <Link
              href="#reviews"
              className="text-base font-normal text-white capitalize hover:text-brand-green transition-colors"
            >
              Reviews
            </Link>
            <Link
              href="#pricing"
              className="text-base font-normal text-white capitalize hover:text-brand-green transition-colors"
            >
              Pricing
            </Link>
            <Link href="#faqs" className="text-base font-normal text-white capitalize hover:text-brand-green transition-colors">
              FAQ's
            </Link>
            <Link href="#blog" className="text-base font-normal text-white capitalize hover:text-brand-green transition-colors">
              Blog
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 mb-12">
            <a href="#" className="hover:opacity-80 transition-opacity">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22.6666 17.5063V22.4357H19.8093V17.8357C19.8093 16.681 19.3959 15.893 18.3613 15.893C17.5719 15.893 17.1013 16.4237 16.8946 16.9383C16.8199 17.1223 16.7999 17.3783 16.7999 17.6343V22.4357H13.9413C13.9413 22.4357 13.9799 14.6463 13.9413 13.8397H16.7999V15.057L16.7813 15.085H16.7999V15.057C17.1799 14.4703 17.8573 13.637 19.3759 13.637C21.2559 13.637 22.6666 14.8663 22.6666 17.5063ZM10.9506 9.69434C9.97325 9.69434 9.33325 10.337 9.33325 11.1797C9.33325 12.0063 9.95459 12.6663 10.9133 12.6663H10.9319C11.9293 12.6663 12.5493 12.005 12.5493 11.1797C12.5306 10.337 11.9293 9.69434 10.9506 9.69434ZM9.50259 22.4357H12.3613V13.8397H9.50259V22.4357Z"
                  fill="#24C838"
                />
                <path
                  d="M7.99996 5.33317C7.29272 5.33317 6.61444 5.61412 6.11434 6.11422C5.61424 6.61432 5.33329 7.29259 5.33329 7.99984V23.9998C5.33329 24.7071 5.61424 25.3854 6.11434 25.8855C6.61444 26.3856 7.29272 26.6665 7.99996 26.6665H24C24.7072 26.6665 25.3855 26.3856 25.8856 25.8855C26.3857 25.3854 26.6666 24.7071 26.6666 23.9998V7.99984C26.6666 7.29259 26.3857 6.61432 25.8856 6.11422C25.3855 5.61412 24.7072 5.33317 24 5.33317H7.99996ZM7.99996 2.6665H24C25.4144 2.6665 26.771 3.22841 27.7712 4.2286C28.7714 5.2288 29.3333 6.58535 29.3333 7.99984V23.9998C29.3333 25.4143 28.7714 26.7709 27.7712 27.7711C26.771 28.7713 25.4144 29.3332 24 29.3332H7.99996C6.58547 29.3332 5.22892 28.7713 4.22872 27.7711C3.22853 26.7709 2.66663 25.4143 2.66663 23.9998V7.99984C2.66663 6.58535 3.22853 5.2288 4.22872 4.2286C5.22892 3.22841 6.58547 2.6665 7.99996 2.6665Z"
                  fill="#24C838"
                />
              </svg>
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.4 2.6665H21.6C25.8666 2.6665 29.3333 6.13317 29.3333 10.3998V21.5998C29.3333 23.6508 28.5185 25.6178 27.0683 27.0681C25.618 28.5184 23.651 29.3332 21.6 29.3332H10.4C6.13329 29.3332 2.66663 25.8665 2.66663 21.5998V10.3998C2.66663 8.34883 3.48139 6.38183 4.93167 4.93155C6.38195 3.48126 8.34895 2.6665 10.4 2.6665ZM10.1333 5.33317C8.86025 5.33317 7.63936 5.83888 6.73918 6.73906C5.83901 7.63923 5.33329 8.86013 5.33329 10.1332V21.8665C5.33329 24.5198 7.47996 26.6665 10.1333 26.6665H21.8666C23.1397 26.6665 24.3606 26.1608 25.2607 25.2606C26.1609 24.3604 26.6666 23.1395 26.6666 21.8665V10.1332C26.6666 7.47984 24.52 5.33317 21.8666 5.33317H10.1333ZM23 7.33317C23.442 7.33317 23.8659 7.50877 24.1785 7.82133C24.491 8.13389 24.6666 8.55781 24.6666 8.99984C24.6666 9.44186 24.491 9.86579 24.1785 10.1783C23.8659 10.4909 23.442 10.6665 23 10.6665C22.5579 10.6665 22.134 10.4909 21.8214 10.1783C21.5089 9.86579 21.3333 9.44186 21.3333 8.99984C21.3333 8.55781 21.5089 8.13389 21.8214 7.82133C22.134 7.50877 22.5579 7.33317 23 7.33317ZM16 9.33317C17.7681 9.33317 19.4638 10.0355 20.714 11.2858C21.9642 12.536 22.6666 14.2317 22.6666 15.9998C22.6666 17.7679 21.9642 19.4636 20.714 20.7139C19.4638 21.9641 17.7681 22.6665 16 22.6665C14.2318 22.6665 12.5362 21.9641 11.2859 20.7139C10.0357 19.4636 9.33329 17.7679 9.33329 15.9998C9.33329 14.2317 10.0357 12.536 11.2859 11.2858C12.5362 10.0355 14.2318 9.33317 16 9.33317ZM16 11.9998C14.9391 11.9998 13.9217 12.4213 13.1715 13.1714C12.4214 13.9216 12 14.939 12 15.9998C12 17.0607 12.4214 18.0781 13.1715 18.8283C13.9217 19.5784 14.9391 19.9998 16 19.9998C17.0608 19.9998 18.0782 19.5784 18.8284 18.8283C19.5785 18.0781 20 17.0607 20 15.9998C20 14.939 19.5785 13.9216 18.8284 13.1714C18.0782 12.4213 17.0608 11.9998 16 11.9998Z"
                  fill="#24C838"
                />
              </svg>
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.33329 15.9998C5.33348 13.9471 5.92598 11.938 7.03968 10.2137C8.15338 8.48933 9.74097 7.12296 11.612 6.27852C13.483 5.43408 15.5579 5.14744 17.5877 5.453C19.6176 5.75856 21.5162 6.64334 23.0557 8.00116C24.5952 9.35899 25.7101 11.1322 26.2669 13.108C26.8236 15.0838 26.7983 17.1782 26.1942 19.1401C25.5901 21.1019 24.4327 22.8477 22.861 24.1681C21.2893 25.4884 19.3699 26.3272 17.3333 26.5838V18.6665H20C20.3536 18.6665 20.6927 18.526 20.9428 18.276C21.1928 18.0259 21.3333 17.6868 21.3333 17.3332C21.3333 16.9795 21.1928 16.6404 20.9428 16.3904C20.6927 16.1403 20.3536 15.9998 20 15.9998H17.3333V13.3332C17.3333 12.9795 17.4738 12.6404 17.7238 12.3904C17.9739 12.1403 18.313 11.9998 18.6666 11.9998H19.3333C19.6869 11.9998 20.0261 11.8594 20.2761 11.6093C20.5261 11.3593 20.6666 11.0201 20.6666 10.6665C20.6666 10.3129 20.5261 9.97374 20.2761 9.7237C20.0261 9.47365 19.6869 9.33317 19.3333 9.33317H18.6666C17.6058 9.33317 16.5883 9.7546 15.8382 10.5047C15.0881 11.2549 14.6666 12.2723 14.6666 13.3332V15.9998H12C11.6463 15.9998 11.3072 16.1403 11.0572 16.3904C10.8071 16.6404 10.6666 16.9795 10.6666 17.3332C10.6666 17.6868 10.8071 18.0259 11.0572 18.276C11.3072 18.526 11.6463 18.6665 12 18.6665H14.6666V26.5838C12.0888 26.2591 9.71811 25.0045 7.99963 23.0558C6.28116 21.107 5.33305 18.5981 5.33329 15.9998ZM16 29.3332C23.364 29.3332 29.3333 23.3638 29.3333 15.9998C29.3333 8.63584 23.364 2.6665 16 2.6665C8.63596 2.6665 2.66663 8.63584 2.66663 15.9998C2.66663 23.3638 8.63596 29.3332 16 29.3332Z"
                  fill="#24C838"
                />
              </svg>
            </a>
          </div>

          {/* Bottom Bar */}
          <div className="flex items-center justify-between pt-8 border-t border-white/10">
            <p className="text-xs font-normal text-white capitalize">© 2016 - 2020 Talentfinderuk.co.uk. All rights reserved.</p>
            <p className="text-xs font-normal text-white capitalize">Privacy Policy | Terms & Conditions</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
