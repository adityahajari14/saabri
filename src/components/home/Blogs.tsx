"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const blogs = {
  featured: {
    id: 1,
    title: 'Tips and tricks in choosing a house',
    description: 'tips and tricks to buy a house easily here is to buy at a low price',
    image: '/home/blogs/blog-1.webp',
    author: {
      name: 'Yusuf firdaus',
      role: 'admin',
      avatar: '/home/blogs/yusuf-firdaus.webp'
    }
  },
  right: [
    {
      id: 2,
      title: 'Creating a clean\nand elegant home',
      author: 'Albert firdaus',
      image: '/home/blogs/blog-2.webp'
    },
    {
      id: 3,
      title: 'Good paint color for home',
      author: 'Rusy firdaus',
      image: '/home/blogs/blog-3.webp'
    }
  ]
};

export default function Blogs() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-white p-6 md:p-12 lg:p-[80px]">
      <div className="flex flex-col gap-8 md:gap-12 lg:gap-[55px] items-start">
        {/* Header */}
        <div className="w-full">
          <h2 
            className={`font-medium text-[#12161D] font-noto-sans text-2xl md:text-3xl lg:text-5xl leading-[1.2] md:leading-[52px] transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Always check our latest blog
          </h2>
        </div>

        {/* Content Container */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-[30px] items-start w-full">
          {/* Left Content - Featured Blog */}
          <div 
            className={`flex flex-col gap-4 md:gap-6 lg:gap-[24px] w-full lg:h-[496px] lg:w-[626px] shrink-0 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {/* Image with Author Overlay */}
            <div className="relative w-full h-[250px] md:h-[300px] lg:h-[400px] rounded-[16px] overflow-hidden group">
              <Image
                src={blogs.featured.image}
                alt={blogs.featured.title}
                fill
                className="object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
              />
              
              {/* Author Info Overlay */}
              <div className="absolute bottom-0 left-0 bg-white flex gap-2 md:gap-3 lg:gap-[12px] items-center p-3 md:p-4">
                <div className="relative w-10 h-10 md:w-12 md:h-12 lg:w-[50px] lg:h-[50px] rounded-full overflow-hidden shrink-0">
                  <Image
                    src={blogs.featured.author.avatar}
                    alt={blogs.featured.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="font-medium text-[#1b2021] text-xs md:text-sm lg:text-[13px] tracking-[0.13px] font-poppins">
                    {blogs.featured.author.name}
                  </p>
                  <p className="font-normal text-[#828282] text-[10px] tracking-[0.1px] font-poppins">
                    {blogs.featured.author.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-[#1b2021] text-xl md:text-2xl tracking-[0.24px] font-poppins">
                {blogs.featured.title}
              </h3>
              <p className="font-normal text-[#828282] text-sm md:text-base tracking-[0.16px] font-poppins">
                {blogs.featured.description}
              </p>
            </div>
          </div>

          {/* Right Content - Two Blog Posts */}
          <div 
            className={`flex flex-col gap-4 md:gap-6 lg:gap-[24px] w-full lg:w-[626px] shrink-0 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            {/* First Blog Post */}
            <Link
              href="#"
              className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-[24px] items-start md:items-center w-full group hover:scale-[1.02] transition-transform duration-300"
            >
              {/* Text Content */}
              <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 grow min-w-0 w-full md:w-auto order-2 md:order-1">
                <h3 className="font-medium text-[#1b2021] text-xl md:text-2xl tracking-[0.24px] font-poppins whitespace-pre-line">
                  {blogs.right[0].title}
                </h3>
                <p className="font-normal text-[#828282] text-sm md:text-base tracking-[0.16px] font-poppins">
                  {blogs.right[0].author}
                </p>
              </div>

              {/* Image */}
              <div className="relative h-[200px] md:h-[184px] w-full md:w-[286px] shrink-0 rounded-[16px] overflow-hidden order-1 md:order-2">
                <Image
                  src={blogs.right[0].image}
                  alt={blogs.right[0].title}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                />
              </div>
            </Link>

            {/* Second Blog Post */}
            <Link
              href="#"
              className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-[24px] items-start md:items-center w-full group hover:scale-[1.02] transition-transform duration-300"
            >
              {/* Text Content */}
              <div className="flex flex-col gap-4 md:gap-6 grow min-w-0 w-full md:w-auto order-2 md:order-1">
                <h3 className="font-medium text-[#1b2021] text-xl md:text-2xl tracking-[0.24px] font-poppins">
                  {blogs.right[1].title}
                </h3>
                <p className="font-normal text-[#828282] text-sm md:text-base tracking-[0.16px] font-poppins">
                  {blogs.right[1].author}
                </p>
              </div>

              {/* Image */}
              <div className="relative h-[200px] md:h-[184px] w-full md:w-[286px] shrink-0 rounded-[16px] overflow-hidden order-1 md:order-2">
                <Image
                  src={blogs.right[1].image}
                  alt={blogs.right[1].title}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

