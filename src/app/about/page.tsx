import Image from "next/image";
import FAQ from "../../components/home/FAQ";

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
        <Image
          src="/about/about-hero.webp"
          alt="About Us"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-6 md:bottom-10 flex items-end w-full">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 w-full">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
              About Us
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-20">
        {/* First Paragraph */}
        <div className="mb-8 md:mb-12">
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            Saabri Aziz Properties stands as a dynamic and trusted real estate brokerage firm in the UAE, built on a strong foundation of decades of
            experience in the Indian real estate development sector. Our journey began as a developer known for delivering quality-driven residential
            and commercial projects, and today, we bring the same vision, integrity, and expertise to the UAE's rapidly growing property market.
          </p>
        </div>

        {/* Second Paragraph */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            With deep industry knowledge, a seasoned team, and a customer-first philosophy, we aim to simplify property transactions and create
            seamless experiences for buyers, sellers, investors, and tenants. Our legacy as developers allows us to understand every detail of real
            estate—from land acquisition and construction to sales and asset management—giving our clients an unmatched advantage.
          </p>
        </div>

        {/* Image and Text Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center mb-8 md:mb-12 lg:mb-20">
          {/* Image */}
          <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden order-1 lg:order-1">
            <Image
              src="/about/about-img.webp"
              alt="Dubai Building"
              fill
              className="object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="space-y-4 md:space-y-6 lg:space-y-8 order-2 lg:order-2">
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              In the UAE, we are committed to becoming a trusted name known for
              transparency, professionalism, and results. Whether you are seeking your dream
              home, a high-performing investment, or strategic market guidance, we offer
              tailored solutions backed by research and real-world insights.
            </p>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              At Saabri Aziz Properties, we believe in building long-term relationships, not just
              closing deals. Our mission is to help clients make confident and informed decisions
              in one of the world's most exciting property markets. As we expand our services
              across the UAE, we look forward to shaping communities, enabling opportunities,
              and contributing to the region's vibrant real estate future.
            </p>

            <div className="bg-indigo-50 rounded-lg p-4 md:p-6 lg:p-8">
              <p className="text-base md:text-lg lg:text-xl font-semibold text-indigo-900 leading-relaxed">
                Your vision is our priority—and your success is our
                commitment.
              </p>
            </div>
          </div>
        </div>
      </section>
        <FAQ />
    </div>
  );
}

