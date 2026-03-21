export function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-[1097px] mx-auto px-6">
        <div className="flex flex-col items-center gap-10">
          {/* Section Header */}
          <div className="flex flex-col items-center gap-3 max-w-[694px]">
            <h3 className="text-2xl font-semibold text-[#3A3A3A] text-center capitalize">
              Simple Plans for Everyone!
            </h3>
            <p className="text-sm font-light text-[#3A3A3A] text-center capitalize">
              Choose a plan that works best for youNo contracts. No commissions. Low-cost, one-off payment.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="flex items-end gap-[34px] w-full">
            {/* Standard Plan */}
            <div className="flex flex-col items-start gap-[33px] p-[38px_26px] rounded-3xl bg-brand-dark-blue flex-1">
              <div className="flex items-end justify-between w-full">
                <h4 className="text-2xl font-semibold text-white">Standard</h4>
                <div className="text-[40px] font-semibold text-white">£ 399</div>
              </div>
              <p className="text-base font-normal text-[#B5B5B5] leading-[160%] capitalize">
                Lorem ipsum dolor sit amet consectetur.
                <br />
                Rutrum bibendum laoreet dictum turpis.
                <br />
                Non faucibus maecenas rhoncus pellentesque lacinia pellentesque purus quis vitae.
              </p>
              <button className="px-[51px] py-4 bg-brand-green text-white text-sm rounded-full hover:opacity-90 transition-opacity w-full">
                GET STARTED
              </button>
            </div>

            {/* Premium Plan - Recommended */}
            <div className="flex flex-col items-start justify-between gap-0 p-[38px_26px] rounded-3xl bg-brand-green flex-1 h-[473px] overflow-hidden">
              <div className="flex items-end justify-between w-full">
                <div className="flex flex-col items-start gap-2">
                  <div className="px-2 py-1.5 bg-white">
                    <span className="text-sm font-semibold text-black">Recommended</span>
                  </div>
                  <h4 className="text-2xl font-semibold text-black">Premium</h4>
                </div>
                <div className="text-[40px] font-semibold text-black">£ 499</div>
              </div>
              <p className="text-base font-normal text-[#3A3A3A] leading-[160%] capitalize">
                Lorem ipsum dolor sit amet consectetur.
                <br />
                Rutrum bibendum laoreet dictum turpis.
                <br />
                Non faucibus maecenas rhoncus pellentesque lacinia pellentesque purus quis vitae.
                <br />
                Lorem ipsum dolor sit amet consectetur.
                <br />
                Rutrum bibendum laoreet dictum turpis.
              </p>
              <button className="px-[51px] py-4 bg-brand-dark-blue text-white text-sm rounded-full hover:opacity-90 transition-opacity w-full">
                GET STARTED
              </button>
            </div>

            {/* Premium Plus Plan */}
            <div className="flex flex-col items-start gap-[33px] p-[38px_26px] rounded-3xl bg-brand-dark-blue flex-1">
              <div className="flex items-end justify-between w-full">
                <h4 className="text-2xl font-semibold text-white">Premium Plus</h4>
                <div className="text-[40px] font-semibold text-white">£ 599</div>
              </div>
              <p className="text-base font-normal text-[#B5B5B5] leading-[160%] capitalize">
                Lorem ipsum dolor sit amet consectetur.
                <br />
                Rutrum bibendum laoreet dictum turpis.
                <br />
                Non faucibus maecenas rhoncus pellentesque lacinia pellentesque purus quis vitae.
              </p>
              <button className="px-[51px] py-4 bg-brand-green text-white text-sm rounded-full hover:opacity-90 transition-opacity w-full">
                GET STARTED
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
