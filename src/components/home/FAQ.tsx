"use client";

import { useEffect, useRef, useState } from "react";

const faqs = [
  {
    id: 1,
    question: "How does Saabri Aziz Properties help me choose the right property?",
    answer: "We begin by understanding your purpose - whether it's end-use, rental income, or long-term investment. Based on your goals, budget, and timeline, we curate options that truly make sense for you.",
    isOpen: false
  },
  {
    id: 2,
    question: "Is buying property in Dubai a safe and transparent process?",
    answer: "Yes. Dubai's real estate market is well regulated, with clear ownership laws and structured transaction processes. We guide you through every step to ensure clarity and confidence throughout the journey.",
    isOpen: false
  },
  {
    id: 3,
    question: "I'm buying property in Dubai for the first time. Can you guide me?",
    answer: "Absolutely. We simplify the process by explaining locations, pricing, payment plans, documentation, and timelines in a clear and easy-to-understand manner.",
    isOpen: false
  },
  {
    id: 4,
    question: "Can overseas buyers and NRIs purchase property through you?",
    answer: "Yes. We regularly assist international clients with virtual consultations, online coordination, and complete transaction support from start to finish.",
    isOpen: false
  },
  {
    id: 5,
    question: "Should I consider an off-plan property or a ready property?",
    answer: "Both have their advantages. We help you compare options based on your financial goals, expected returns, flexibility, and possession timelines - so you can make an informed decision.",
    isOpen: false
  },
  {
    id: 6,
    question: "Are the costs and charges clearly explained upfront?",
    answer: "Yes. All costs related to the transaction are explained transparently before you proceed, ensuring there are no unexpected surprises later.",
    isOpen: false
  },
  {
    id: 7,
    question: "Will you assist with paperwork and documentation?",
    answer: "Yes. We assist with documentation coordination, offer preparation, and follow-ups to ensure the process moves smoothly and efficiently.",
    isOpen: false
  },
  {
    id: 8,
    question: "Do you help with investment insights and market guidance?",
    answer: "We share market-based insights on locations, demand trends, rental potential, and pricing to help you take well-informed decisions.",
    isOpen: false
  },
  {
    id: 9,
    question: "What happens after I finalize a property?",
    answer: "We continue to support you with coordination until completion and can connect you with trusted partners for leasing, handover, or post-purchase assistance if required.",
    isOpen: false
  },
  {
    id: 10,
    question: "How long does the property buying process take?",
    answer: "Timelines vary depending on the type of property and payment structure. We clearly explain expected timelines before you move ahead.",
    isOpen: false
  },
  {
    id: 11,
    question: "How do I get started?",
    answer: "You can contact us through our website, WhatsApp, or phone. Our team will connect with you, understand your requirement, and guide you step by step.",
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

