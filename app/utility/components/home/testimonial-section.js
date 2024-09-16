"use client";
import React, { useRef } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css'; // Import Splide styles
import { HeadingSection, TestimonialCard } from '@/app/utility/components/utility-components';

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
  }
];

const TestimonialsSection = () => {
  const categorySplide = useRef(null);

  return (
    <section className="flex flex-col items-center justify-center py-6 md:py-20">
      <div>
        <HeadingSection title={"Testimonials"} subtitle={"Success Stories from person"} />
        <p className="text-base leading-8 text-center mt-4 w-full md:w-[500px]">
          The ultimate planning solution for busy women who want to reach their personal goals
        </p>
      </div>
      <div className="w-full max-w-6xl splide-container py-10 ">
        <Splide
          ref={categorySplide}
          options={{
            type: 'loop',
            perPage: 3,
            perMove: 1,
            autoplay: true,
            interval: 3000,
            gap: '2rem',
            pagination: true, // Ensure pagination is enabled
            speed: 2000,
            arrows: false,
            easing: 'linear',
            breakpoints: {
              1024: {
                perPage: 2,
                gap: '1rem',
                height: '300px',
              },
              768: {
                perPage: 2,
                gap: '0.5rem',
                height: '260px',
              },
              640: {
                perPage: 1,
                gap: '0.5rem',
                height: '380px',
              },
            },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SplideSlide key={index}>
              <TestimonialCard {...testimonial} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default TestimonialsSection;
