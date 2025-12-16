import Link from 'next/link';
import Image from 'next/image';

// Footer - Site footer with links, contact info, and social media
const Footer = () => {
  return (
    <footer className="bg-white px-5 md:px-8 lg:px-16 xl:px-24 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16 mb-8">
          {/* Brand Section */}
          <div className="flex flex-col gap-4 md:gap-5 items-center md:items-start">
            <Link href="/" className="flex items-center">
              <Image src="/logoFooter.webp" alt="Saabri Group Logo" width={60} height={60} />
            </Link>
            <p className="font-sans text-sm md:text-base text-[#484848] leading-normal text-center md:text-left">
              Where vision meets Value
            </p>
          </div>

          {/* Navigation Section */}
          <div className="flex flex-col gap-4 md:gap-5 items-center md:items-start">
            <nav className="flex flex-col gap-3 md:gap-4 items-center md:items-start">
              <Link href="/projects" className="font-sans text-sm md:text-base text-[#484848] hover:text-black transition-colors">
                Projects.
              </Link>
              <Link href="/about" className="font-sans text-sm md:text-base text-[#484848] hover:text-black transition-colors">
                About Us.
              </Link>
            </nav>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col gap-4 md:gap-5 items-center md:items-start">
            <div className="flex flex-col gap-2 md:gap-3 font-sans text-sm md:text-base text-[#484848] leading-[1.6] text-center md:text-left">
              <p>+91 0525664490</p>
              <p>Info@saabriazizproperties.com</p>
            </div>
          </div>

          {/* Location Section */}
          <div className="flex flex-col gap-4 md:gap-5 items-center md:items-start">
            <p className="font-sans text-sm md:text-base text-[#484848] leading-[1.6] text-center md:text-left">
              Business bay, Dubai, UAE
            </p>
          </div>
        </div>

        {/* Bottom Section - Social Media and Copyright */}
        <div className="border-t border-[#E5E5E5] pt-8 md:pt-10">
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-6 md:gap-8">
            {/* Social Media Icons */}
            <div className="flex gap-4 md:gap-5">
              <a href="#" className="w-5 h-5 flex items-center justify-center hover:opacity-70 transition-opacity">
                <Image src="/okru.svg" alt="OK.ru" width={13} height={13} />
              </a>
              <a href="#" className="w-5 h-5 flex items-center justify-center hover:opacity-70 transition-opacity">
                <Image src="/vk.svg" alt="VK" width={18} height={18} />
              </a>
              <a href="#" className="w-5 h-5 flex items-center justify-center hover:opacity-70 transition-opacity">
                <Image src="/facebook.svg" alt="Facebook" width={18} height={18} />
              </a>
              <a href="#" className="w-5 h-5 flex items-center justify-center hover:opacity-70 transition-opacity">
                <Image src="/telegram.svg" alt="Telegram" width={18} height={18} />
              </a>
              <a href="#" className="w-5 h-5 flex items-center justify-center hover:opacity-70 transition-opacity">
                <Image src="/instagram.svg" alt="Instagram" width={18} height={18} />
              </a>
            </div>
            
            {/* Copyright */}
            <div className="font-sans text-xs md:text-sm text-[#484848] leading-normal text-center md:text-left">
              <p>© {new Date().getFullYear()} — Copyright</p>
              <p>All Rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
