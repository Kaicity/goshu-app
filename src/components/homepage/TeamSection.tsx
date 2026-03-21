export function TeamSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1242px] mx-auto px-6">
        <div className="flex flex-col items-center gap-10">
          {/* Section Header */}
          <div className="flex flex-col items-center justify-center gap-8 max-w-[560px]">
            <h3 className="text-2xl font-semibold text-[#3A3A3A] text-center capitalize">Meet Our Team</h3>
            <p className="text-sm font-light text-[#3A3A3A] text-center capitalize line-clamp-3">
              Our dedicated team is always on hand to help your business succeed. We aim to fill your roles quickly and efficiently.
            </p>
          </div>

          {/* Team Cards */}
          <div className="flex items-center justify-center gap-4">
            {/* Team Member 1 */}
            <div
              className="flex flex-col items-start justify-end gap-6 rounded-xl bg-cover bg-center overflow-hidden w-full max-w-[403px] h-[458px]"
              style={{
                backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/bc5e74819f9cd014a124f7798f0b0831031bd805?width=807')"
              }}
            >
              <div className="flex flex-col items-start justify-end gap-6 p-6 h-[284px] w-full bg-gradient-to-t from-brand-light-bg from-62.5% to-transparent">
                <div className="flex flex-col items-start gap-3 w-full">
                  <h4 className="text-2xl font-semibold text-[#3A3A3A] capitalize">Alma Marquardt</h4>
                  <p className="text-base font-semibold text-brand-green capitalize"> Founder & Managing Director</p>
                </div>
                <p className="text-sm font-light text-[#3A3A3A] capitalize line-clamp-3">
                  Lorem ipsum dolor sit amet consectetur. Eget elit vel cras amet. Sit etiam nullam accumsan tincidunt odio vitae mattis fermentum in. Eget duis volutpat.
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div
              className="flex flex-col items-start justify-end gap-6 rounded-xl bg-cover bg-center overflow-hidden w-full max-w-[403px] h-[458px]"
              style={{
                backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/0b46e47e26234413ebfc8248ac792e8a2b17eab5?width=807')"
              }}
            >
              <div className="flex flex-col items-start justify-end gap-6 p-6 h-[284px] w-full bg-gradient-to-t from-brand-light-bg from-62.5% to-transparent">
                <div className="flex flex-col items-start gap-3 w-full">
                  <h4 className="text-2xl font-semibold text-[#3A3A3A] capitalize">Santos Lockman</h4>
                  <p className="text-base font-semibold text-brand-green capitalize">Head Recruiter</p>
                </div>
                <p className="text-sm font-light text-[#3A3A3A] capitalize line-clamp-3">
                  Lorem ipsum dolor sit amet consectetur. Eget elit vel cras amet. Sit etiam nullam accumsan tincidunt odio vitae mattis fermentum in. Eget duis volutpat.
                </p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div
              className="flex flex-col items-start justify-end gap-6 rounded-xl bg-cover bg-center overflow-hidden w-full max-w-[403px] h-[458px]"
              style={{
                backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/82b41a58e4a06cf929ac5e2a5da0e1d3e02a0f16?width=807')"
              }}
            >
              <div className="flex flex-col items-start justify-end gap-6 p-6 h-[284px] w-full bg-gradient-to-t from-brand-light-bg from-62.5% to-transparent">
                <div className="flex flex-col items-start gap-3 w-full">
                  <h4 className="text-2xl font-semibold text-[#3A3A3A] capitalize">Rita Holler</h4>
                  <p className="text-base font-semibold text-brand-green capitalize">Marketing Specialist</p>
                </div>
                <p className="text-sm font-light text-[#3A3A3A] capitalize line-clamp-3">
                  Lorem ipsum dolor sit amet consectetur. Eget elit vel cras amet. Sit etiam nullam accumsan tincidunt odio vitae mattis fermentum in. Eget duis volutpat.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button className="px-[51px] py-4 bg-brand-green text-white text-sm rounded-full hover:opacity-90 transition-opacity">
            View More
          </button>
        </div>
      </div>
    </section>
  );
}
