export function HowItWorksSection() {
  return (
    <section className="relative py-32 bg-brand-dark-blue overflow-hidden">
      {/* Decorative Gradient Shapes */}
      <div className="absolute left-[-200px] top-0 pointer-events-none">
        <svg width="441" height="553" viewBox="0 0 441 553" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4.07571 142.001C1.74913 122.424 14.3983 104.19 33.5501 99.5124L392.747 11.785C417.31 5.78591 441 24.3865 441 49.6714V412.664C441 430.075 429.459 445.377 412.718 450.162L96.9599 540.412C73.8646 547.014 50.3493 531.369 47.5146 507.517L4.07571 142.001Z"
            stroke="url(#paint0_linear)"
            strokeWidth="74"
          />
          <defs>
            <linearGradient id="paint0_linear" x1="451.5" y1="-39.816" x2="49.3624" y2="572.662" gradientUnits="userSpaceOnUse">
              <stop stopColor="#194174" />
              <stop offset="1" stopColor="#24C838" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute right-[-200px] top-0 pointer-events-none">
        <svg width="441" height="553" viewBox="0 0 441 553" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4.07571 142.001C1.74913 122.424 14.3983 104.19 33.5501 99.5124L392.747 11.785C417.31 5.78591 441 24.3865 441 49.6714V412.664C441 430.075 429.459 445.377 412.718 450.162L96.9599 540.412C73.8646 547.014 50.3493 531.369 47.5146 507.517L4.07571 142.001Z"
            stroke="#194174"
            strokeWidth="74"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-6">
        <div className="flex flex-col items-center gap-16">
          {/* Title */}
          <div className="flex flex-col items-center gap-3">
            <h3 className="text-2xl font-semibold text-white text-center capitalize">How it works</h3>
          </div>

          {/* Steps */}
          <div className="flex items-center justify-center gap-0">
            {/* Step 1 */}
            <div className="flex flex-col items-center justify-center gap-2.5 px-4 py-8 rounded-2xl border border-[rgba(242,242,242,0.1)] bg-[rgba(255,255,255,0.1)] backdrop-blur-xl w-[240px]">
              <div className="text-sm font-normal text-white text-center">Step 1</div>
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-green">
                <svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="31" rx="8" fill="#24C838" />
                  <path d="M23 11.1566L12.7143 21L8 16.4884L9.20857 15.3318L12.7143 18.6786L21.7914 10L23 11.1566Z" fill="white" />
                </svg>
              </div>
              <div className="text-base font-semibold text-white text-center w-[116px]">
                We write your job advert
              </div>
            </div>

            {/* Connector */}
            <div className="w-12 h-1 bg-brand-green"></div>

            {/* Step 2 */}
            <div className="flex flex-col items-center justify-center gap-2.5 px-4 py-8 rounded-2xl border border-[rgba(242,242,242,0.1)] bg-[rgba(255,255,255,0.1)] backdrop-blur-xl w-[240px]">
              <div className="text-sm font-normal text-white text-center">Step 2</div>
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#E0E5EF]">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.9582 0.510528C8.95834 1.7585 4.69107 3.46475 0.399198 5.04768C-0.136466 5.24565 -0.132365 5.97025 0.407401 6.12885C1.65455 6.49498 2.90662 6.87889 4.15896 7.26799C4.24017 7.29314 4.32822 7.28193 4.39986 7.23709C6.40197 5.98393 8.41967 4.69658 10.3778 3.47924C10.4792 3.41607 10.5897 3.55881 10.5016 3.63947C8.91076 5.09963 7.25674 6.6183 5.62732 8.11318C5.52287 8.20889 5.504 8.36639 5.58221 8.48533C6.63193 10.0819 7.6781 11.6865 8.65756 13.2626C8.90639 13.664 9.4951 13.58 9.67229 13.1234C11.2038 9.15717 12.8165 5.23088 13.9696 1.51869C14.1452 0.949395 13.5267 0.334434 12.9582 0.510528Z"
                    fill="#194174"
                  />
                  <path
                    d="M3.96484 8.50315C3.97469 9.61304 3.99492 10.7229 4.02527 11.8328C4.03949 12.3069 4.5984 12.5703 4.93418 12.2544C5.28527 11.9252 5.64047 11.593 5.99895 11.2589C6.1723 11.0973 6.20402 10.8296 6.0725 10.6272C5.57375 9.85995 5.06926 9.09241 4.56586 8.3287C4.38594 8.05581 3.96211 8.1794 3.96512 8.50315H3.96484Z"
                    fill="#194174"
                  />
                </svg>
              </div>
              <div className="text-base font-semibold text-white text-center w-[116px]">
                Post to major job boards
              </div>
            </div>

            {/* Connector */}
            <div className="w-12 h-1 bg-[#F2F2F2]"></div>

            {/* Step 3 */}
            <div className="flex flex-col items-center justify-center gap-2.5 px-4 py-8 rounded-2xl border border-[rgba(242,242,242,0.1)] bg-[rgba(255,255,255,0.1)] backdrop-blur-xl w-[240px]">
              <div className="text-sm font-normal text-white text-center">Step 3</div>
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#E0E5EF]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.00443 3.67191C4.89678 3.77956 4.8363 3.92557 4.8363 4.07781C4.8363 4.48569 5.25338 4.76596 5.65384 4.68854C5.91979 4.63713 6.19402 4.61017 6.4747 4.61017C8.88324 4.61017 10.8438 6.57071 10.8438 8.97924C10.8438 11.3878 8.88324 13.3483 6.4747 13.3483C6.12607 13.3483 5.77743 13.3076 5.4395 13.2235C5.27214 13.1818 5.0926 13.2229 4.97066 13.3449C4.88463 13.4309 4.8363 13.5476 4.8363 13.6692V13.7607C4.8363 14.1361 5.14056 14.4403 5.51588 14.4403H12.6667C13.7713 14.4403 14.6667 13.5449 14.6667 12.4403V3.33337C14.6667 2.2288 13.7713 1.33337 12.6667 1.33337H8.1714C7.64097 1.33337 7.13226 1.54409 6.75718 1.91916L5.00443 3.67191Z"
                    fill="#194174"
                  />
                  <path
                    d="M6.47471 12.256C8.28164 12.256 9.75151 10.7861 9.75151 8.97919C9.75151 7.17226 8.28164 5.70239 6.47471 5.70239C4.66777 5.70239 3.19791 7.17226 3.19791 8.97919C3.19791 9.82506 3.52297 10.5947 4.05097 11.1768L1.33337 13.8944L2.10564 14.6667L4.91311 11.8592C5.37764 12.1123 5.90964 12.256 6.47471 12.256ZM6.47471 6.79466C7.67924 6.79466 8.65924 7.77439 8.65924 8.97919C8.65924 10.184 7.67924 11.1637 6.47471 11.1637C5.27017 11.1637 4.29017 10.184 4.29017 8.97919C4.29017 7.77439 5.27017 6.79466 6.47471 6.79466Z"
                    fill="#194174"
                  />
                </svg>
              </div>
              <div className="text-base font-semibold text-white text-center w-[116px]">
                Review the Candidates
              </div>
            </div>

            {/* Connector */}
            <div className="w-12 h-1 bg-[#F2F2F2]"></div>

            {/* Step 4 */}
            <div className="flex flex-col items-center justify-center gap-2.5 px-4 py-8 rounded-2xl border border-[rgba(242,242,242,0.1)] bg-[rgba(255,255,255,0.1)] backdrop-blur-xl w-[240px]">
              <div className="text-sm font-normal text-white text-center">Step 4</div>
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#E0E5EF]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_14_496)">
                    <path
                      d="M15.8853 9.53659L14.8748 8.37162C15.6032 7.46044 16 6.33387 16 5.15625C16 2.31309 13.6869 0 10.8438 0C8.00056 0 5.6875 2.31309 5.6875 5.15625C5.6875 7.99941 8.00059 10.3125 10.8438 10.3125H15.5312C15.7148 10.3125 15.8815 10.2053 15.9577 10.0384C16.0339 9.87138 16.0056 9.67528 15.8853 9.53659ZM10.8438 8.34375C10.5849 8.34375 10.375 8.13387 10.375 7.875C10.375 7.61613 10.5849 7.40625 10.8438 7.40625C11.1026 7.40625 11.3125 7.61613 11.3125 7.875C11.3125 8.13387 11.1027 8.34375 10.8438 8.34375ZM12.1479 4.97378C11.9195 5.21434 11.6285 5.38562 11.3125 5.47144V6.45581C11.3125 6.71469 11.1027 6.92456 10.8438 6.92456C10.5849 6.92456 10.375 6.71469 10.375 6.45581V5.06547C10.375 4.80659 10.5849 4.59672 10.8438 4.59672C11.082 4.59672 11.3037 4.50138 11.4681 4.32828C11.6322 4.15534 11.7158 3.92847 11.7034 3.68944C11.6802 3.24191 11.3105 2.88422 10.8618 2.87519C10.8559 2.87506 10.85 2.875 10.8442 2.875C10.4156 2.875 10.0505 3.19034 9.99125 3.61522C9.98572 3.65478 9.98294 3.69537 9.98294 3.73587C9.98294 3.99475 9.77306 4.20463 9.51419 4.20463C9.25531 4.20463 9.04544 3.99475 9.04544 3.73587C9.04544 3.65219 9.05128 3.56803 9.06275 3.48566C9.18844 2.58494 9.971 1.91922 10.8807 1.93788C11.8184 1.95678 12.5911 2.70481 12.6397 3.64084C12.6655 4.13916 12.4909 4.61256 12.1479 4.97378Z"
                      fill="#194174"
                    />
                    <path
                      d="M6.71876 10.375H3.59376C3.33488 10.375 3.12501 10.1652 3.12501 9.90629C3.12501 9.64741 3.33488 9.43754 3.59376 9.43754H6.51232C5.54373 8.45769 4.90395 7.1521 4.7747 5.70166C2.10904 5.8976 8.02851e-06 8.12897 8.02851e-06 10.8438C8.02851e-06 12.0214 0.396852 13.1479 1.12523 14.0592L0.114664 15.2241C-0.00561697 15.3628 -0.0338982 15.5589 0.0423205 15.7259C0.118539 15.8929 0.285196 16 0.468758 16H5.15626C7.8711 16 10.1024 13.891 10.2984 11.2253C9.13176 11.1214 8.05895 10.687 7.17379 10.0171C7.12395 10.2224 6.93941 10.375 6.71876 10.375ZM6.71876 12.25H3.59376C3.33488 12.25 3.12501 12.0402 3.12501 11.7813C3.12501 11.5224 3.33488 11.3125 3.59376 11.3125H6.71876C6.97763 11.3125 7.18751 11.5224 7.18751 11.7813C7.18751 12.0402 6.97763 12.25 6.71876 12.25Z"
                      fill="#194174"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_14_496">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="text-base font-semibold text-white text-center w-[116px]">
                Arrange an interview
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button className="px-[51px] py-4 bg-brand-green text-white text-sm rounded-full hover:opacity-90 transition-opacity">
            Post a Job
          </button>
        </div>
      </div>
    </section>
  );
}
