'use client';

import { useState } from 'react';

export function FAQSection() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      question: 'Lorem ipsum dolor sit amet consectetur. Amet et.',
      answer:
        'Lorem ipsum dolor sit amet consectetur. Porttitor in senectus vulputate tempor phasellus. Potenti at placerat duis felis bibendum pulvinar velit. Nascetur in at tellus pellentesque placerat egestas vulputate. Semper sagittis vestibulum tempor mauris lectus maecenas sed dignissim. Quam.',
    },
    {
      question: 'Lorem ipsum dolor sit amet consectetur. Amet et.',
      answer: 'Lorem ipsum dolor sit amet consectetur.',
    },
    {
      question: 'Lorem ipsum dolor sit amet consectetur. Eu eget.',
      answer: 'Lorem ipsum dolor sit amet consectetur.',
    },
    {
      question: 'Lorem ipsum dolor sit amet consectetur. Aliquet.',
      answer: 'Lorem ipsum dolor sit amet consectetur.',
    },
    {
      question: 'Lorem ipsum dolor sit amet consectetur. Arcu.',
      answer: 'Lorem ipsum dolor sit amet consectetur.',
    },
    {
      question: 'Lorem ipsum dolor sit amet consectetur. Volutpat.',
      answer: 'Lorem ipsum dolor sit amet consectetur.',
    },
  ];

  return (
    <section id="faqs" className="py-20 bg-white">
      <div className="max-w-[1242px] mx-auto px-6">
        <div className="flex items-start gap-[84px]">
          {/* Left Content */}
          <div className="flex flex-col items-start justify-center gap-12">
            <h3 className="text-2xl font-semibold text-[#3A3A3A] capitalize">Digital Marketing FAQs</h3>
            <p className="text-base font-light text-[#3A3A3A] capitalize max-w-[531px]">
              Lorem ipsum dolor sit amet consectetur. Nibh laoreet malesuada eget vitae in turpis sed. Suspendisse volutpat
              vestibulum maecenas nunc tortor. Enim faucibus amet mattis duis eu convallis dui fringilla.
            </p>
            <div className="flex items-center gap-12">
              <button className="px-[51px] py-4 bg-brand-green text-white text-sm rounded-full hover:opacity-90 transition-opacity">
                View More
              </button>
              <a href="#contact" className="text-base font-semibold text-[#3A3A3A] underline">
                Contanct Us
              </a>
            </div>
          </div>

          {/* Right Content - FAQs */}
          <div className="flex flex-col items-center w-full max-w-[627px]">
            {faqs.map((faq, index) => (
              <div key={index} className="flex flex-col items-start w-full border-b border-[#3A3A3A] bg-white">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="flex items-center justify-between w-full p-[26px_24px] text-left"
                >
                  <h4 className="text-lg font-semibold text-[#3A3A3A] capitalize max-w-[448px]">{faq.question}</h4>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform ${openFaq === index ? 'rotate-45' : ''}`}
                  >
                    <path d="M12 5V19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 12H19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-12">
                    <p className="text-base font-normal text-[#3A3A3A] leading-[160%] capitalize">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
