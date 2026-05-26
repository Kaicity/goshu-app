'use client';

const Banner = () => {
  return (
    <div className="w-full relative h-[80vh]">
      {/* Video */}
      <video
        className="w-full h-full object-cover"
        muted
        autoPlay
        playsInline
        preload="auto"
        src="https://www.pexels.com/vi-vn/download/video/3249672/"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 space-y-4 px-5">
        <h4 className="font-semibold text-lg md:text-4xl">ITMIX GROUP</h4>

        <p className="text-sm text-center max-w-xl">
          Không có gì hoàn hảo hơn là sự chính trực và cách tạo ra giá trị sản phẩm cốt lõi
        </p>
      </div>
    </div>
  );
};

export default Banner;
