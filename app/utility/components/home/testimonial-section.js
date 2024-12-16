"use client";
import React, { useRef, useState } from "react";
import { HeadingSection } from "@/app/utility/components/utility-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules"; // Updated Swiper module import
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

const TestimonialsSection = ({ testimonialData }) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDotClick = (index) => {
    swiperRef.current?.slideToLoop(index);
    setActiveIndex(index);
  };

  return (
    <section className="flex flex-col items-center justify-center py-6 md:py-20">
      <HeadingSection title="Testimonials" subtitle="Success Stories from people" />
      <p className="text-base leading-8 text-center mt-4 w-full">
        The ultimate planning solution for busy women who want to reach their personal goals
      </p>

      <div className="w-full max-w-6xl py-10">
        <Swiper
          modules={[Autoplay]} // Correct module usage
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)} // Reference
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Track active slide
          pagination={{ clickable: true }}
        >
          {testimonialData.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <TestimonialCard {...testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination */}
        <div className="flex gap-2 justify-center mt-10">
          {testimonialData.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? "bg-secondary scale-150" : "bg-[#D6D6D6]"
              }`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

const TestimonialCard = ({ name, content }) => (
  <div className="flex flex-col space-y-4 p-8 bg-white rounded-3xl min-h-[280px] group">
    <div className="flex justify-end">
      <Image
        src="/assets/basic/quotes.webp"
        width={50}
        height={50}
        alt="quotes"
        className="group-hover:scale-125 group-hover:-rotate-3 transition-all duration-300"
      />
    </div>
    <h4 className="text-2xl font-semibold text-primary mt-4">{name}</h4>
    <p className="text-[16px] leading-8 text-[#535967]">{content}</p>
  </div>
);
