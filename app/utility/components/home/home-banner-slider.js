"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules"; // Updated Swiper module import
import "swiper/css";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const testimonials = [
    {
      name: "John Smith",
      content:
        "People who build their own home tend to be very courageous. These people are curious about life.",
    },
    {
      name: "Jane Doe",
      content:
        "Creating something from scratch is a remarkable journey. It's filled with challenges and triumphs.",
    },
    {
      name: "Alice Johnson",
      content:
        "The process of building your own space reflects deep personal growth and resilience.",
    },
  ];
  


export default function HomeBannerSlider() {
    const swiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleDotClick = (index) => {
        swiperRef.current?.slideToLoop(index);
        setActiveIndex(index);
    };
    return (
        <div className="w-full relative">
            <Swiper
                modules={[Autoplay]} // Correct module usage
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                spaceBetween={30}
                slidesPerView={1}
                onSwiper={(swiper) => (swiperRef.current = swiper)} // Reference
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Track active slide
                pagination={{ clickable: true }}
            >
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index}>
                        <BannerCard {...testimonial} />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Pagination */}
            <div className="absolute bottom-0 right-0 left-0 grid place-items-center z-30 py-5">
            <div className="flex gap-2 justify-center mt-10">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeIndex ? "bg-secondary scale-150" : "bg-[#D6D6D6]"
                            }`}
                        onClick={() => handleDotClick(index)}
                    />
                ))}
            </div>
            </div>
        </div>

    )
}



const BannerCard = () => {
    return (
        <div className='flex flex-col justify-center py-16 md:py-24 bg-cover md:bg-bottom relative overflow-hidden repeat-0 bg-right' style={{ backgroundImage: `url("/assets/basic/home-banner.webp")` }}>
            <div className="relative z-10 brand-container px-5 md:px-10 flex flex-col gap-6 md:gap-8">
                {/* Text */}
                <h6 className='text-[#07A889] font-medium uppercase text-[15px] animate-slide-in-top delay-100'>Expert Instruction</h6>
                <h2 className='text-white lg:w-3/5 xl:w-3/5 leading-normal animate-slide-in-top delay-200'>Making learning easy with
                    our best platform!</h2>
                <p className='text-[14px] md:text-lg text-white lg:w-3/5 xl:w-3/5 animate-slide-in-top delay-300'>Education empowers humanity by unlocking the potential within every individual, enabling personal growth and societal progress. </p>
                {/* Buttons */}
                <div className='flex flex-col md:flex-row gap-3'>
                    <Link href={'/courses'}>
                        <Button variant="primary" size="lg" className
                            ="rounded-sm uppercase">
                            Explore Courses
                        </Button>
                    </Link>
                    <Link href={'/about'}>
                        <Button variant="primary" size="lg" className="bg-[#07A889] rounded-sm uppercase">
                            Learn More
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}