"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Minimum display time for smooth experience
    const minDisplayTime = 800;
    const startTime = Date.now();

    const hideLoader = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minDisplayTime - elapsed);

      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setIsLoading(false);
        }, 500); // Wait for fade-out animation
      }, remaining);
    };

    if (document.readyState === "complete") {
      hideLoader();
    } else {
      window.addEventListener("load", hideLoader);
      return () => window.removeEventListener("load", hideLoader);
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-opacity duration-500 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative animate-fade-in">
        <Image
          src="/logoFooter.webp"
          alt="Saabri Group Logo"
          width={120}
          height={120}
          className="animate-logo-subtle"
          priority
          unoptimized={true}
        />
      </div>
    </div>
  );
}
