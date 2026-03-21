export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden pt-32 pb-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/75a212ab82b6175c9862b125e0e23db8d369a58a"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Decorative Wave */}
      <div className="absolute left-0 right-0 top-[565px] h-[457px]">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/fcfb78098f858208139c057538930b525dde85bc?width=2882"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Team Photo with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/0659b6cd0bf330a4876464b5739189a54a46fbc8?width=2880"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-6">
        {/* Main Headline */}
        <div className="flex flex-col items-center gap-8 mb-8 pt-24">
          <div className="relative">
            <div className="absolute left-[469px] top-12 w-[260px] h-[65px] bg-brand-green -z-10"></div>
            <h2 className="text-[49px] font-semibold text-center leading-tight max-w-[873px]">
              <span className="text-[#3A3A3A]">Fill Job Roles in any Job Sector in Any Location </span>
              <span className="text-white">from £399</span>
            </h2>
          </div>

          {/* Email Signup Form */}
          <div className="w-full max-w-[873px] flex items-center justify-between gap-4 px-6 py-2 rounded-full border border-[rgba(10,10,10,0.05)] bg-[rgba(0,0,0,0.1)] backdrop-blur-sm">
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

        {/* Role Tags with Cursor Icons */}
        <div className="relative h-[400px] mt-32">
          {/* Advert Job Role */}
          <div className="absolute left-[149px] top-[300px]">
            <div className="relative">
              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-[206px] -top-1"
              >
                <path
                  d="M31.956 10.9787C32.4541 9.50863 31.0732 7.93429 29.4883 8.50327L29.027 8.66914C21.9723 11.204 15.1683 14.3884 8.70262 18.1816C7.16089 19.0859 7.63365 21.4268 9.36443 21.7122L16.5277 22.8959C17.2122 23.0084 17.7839 23.5752 17.9021 24.3263L19.0539 31.693C19.3177 33.3845 21.6361 34.0081 22.5545 32.3496C26.2507 25.6733 29.343 18.6801 31.7946 11.4533L31.956 10.9787Z"
                  fill="#FF474A"
                />
              </svg>
              <div className="inline-flex items-center gap-[6px] px-[6px] py-[6px] bg-[#FF474A] rounded-md ml-[22px] mt-[26px]">
                <span className="text-white text-[15px] font-semibold">Peter - Development Lead</span>
              </div>
            </div>
          </div>

          {/* Scrum Master */}
          <div className="absolute left-[712px] top-[122px]">
            <div className="relative">
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.4281 3.49997C9.13705 2.63835 7.25894 3.56474 7.39832 5.24292L7.43915 5.73146C8.06171 13.2018 9.37668 20.5981 11.3671 27.8253C11.8416 29.5485 14.2251 29.6977 14.9488 28.0998L17.9461 21.487C18.2319 20.8549 18.9274 20.4494 19.6834 20.5296L27.0973 21.3237C28.7994 21.5067 30.0018 19.4287 28.6375 18.1123C23.1453 12.8141 17.1908 8.01715 10.8448 3.77873L10.4281 3.49997Z"
                  fill="#4797FF"
                />
              </svg>
              <div className="inline-flex items-center gap-[6px] px-[6px] py-[6px] bg-[#4797FF] rounded-md ml-[22px] mt-[26px]">
                <span className="text-white text-[15px] font-semibold">Jesica - Scrum Master</span>
              </div>
            </div>
          </div>

          {/* Project Manager */}
          <div className="absolute left-[1041px] top-[248px]">
            <div className="relative">
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.4281 3.50003C9.13705 2.63841 7.25894 3.5648 7.39832 5.24298L7.43915 5.73152C8.06171 13.2018 9.37668 20.5982 11.3671 27.8253C11.8416 29.5486 14.2251 29.6978 14.9488 28.0998L17.9461 21.4871C18.2319 20.8549 18.9274 20.4495 19.6834 20.5297L27.0973 21.3237C28.7994 21.5068 30.0018 19.4287 28.6375 18.1124C23.1453 12.8141 17.1908 8.01721 10.8448 3.77879L10.4281 3.50003Z"
                  fill="#9747FF"
                />
              </svg>
              <div className="inline-flex items-center gap-[6px] px-[6px] py-[6px] bg-[#9747FF] rounded-md ml-[22px] mt-[26px]">
                <span className="text-white text-[15px] font-semibold">Josh - Project Manager</span>
              </div>
            </div>
          </div>

          {/* Production Manager */}
          <div className="absolute left-[440px] top-[350px]">
            <div className="relative">
              <div className="inline-flex items-center gap-[6px] px-[6px] py-[6px] bg-[#FF47F3] rounded-md">
                <span className="text-white text-[15px] font-semibold">Jacline - Production Manager</span>
              </div>
              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-[212px] top-0"
              >
                <path
                  d="M31.956 10.9787C32.4541 9.50863 31.0732 7.93429 29.4883 8.50327L29.027 8.66914C21.9723 11.204 15.1683 14.3884 8.70262 18.1816C7.16089 19.0859 7.63365 21.4268 9.36443 21.7122L16.5277 22.8959C17.2122 23.0084 17.7839 23.5752 17.9021 24.3263L19.0539 31.693C19.3177 33.3845 21.6361 34.0081 22.5545 32.3496C26.2507 25.6733 29.343 18.6801 31.7946 11.4533L31.956 10.9787Z"
                  fill="#FF47F3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
