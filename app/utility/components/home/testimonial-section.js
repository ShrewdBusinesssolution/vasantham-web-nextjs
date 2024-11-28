"use client";
import React, { useRef } from 'react';
import { HeadingSection } from '@/app/utility/components/utility-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import Image from 'next/image';

// Configure Swiper to use modules
SwiperCore.use([Autoplay, Pagination]);

const testimonials = [
  {
    name: "John Smith",
    content: "People who build their own home tend to be very courageous. These people are curious about life.",
    desc: "People who build their own home tend to be very courageous.",
    description: "People who build their own home"
  },
  {
    name: "Jane Doe",
    content: "Creating something from scratch is a remarkable journey. It's filled with challenges and triumphs.",
    desc: "Creating something from scratch is a remarkable journey.",
    description: "Creating something from scratch"
  },
  {
    name: "Alice Johnson",
    content: "The process of building your own space reflects deep personal growth and resilience.",
    desc: "The process of building your own space reflects deep personal growth.",
    description: "Building your own space"
  },
  {
    name: "Alice Johnson",
    content: "The process of building your own space reflects deep personal growth and resilience.",
    desc: "The process of building your own space reflects deep personal growth.",
    description: "Building your own space"
  },
  {
    name: "Alice Johnson",
    content: "The process of building your own space reflects deep personal growth and resilience.",
    desc: "The process of building your own space reflects deep personal growth.",
    description: "Building your own space"
  }
];

const TestimonialsSection = ({testimonialData}) => {
  const categorySplide = useRef(null);

  return (
    <section className="flex flex-col items-center justify-center py-6 md:py-20">
      <div>
        <HeadingSection title={"Testimonials"} subtitle={"Success Stories from person"} />
        <p className="text-base leading-8 text-center mt-4 w-full">
          The ultimate planning solution for busy women who want to reach their personal goals
        </p>
      </div>
      <div className="w-full max-w-6xl py-10">
        <Swiper
          centeredSlides={true} // Center the active slide
          slidesPerView={1} // Show one slide at a time by default
          spaceBetween={30} // Space between slides
          loop={true} // Enable loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} rounded-full w-4 h-4 bg-gray-900 mx-1"></span>`;
            },
          }}
          breakpoints={{
            640: {
              slidesPerView: 1, // One slide for small screens
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2, // Two slides for medium screens
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3, // Three slides for large screens
              spaceBetween: 40,
            },
          }}
        >
          {testimonialData?.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <TestimonialCard {...testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialsSection;

const TestimonialCard = ({ name, content }) => {
  return (
    <div className="flex flex-col space-y-4 p-8 bg-white bg-opacity-50 rounded-3xl max-md:px-5 h-full group">
      <div className="flex flex-row justify-end">
        <Image src={"/assets/basic/quotes.webp"} width={50} height={50} alt="quotes" className="group-hover:scale-125 group-hover:-rotate-3 transition-all duration-300" />
      </div>
      <div className="flex flex-col space-y-3">
        <h4 className="text-2xl font-semibold leading-none text-primary mt-4">{name}</h4>
        <p className=" text-[16px] leading-8 text-[#535967]">{content}</p>
      </div>
    </div>
  );
};
