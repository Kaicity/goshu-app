'use client';

import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { fadeInFramer } from '@/utils/fadeInFramer';

const stats = [
  {
    value: 250,
    suffix: '+',
    label: 'NHÂN VIÊN TOÀN CẦU',
  },
  {
    value: 15,
    suffix: '+',
    label: 'QUỐC GIA HOẠT ĐỘNG',
  },
  {
    value: 40,
    suffix: '+',
    label: 'VỊ TRÍ ĐANG TUYỂN',
  },
];

export default function CompanyStats() {
  return (
    <div className="mx-auto max-w-6xl px-4 space-y-4">
      <motion.div variants={fadeInFramer('up', 0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}>
        <h2 className="text-4xl font-bold">Đội ngũ đang phát triển toàn cầu</h2>

        <p className="mx-auto max-w-2xl text-muted-foreground leading-7">
          Chúng tôi đang xây dựng một môi trường làm việc hiện đại, nơi các tài năng có thể phát triển sự nghiệp bền vững.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 overflow-hidden rounded-3xl border bg-white shadow-sm md:grid-cols-3">
        {stats.map((item, index) => (
          <div
            key={item.label}
            className={`
                flex flex-col items-center justify-center py-10 text-center
                ${index !== stats.length - 1 ? 'border-b md:border-b-0 md:border-r' : ''}
              `}
          >
            {/* Number */}
            <h2 className="text-4xl font-bold tracking-tight text-primary">
              <CountUp end={item.value} duration={2.5} enableScrollSpy scrollSpyOnce />
              {item.suffix}
            </h2>

            {/* Label */}
            <p className="mt-3 text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
