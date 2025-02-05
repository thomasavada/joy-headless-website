"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/mousewheel";
import "swiper/css/keyboard";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

const stories = [
  {
    logo: "https://joy.so/wp-content/uploads/2025/01/vinamilk-logo.avif",
    link: "https://joy.so/case-study-vinamilk/",
    stats: [
      { value: "315K", label: "Members enrolled" },
      { value: "30M", label: "Customer Engagements" },
      { value: "2B", label: "Points rewarded" }
    ]
  },
  {
    logo: "https://joy.so/wp-content/uploads/2025/01/BIRD_BIG.D-cea8736a.avif",
    link: "https://joy.so/case-study-allbirds/",
    stats: [
      { value: "21.5K", label: "Members enrolled" },
      { value: "98%", label: "MoM Sales Growth" },
      { value: "45%", label: "Redemption rate" }
    ]
  },
  {
    logo: "https://joy.so/wp-content/uploads/2025/01/korean-skincare-logo.avif",
    link: "https://joy.so/case-study-koreanskincare/",
    stats: [
      { value: "21K", label: "Members enrolled" },
      { value: "71.5%", label: "MoM Sales Growth" },
      { value: "2B", label: "Referral Rate" }
    ]
  }
];

export const CustomerStories = () => {
  return (
    <section className="w-full bg-[#0A0C10] py-20">
      <div className="container px-4 mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
          Customer success stories
        </h2>

        <div className="relative max-w-6xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow, Mousewheel, Keyboard]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            loop={true}
            grabCursor={true}
            mousewheel={true}
            keyboard={{
              enabled: true,
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-white/50',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-white'
            }}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            className="!pb-14 cursor-grab active:cursor-grabbing"
          >
            {stories.map((story, index) => (
              <SwiperSlide key={index}>
                <div className="bg-[#151821] rounded-lg p-8 space-y-8">
                  <Link href={story.link} target="_blank" className="block">
                    <Image
                      src={story.logo}
                      alt="Company logo"
                      width={300}
                      height={100}
                      className="w-full h-20 object-contain brightness-0 invert"
                    />
                  </Link>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {story.stats.map((stat, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="p-1.5 bg-[#1E2330] rounded">
                          <ArrowUpRight className="w-4 h-4 text-[#00A3FF]" />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-white">{stat.value}</p>
                          <p className="text-sm text-gray-400">
                            {stat.label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button 
            className="swiper-button-prev !hidden md:!flex absolute left-0 top-1/2 -translate-y-1/2 z-10 text-white hover:text-[#00A3FF] transition-colors after:!content-none"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button 
            className="swiper-button-next !hidden md:!flex absolute right-0 top-1/2 -translate-y-1/2 z-10 text-white hover:text-[#00A3FF] transition-colors after:!content-none"
            aria-label="Next slide"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>

        <div className="text-center mt-10">
          <Link 
            href="https://joy.so/case-study/"
            target="_blank"
            className="inline-flex items-center gap-2 text-[#00A3FF] hover:underline"
          >
            See More
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}; 