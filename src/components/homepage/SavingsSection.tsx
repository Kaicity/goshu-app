export function SavingsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="relative rounded-3xl bg-brand-dark-blue overflow-hidden h-[448px]">
          {/* Decorative Shape */}
          <div className="absolute left-[-185px] top-[-228px] pointer-events-none">
            <svg width="441" height="553" viewBox="0 0 441 553" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.07571 142.001C1.74913 122.424 14.3983 104.19 33.5501 99.5124L392.747 11.785C417.31 5.78591 441 24.3865 441 49.6714V412.664C441 430.075 429.459 445.377 412.718 450.162L96.9599 540.412C73.8646 547.014 50.3493 531.369 47.5146 507.517L4.07571 142.001Z"
                stroke="#194174"
                strokeWidth="74"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 flex items-center justify-between h-full p-[82px_0_82px_82px]">
            {/* Left Content */}
            <div className="flex flex-col items-start gap-7 max-w-[410px]">
              <h3 className="text-2xl font-semibold text-white w-[219px]">How much money you can save </h3>
              <p className="text-base font-normal text-white line-clamp-3">
                Lorem ipsum dolor sit amet consectetur. Fermentum dolor mauris amet congue egestas. Sodales eu turpis lacus etiam. Aliquam feugiat sit vitae pharetra. Est odio at lacus elit nunc amet mi. Pulvinar sed mi.
              </p>
              <button className="px-[51px] py-4 bg-brand-green text-white text-sm rounded-full hover:opacity-90 transition-opacity">
                Post a Job
              </button>
            </div>

            {/* Right Content - Cards Grid */}
            <div className="flex flex-wrap items-start content-start gap-3 w-[616px]">
              {/* £399 Card */}
              <div className="flex flex-col items-start justify-center gap-2.5 px-4 py-8 rounded-2xl border border-[rgba(242,242,242,0.1)] bg-[rgba(255,255,255,0.1)] backdrop-blur-xl w-[302px]">
                <div className="text-[28px] font-semibold text-white">£399</div>
                <div className="flex items-center h-2 pr-[16.5px] w-full">
                  <div className="relative w-full h-3">
                    <div className="absolute left-0 top-1 w-full h-1 rounded bg-[#D9D9D9]"></div>
                    <div className="absolute left-0 top-1 w-[107px] h-1 rounded bg-brand-green"></div>
                    <div className="absolute left-[101px] top-0 w-3 h-3 rounded-full bg-brand-green"></div>
                  </div>
                </div>
                <div className="text-base font-normal text-white">Annual salary for the position</div>
              </div>

              {/* 10 Card */}
              <div className="flex flex-col items-start justify-center gap-2.5 px-4 py-8 rounded-2xl border border-[rgba(242,242,242,0.1)] bg-[rgba(255,255,255,0.1)] backdrop-blur-xl w-[302px]">
                <div className="text-[28px] font-semibold text-white">10</div>
                <div className="flex items-center h-2 pr-[16.5px] w-full">
                  <div className="relative w-full h-3">
                    <div className="absolute left-0 top-1 w-full h-1 rounded bg-[#D9D9D9]"></div>
                    <div className="absolute left-0 top-1 w-[107px] h-1 rounded bg-brand-green"></div>
                    <div className="absolute left-[103px] top-0 w-3 h-3 rounded-full bg-brand-green"></div>
                  </div>
                </div>
                <div className="text-base font-normal text-white">People do you require</div>
              </div>

              {/* £1000 Card */}
              <div className="flex flex-col items-start justify-between p-6 rounded-xl bg-[#6F7987] w-[302px] h-[125px]">
                <div className="text-[28px] font-semibold text-white">£1000</div>
                <div className="text-base font-normal text-white">Recruitment Agency Fees</div>
              </div>

              {/* £299 Card */}
              <div className="flex flex-col items-start justify-between p-6 rounded-xl bg-brand-green w-[302px] h-[125px]">
                <div className="text-[28px] font-semibold text-white">£299</div>
                <div className="text-base font-normal text-white">Talent Finder Fees</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
