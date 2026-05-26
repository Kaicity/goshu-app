'use client';

import Banner from '@/components/layout/customer/Banner';
import BlogWrapper from '@/components/layout/customer/BlogWrapper';
import CompanyStats from '@/components/layout/customer/CompanyStats';
import CultureSection from '@/components/layout/customer/CultureSection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { fadeInFramer } from '@/utils/fadeInFramer';
import { motion } from 'framer-motion';
import { BirdIcon } from 'lucide-react';
import Image from 'next/image';

const CarrerPage = () => {
  return (
    <div>
      <Banner />
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 py-24 space-y-24">
        <section>
          <div className="md:w-11/12 mx-auto flex flex-col md:flex-row md:justify-between items-center gap-12">
            <motion.div
              className="md:w-3/5 mx-auto"
              variants={fadeInFramer('up', 0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
            >
              <Badge className="bg-primary/10 py-2 px-3 rounded-full text-primary font-bold text-sm mb-2">
                <span>
                  <BirdIcon className="w-4 h-4" />
                </span>
                CHÚNG TÔI ĐANG TUYỂN DỤNG
              </Badge>

              <h2 className="text-4xl font-semibold text-neutralDGrey mb-4">Gia nhập cùng chúng tôi</h2>

              <p className="text-neutralGrey text-sm leading-7 mb-8">
                Chúng tôi đang xây dựng tương lai của ngành tuyển dụng nhân tài. Hãy gia nhập đội ngũ phát triển nhanh chóng của
                chúng tôi, nơi sự đổi mới, văn hóa và sự phát triển cá nhân là trọng tâm trong mọi hoạt động.
              </p>

              <div className="flex items-center gap-2">
                <Button>Các vị trí đang mở</Button>
                <Button variant="outline">Ứng tuyển ngay</Button>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInFramer('up', 0.5)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
            >
              <Image
                src="/assets/backgroundLoginLayout.jpg"
                alt="banner"
                width={600}
                height={600}
                className="w-full rounded-xl shadow-lg"
              />
            </motion.div>
          </div>
        </section>

        <section className="space-y-4 text-center">
          <CompanyStats />
        </section>

        <section>
          <CultureSection />
        </section>

        <section>
          <BlogWrapper />
        </section>

        <section>
          <div className="px-4 lg:px-14">
            <motion.div
              className="bg-primary/80 w-full h-80 flex items-center justify-center rounded-3xl"
              variants={fadeInFramer('up', 0.6)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
            >
              <div className="text-center md:w-1/2 mx-auto text-white space-y-6">
                <h2 className="text-4xl font-bold mb-4">Bắt đầu sự nghiệp cùng ITMIX</h2>
                <p className="max-w-2xl leading-7">Những kỉ niệm cùng công ty chúng tôi</p>

                <div className="flex items-center gap-2 justify-center">
                  <Button variant="outline" className="text-primary">
                    Xem công việc phù hợp
                  </Button>
                  <Button className="" variant="default">
                    Tư vấn với HR
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CarrerPage;
