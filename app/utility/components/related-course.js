"use client";
import React, { useRef, useEffect } from 'react';
import { ProductCard } from './utility-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

const RelatedCourse = ({ course }) => {
  const nextRef = useRef(null);
  const prevRef = useRef(null);
  const splideRef = useRef(null);

  useEffect(() => {
    if (splideRef.current && nextRef.current && prevRef.current) {
      const splide = splideRef.current.splide;
  
      // Attach click handlers only if refs are properly assigned
      nextRef.current.onclick = () => splide.go('+');
      prevRef.current.onclick = () => splide.go('-');
    }
  }, []);

  return (
    <main className='px-5 py-10 w-full md:w-[700px] lg:w-[820px]'>
      <div className='brand-container'>
        <div className='flex items-center justify-between'>
          <h3 className='text-[32px] text-[#222]'>Related courses you can explore</h3>

          {course.length > 1 && ( // Render buttons only if there are more than one course
            <div className="flex flex-row gap-5 justify-center items-center">
              <button ref={prevRef} className="custom-arrow bg-[#E9E9E9] p-2 rounded-full">
                <FaArrowLeft />
              </button>
              <button ref={nextRef} className="custom-arrow bg-[#E9E9E9] p-2 rounded-full">
                <FaArrowRight />
              </button>
            </div>
          )}
        </div>

        <div className='py-10'>
          <Splide
            ref={splideRef}
            options={{
              perPage: 2,
              gap: '1rem',
              pagination: false,
              arrows: false,
              breakpoints: {
                640: { perPage: 1 },
                1024: { perPage: 2 },
              },
            }}
          >
            {course.map(product => (
              <SplideSlide key={product.id}>
                <div className="flex justify-center w-full">
                  <ProductCard product={product} className="w-full" />
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </main>
  );
};

export default RelatedCourse;
