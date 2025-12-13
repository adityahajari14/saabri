"use client";

import { useEffect, useRef, useState } from "react";

const faqs = [
  {
    id: 1,
    question: 'What is Sabri?',
    answer: 'Cluster housing perumnas is a housing concept that consists of several houses in a gated cluster. Cluster housing perumnas offers comfortable, secure, and affordable housing with various complete and modern facilities.',
    isOpen: false
  },
  {
    id: 2,
    question: 'Where is the location of cluster housing perumnas?',
    answer: 'Cluster housing perumnas is strategically located in prime areas with easy access to major facilities and transportation hubs.',
    isOpen: false
  },
  {
    id: 3,
    question: 'How much are the prices and types of houses in cluster housing perumnas?',
    answer: 'We offer various house types and price ranges to suit different needs and budgets. Please contact us for detailed pricing information.',
    isOpen: false
  },
  {
    id: 4,
    question: 'What are the facilities provided in cluster housing perumnas?',
    answer: 'Cluster housing perumnas provides complete facilities including playgrounds, sports fields, shopping centers, schools, security systems, and more.',
    isOpen: false
  }
];

export default function FAQ() {
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
    <section ref={sectionRef} className="bg-neutral-50 p-6 md:p-12 lg:p-[80px]">
      <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 items-start justify-center max-w-[1280px] mx-auto">
        {/* Left Column - Title */}
        <div 
          className={`flex flex-col gap-4 md:gap-6 w-full lg:w-[550px] shrink-0 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
        >
          <h2 className="font-medium text-[#12161D] font-noto-sans text-2xl md:text-3xl lg:text-5xl leading-[1.2] md:leading-[52px]">
            Frequently Asked Questions
          </h2>
          <p className="font-normal text-[#61656E] text-base md:text-lg leading-[26px] font-poppins">
            If there are question you want to ask, we will answer all your question.
          </p>
        </div>

        {/* Right Column - FAQ Items */}
        <div className="flex flex-col gap-4 md:gap-5 grow min-w-0 w-full lg:w-auto">
          {faqs.map((faq, index) => (
            <details
              key={faq.id}
              open={faq.isOpen}
              className={`bg-white border border-[#e5e5e6] rounded-lg p-4 md:p-6 group transition-all duration-700 ease-out hover:shadow-md hover:border-[#12161D] ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <summary className="flex items-center justify-between w-full cursor-pointer gap-3">
                <p className="font-medium text-[#12161D] text-lg md:text-xl leading-[1.4] md:leading-[28px] font-noto-sans grow">
                  {faq.question}
                </p>
                <div className="shrink-0 w-5 h-5 md:w-6 md:h-6 flex items-center justify-center relative">
                  {/* Minus icon (when open) */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="details-open-icon"
                  >
                    <path
                      d="M5 12H19"
                      stroke="#12161D"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {/* Plus icon (when closed) */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="details-closed-icon"
                  >
                    <path
                      d="M12 5V19M5 12H19"
                      stroke="#12161D"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </summary>
              <p className="mt-4 md:mt-6 font-normal text-[#61656E] text-sm md:text-base leading-[24px] font-poppins">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

