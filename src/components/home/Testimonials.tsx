'use client';

import { useRef } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Jone Doe',
    text: 'I am very satisfied buying a house ere because it is fast and easy',
    image: '/home/testimonials/testiomonials-1.webp'
  },
  {
    id: 2,
    name: 'Angel Doe',
    text: 'Buying a house here is very cheap and high quality',
    image: '/home/testimonials/testimonials-2.webp'
  },
  {
    id: 3,
    name: 'Angel Doe',
    text: 'Buying a house here is very cheap and high quality',
    image: '/home/testimonials/testimonials-2.webp'
  }
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 530; // card width (500px) + gap (30px)
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="bg-white py-[70px]">
      <div className="flex flex-col gap-[55px] items-start">
        {/* Header with Navigation */}
        <div className="w-full flex items-center justify-between px-[80px]">
          <h2 className="w-3xl font-medium text-[#12161D] font-noto-sans text-5xl leading-[52px]">
            Some people are very Satisfied buying a house here
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="w-10 h-10 rounded-full border border-[#12161D] flex items-center justify-center hover:bg-[#12161D] hover:text-white transition-all duration-300"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="w-10 h-10 rounded-full border border-[#12161D] flex items-center justify-center hover:bg-[#12161D] hover:text-white transition-all duration-300"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Testimonials Horizontal Scroll - Left padding, right spacer for gap */}
        <div ref={scrollRef} className="flex gap-10 items-start w-full overflow-x-auto scrollbar-hide pl-[80px]">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col gap-8 h-[450px] w-[500px] shrink-0 rounded-[16px]"
            >
              {/* Image Container */}
              <div className="relative w-full h-[350px] rounded-[16px] overflow-hidden">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover object-center"
                />
                
                {/* Name Overlay */}
                <div className="absolute bottom-0 left-0 bg-white p-4">
                  <p className="font-medium text-[#f58634] text-base tracking-[0.16px] font-poppins">
                    {testimonial.name}
                  </p>
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="w-sm font-normal text-[#1b2021] text-2xl tracking-[0.24px] font-poppins whitespace-pre-line">
                {testimonial.text}
              </p>
            </div>
          ))}
          {/* Right spacer to match left padding */}
          <div className="shrink-0 w-[80px] h-px" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

