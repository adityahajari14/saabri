'use client';

import { useRef, useState, useEffect } from 'react';
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
      // Responsive scroll amount based on viewport
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      const scrollAmount = isMobile ? 360 : isTablet ? 460 : 530; // card width + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="bg-white py-8 md:py-12 lg:py-[70px]">
      <div className="flex flex-col gap-8 md:gap-12 lg:gap-[55px] items-start">
        {/* Header with Navigation */}
        <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-4 md:px-8 lg:px-[80px]">
          <h2 className="font-medium text-[#12161D] font-noto-sans text-2xl md:text-3xl lg:text-5xl leading-[1.2] md:leading-[52px] max-w-3xl">
            Some people are very Satisfied buying a house here
          </h2>
          <div className="hidden md:flex gap-3">
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
        <div ref={scrollRef} className="flex gap-4 md:gap-6 lg:gap-10 items-start w-full overflow-x-auto scrollbar-hide pl-4 md:pl-8 lg:pl-[80px]">
          {testimonials.map((testimonial, index) => {
            const [isVisible, setIsVisible] = useState(false);
            const cardRef = useRef<HTMLDivElement>(null);

            useEffect(() => {
              const observer = new IntersectionObserver(
                ([entry]) => {
                  if (entry.isIntersecting) {
                    setIsVisible(true);
                  }
                },
                { threshold: 0.1 }
              );

              if (cardRef.current) {
                observer.observe(cardRef.current);
              }

              return () => {
                if (cardRef.current) {
                  observer.unobserve(cardRef.current);
                }
              };
            }, []);

            return (
            <div
              key={testimonial.id}
              ref={cardRef}
              className={`flex flex-col gap-4 md:gap-6 lg:gap-8 h-[400px] md:h-[420px] lg:h-[450px] w-[320px] md:w-[400px] lg:w-[500px] shrink-0 rounded-[16px] transition-all duration-700 ease-out hover:scale-[1.02] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image Container */}
              <div className="relative w-full h-[280px] md:h-[300px] lg:h-[350px] rounded-[16px] overflow-hidden">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover object-center"
                />
                
                {/* Name Overlay */}
                <div className="absolute bottom-0 left-0 bg-white p-3 md:p-4">
                  <p className="font-medium text-[#f58634] text-sm md:text-base tracking-[0.16px] font-poppins">
                    {testimonial.name}
                  </p>
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="font-normal text-[#1b2021] text-lg md:text-xl lg:text-2xl tracking-[0.24px] font-poppins whitespace-pre-line">
                {testimonial.text}
              </p>
            </div>
            );
          })}
          {/* Right spacer to match left padding */}
          <div className="shrink-0 w-4 md:w-8 lg:w-[80px] h-px" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

