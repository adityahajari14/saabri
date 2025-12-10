'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const featuredAreas = [
  {
    id: 1,
    name: 'Downtown Dubai',
    description: 'Iconic luxury investments',
    image: '/home/featured-areas/downtown-dubai.webp',
  },
  {
    id: 2,
    name: 'Business Bay',
    description: 'Smart returns and capital appreciation',
    image: '/home/featured-areas/business-bay.webp',
  },
  {
    id: 3,
    name: 'Dubai Hills Estate',
    description: 'Modern villas with growth potential',
    image: '/home/featured-areas/dubai-hills-estate.webp',
  },
  {
    id: 4,
    name: 'Dubai South',
    description: 'Future-growth hub near Expo City',
    image: '/home/featured-areas/dubai-south.webp',
  }
];

export default function FeaturedAreas() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      // Responsive scroll amount based on viewport
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      const scrollAmount = isMobile ? 304 : isTablet ? 346 : 377; // card width + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="bg-white py-8 md:py-12 lg:py-[62px]">
      <div className="flex flex-col gap-8 md:gap-12 lg:gap-[55px] items-start">
        {/* Header with Navigation */}
        <div className="w-full flex items-center justify-between px-4 md:px-8 lg:px-[80px]">
          <h2 className="font-medium text-[#12161D] font-noto-sans text-2xl md:text-3xl lg:text-5xl leading-[1.2] md:leading-[52px]">
            Featured Areas
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
        
        {/* Cards Horizontal Scroll - Left padding, right spacer for gap */}
        <div ref={scrollRef} className="flex gap-4 md:gap-6 lg:gap-[24px] items-start w-full overflow-x-auto scrollbar-hide pl-4 md:pl-8 lg:pl-[80px]">
          {featuredAreas.map((area) => (
            <Link
              key={area.id}
              href="#"
              className="relative h-[350px] md:h-[400px] lg:h-[501px] w-[280px] md:w-[320px] lg:w-[353px] shrink-0 rounded-[16px] overflow-hidden group"
            >
              {/* Image */}
              <Image
                src={area.image}
                alt={area.name}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 353px"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute bottom-0 left-0 w-full h-[120px] md:h-[180px] lg:h-[239px] bg-gradient-to-b from-[rgba(0,0,0,0)] to-[#000000] backdrop-blur-[0.5px]">
                {/* Text Content */}
                <div className="absolute left-4 md:left-6 lg:left-[25px] bottom-3 md:bottom-4 lg:bottom-[14px] text-white">
                  <h3 className="font-medium text-lg md:text-xl lg:text-2xl leading-normal font-noto-sans mb-1">
                    {area.name}
                  </h3>
                  <p className="font-light text-sm md:text-base leading-[1.538] font-poppins">
                    {area.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
          {/* Right spacer to match left padding */}
          <div className="shrink-0 w-4 md:w-8 lg:w-[80px] h-px" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
