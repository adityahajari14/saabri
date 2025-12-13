"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Logo {
    src: string;
    alt: string;
}

export default function Trustedby() {
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

    const logos = [
        {
            src: "/logo/azizi.webp",
            alt: "Azizi"
        },
        {
            src: "/logo/ellington.webp",
            alt: "Ellington"
        },
        {
            src: "/logo/deyaar.webp",
            alt: "Deyaar"
        },
        {
            src: "/logo/omniyat.webp",
            alt: "Omniyat"
        },
        {
            src: "/logo/mag.webp",
            alt: "MAG"
        },
        {
            src: "/logo/waslproperties.webp",
            alt: "Wasl Properties"
        },
        {
            src: "/logo/arada.webp",
            alt: "Arada"
        }
    ]

    return (
        <section ref={sectionRef} className="bg-white my-6 px-4 md:px-6 lg:px-20">
        <div className="container mx-auto flex flex-col">
            <div className="flex flex-row items-center justify-center md:justify-between gap-4 md:gap-6 flex-wrap">
                {logos.map((logo, index) => (
                    <div
                        key={index}
                        className={`transition-all duration-700 ease-out hover:scale-110 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                    >
                        <Image 
                            src={logo.src} 
                            alt={logo.alt} 
                            width={100} 
                            height={100}
                            className="w-16 h-16 md:w-20 md:h-20 lg:w-[100px] lg:h-[100px] object-contain grayscale hover:grayscale-0 transition-all duration-300"
                        />
                    </div>
                ))}
            </div>
        </div>
        </section>
    );
}