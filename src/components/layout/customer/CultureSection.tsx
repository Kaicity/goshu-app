import { Check } from 'lucide-react';
import Image from 'next/image';

const values = ['Môi trường làm việc hòa nhập', 'Lộ trình phát triển rõ ràng', 'Văn hóa minh bạch & cởi mở'];

export default function CultureSection() {
  return (
    <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 lg:grid-cols-2">
      {/* Left Images */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-3xl shadow-lg">
            <Image
              src="https://images.pexels.com/photos/7430340/pexels-photo-7430340.jpeg"
              alt="team"
              width={400}
              height={500}
              className="h-[240px] w-full object-cover"
            />
          </div>

          <div className="overflow-hidden rounded-3xl shadow-lg">
            <Image
              src="https://images.pexels.com/photos/15030654/pexels-photo-15030654.jpeg"
              alt="office"
              width={400}
              height={500}
              className="h-[220px] w-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-4 pt-10">
          <div className="overflow-hidden rounded-3xl shadow-lg">
            <Image
              src="https://images.pexels.com/photos/6814534/pexels-photo-6814534.jpeg"
              alt="workspace"
              width={400}
              height={500}
              className="h-[220px] w-full object-cover"
            />
          </div>

          <div className="overflow-hidden rounded-3xl shadow-lg">
            <Image
              src="https://images.pexels.com/photos/7710200/pexels-photo-7710200.jpeg"
              alt="culture"
              width={400}
              height={500}
              className="h-[240px] w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div>
        <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">Văn hóa doanh nghiệp</span>

        <h2 className="mt-6 text-4xl font-bold leading-tight">Văn hóa & Sứ mệnh của chúng tôi</h2>

        <p className="mt-6 text-muted-foreground leading-8">
          Chúng tôi không chỉ xây dựng sản phẩm công nghệ mà còn tạo ra môi trường giúp mỗi cá nhân phát triển sự nghiệp bền vững.
          Mọi ý tưởng đều được lắng nghe và mọi thành viên đều có cơ hội tạo ra giá trị thực sự.
        </p>

        <p className="mt-4 text-muted-foreground leading-8">
          Với tinh thần đổi mới, minh bạch và hợp tác toàn cầu, chúng tôi luôn hướng tới việc xây dựng một đội ngũ năng động, sáng
          tạo và không ngừng học hỏi.
        </p>

        {/* Values */}
        <div className="mt-10 space-y-5">
          {values.map((item) => (
            <div key={item} className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check size={18} />
              </div>

              <span className="font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
