import React from 'react';
import { motion } from 'framer-motion';
import { fadeInFramer } from '@/utils/fadeInFramer';

function BlogWrapper() {
  const blogs = [
    {
      id: 1,
      title: 'Văn hóa công ty',
      url: 'https://images.pexels.com/photos/15030654/pexels-photo-15030654.jpeg',
    },
    {
      id: 2,
      title: 'Team Building tại ITMIX',
      url: 'https://images.pexels.com/photos/4078053/pexels-photo-4078053.jpeg',
    },
    {
      id: 3,
      title: 'Đào tạo chất lượng',
      url: 'https://images.pexels.com/photos/8761330/pexels-photo-8761330.jpeg',
    },
  ];

  return (
    <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto my-12 space-y-4">
      <motion.div
        className="text-center md:w-1/2 mx-auto"
        variants={fadeInFramer('up', 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className="text-4xl font-bold mb-4">Tin tức hoạt động</h2>
        <p className="mx-auto max-w-2xl text-muted-foreground leading-7">Những kỉ niệm cùng công ty chúng tôi</p>
      </motion.div>

      {/* Blogs */}
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 items-center justify-between">
        {blogs.map((blog) => (
          <motion.div
            key={blog.id}
            className="mx-auto relative mb-12 cursor-pointer"
            variants={fadeInFramer('up', 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            <img src={blog.url} alt="" className="hover:scale-95 transition-all duration-300" />
            <div className="text-center px-4 py-8 bg-white shadow-lg rounded-md md:w-3/4 mx-auto absolute left-0 right-0 -bottom-12">
              <h3 className="mb-3 text-neutralGrey font-semibold">{blog.title}</h3>
              <div className="flex items-center justify-center gap-8">
                <a href="" className="font-bold text-primary hover:text-neutral-700">
                  Đọc thêm
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default BlogWrapper;
