'use client';

import { useRef, useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    text: 'The team at Saabri Aziz Properties made the entire buying process in Dubai smooth and stress-free. Clear communication and genuine advice throughout.',
    author: 'Property Buyer, Dubai'
  },
  {
    id: 2,
    text: 'They focus on understanding your requirement first, not just selling a unit. That honesty builds confidence.',
    author: 'Real Estate Investor'
  },
  {
    id: 3,
    text: 'Professional, responsive, and well-informed. From property options to paperwork, everything was handled efficiently.',
    author: 'NRI Client'
  },
  {
    id: 4,
    text: 'A brokerage you can trust—transparent, ethical, and supportive at every step.',
    author: 'Client Review'
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
            What Our Clients Say
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
        <div ref={scrollRef} className="flex gap-4 md:gap-6 lg:gap-10 items-stretch w-full overflow-x-auto scrollbar-hide pl-4 md:pl-8 lg:pl-[80px]">
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
              className={`flex flex-col gap-4 md:gap-6 lg:gap-8 w-[320px] md:w-[400px] lg:w-[500px] shrink-0 rounded-[16px] bg-white border border-[#E5E7EB] p-6 md:p-8 lg:p-10 transition-all duration-700 ease-out hover:scale-[1.02] hover:shadow-lg ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Quote Icon */}
              <div className="flex items-start">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#f58634] opacity-20">
                  <path d="M12 10C10.3431 10 9 11.3431 9 13V17C9 18.6569 10.3431 20 12 20H16C17.6569 20 19 18.6569 19 17V13C19 11.3431 17.6569 10 16 10H12Z" fill="currentColor"/>
                  <path d="M23 10C21.3431 10 20 11.3431 20 13V17C20 18.6569 21.3431 20 23 20H27C28.6569 20 30 18.6569 30 17V13C30 11.3431 28.6569 10 27 10H23Z" fill="currentColor"/>
                </svg>
              </div>

              {/* Testimonial Text */}
              <p className="font-normal text-[#1b2021] text-base md:text-lg lg:text-xl leading-[1.6] font-poppins grow">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="pt-2 border-t border-[#E5E7EB]">
                <p className="font-medium text-[#f58634] text-sm md:text-base tracking-[0.16px] font-poppins">
                  — {testimonial.author}
                </p>
              </div>
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

