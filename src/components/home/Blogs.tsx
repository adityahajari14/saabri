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
  return (
    <section className="bg-white p-[80px]">
      <div className="flex flex-col gap-[55px] items-start">
        {/* Header */}
        <div className="w-full">
          <h2 className="font-medium text-[#12161D] font-noto-sans text-5xl leading-[52px]">
            Always check our latest blog
          </h2>
        </div>

        {/* Content Container */}
        <div className="flex gap-[30px] items-start w-full">
          {/* Left Content - Featured Blog */}
          <div className="flex flex-col gap-[24px] h-[496px] w-[626px] shrink-0">
            {/* Image with Author Overlay */}
            <div className="relative w-full h-[400px] rounded-[16px] overflow-hidden">
              <Image
                src={blogs.featured.image}
                alt={blogs.featured.title}
                fill
                className="object-cover object-center"
              />
              
              {/* Author Info Overlay */}
              <div className="absolute bottom-0 left-0 bg-white flex gap-[12px] items-center p-4">
                <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden shrink-0">
                  <Image
                    src={blogs.featured.author.avatar}
                    alt={blogs.featured.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="font-medium text-[#1b2021] text-[13px] tracking-[0.13px] font-poppins">
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
              <h3 className="font-medium text-[#1b2021] text-2xl tracking-[0.24px] font-poppins">
                {blogs.featured.title}
              </h3>
              <p className="font-normal text-[#828282] text-base tracking-[0.16px] font-poppins">
                {blogs.featured.description}
              </p>
            </div>
          </div>

          {/* Right Content - Two Blog Posts */}
          <div className="flex flex-col gap-[24px] w-[626px] shrink-0">
            {/* First Blog Post */}
            <Link
              href="#"
              className="flex gap-[24px] items-center justify-center w-full"
            >
              {/* Text Content */}
              <div className="flex flex-col gap-8 grow min-w-0">
                <h3 className="font-medium text-[#1b2021] text-2xl tracking-[0.24px] font-poppins whitespace-pre-line">
                  {blogs.right[0].title}
                </h3>
                <p className="font-normal text-[#828282] text-base tracking-[0.16px] font-poppins">
                  {blogs.right[0].author}
                </p>
              </div>

              {/* Image */}
              <div className="relative h-[184px] w-[286px] shrink-0 rounded-[16px] overflow-hidden">
                <Image
                  src={blogs.right[0].image}
                  alt={blogs.right[0].title}
                  fill
                  className="object-cover object-center"
                />
              </div>
            </Link>

            {/* Second Blog Post */}
            <Link
              href="#"
              className="flex gap-[24px] items-center justify-center w-full"
            >
              {/* Text Content */}
              <div className="flex flex-col gap-6 grow min-w-0">
                <h3 className="font-medium text-[#1b2021] text-2xl tracking-[0.24px] font-poppins">
                  {blogs.right[1].title}
                </h3>
                <p className="font-normal text-[#828282] text-base tracking-[0.16px] font-poppins">
                  {blogs.right[1].author}
                </p>
              </div>

              {/* Image */}
              <div className="relative h-[184px] w-[286px] shrink-0 rounded-[16px] overflow-hidden">
                <Image
                  src={blogs.right[1].image}
                  alt={blogs.right[1].title}
                  fill
                  className="object-cover object-center"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

