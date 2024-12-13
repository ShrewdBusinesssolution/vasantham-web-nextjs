"use client";
import React, { useRef, useEffect, useState } from 'react';
import { ProductCard } from './utility-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { useMediaQuery } from "@react-hook/media-query"


const RelatedCourse = ({ course }) => {
  const [isMounted, setIsMounted] = useState(false);

  const nextRef = useRef(null);
  const prevRef = useRef(null);
  const splideRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 640px)');

  
  useEffect(() => {
    setIsMounted(true); // Ensure the component renders after hydration
  }, []);
  
  useEffect(() => {
    if (splideRef.current && nextRef.current && prevRef.current) {
      const splide = splideRef.current.splide;

      // Ensure the Splide instance is available
      splide.on("mounted", () => {
        nextRef.current.onclick = () => splide.go(">");
        prevRef.current.onclick = () => splide.go("<");
      });
    }
  }, [isMounted]);


  if (!isMounted) return null;

    // Logic for showing buttons
    const shouldShowButtons =
    (isMobile && course.length > 1) || (!isMobile && course.length > 2);

  

  return (
    <main className='py-10 w-full md:w-[700px] lg:w-[820px]'>
        <div className='flex max-sm:flex-col items-center justify-between gap-5'>
          <h3 className='text-[32px] text-[#222]'>Related courses you can explore</h3>

          {shouldShowButtons && ( // Render buttons only if there are more than one course
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
    </main>
  );
};

export default RelatedCourse;
