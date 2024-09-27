"use client";
import React, { useRef, useEffect } from 'react';
import { ProductCard } from './utility-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

const RelatedCourse = () => {
  const nextRef = useRef(null);
  const prevRef = useRef(null);
  const splideRef = useRef(null);

  const products = [
    { id: 1, imageSrc: "/assets/product/product-1.webp", price: "₹120.00", category: "Science", rating: 4.5, reviewCount: 20, title: "Photography Crash Course for Photographers", students: "100 Students", lessons: "6 Lessons" },
    { id: 2, imageSrc: "/assets/product/product-1.webp", price: "₹120.00", category: "Multi Media", rating: 4.5, reviewCount: 20, title: "Photography Crash Course for Photographers", students: "1500 Students", lessons: "4 Lessons" },
    { id: 3, imageSrc: "/assets/product/product-1.webp", price: "₹120.00", category: "Social", rating: 4.5, reviewCount: 20, title: "Photography Crash Course for Photographers", students: "1200 Students", lessons: "5 Lessons" },
    { id: 4, imageSrc: "/assets/product/product-1.webp", price: "₹120.00", category: "Physics", rating: 4.5, reviewCount: 20, title: "Photography Crash Course for Photographers", students: "2500 Students", lessons: "45 Lessons" },
    { id: 5, imageSrc: "/assets/product/product-1.webp", price: "₹120.00", category: "Web Application", rating: 4.5, reviewCount: 20, title: "Photography Crash Course for Photographers", students: "3100 Students", lessons: "9 Lessons" },
    { id: 6, imageSrc: "/assets/product/product-1.webp", price: "₹120.00", category: "Computer Science", rating: 4.5, reviewCount: 20, title: "Photography Crash Course for Photographers", students: "1800 Students", lessons: "12 Lessons" },
    { id: 7, imageSrc: "/assets/product/product-1.webp", price: "₹120.00", category: "Chemistry", rating: 4.5, reviewCount: 20, title: "Photography Crash Course for Photographers", students: "2400 Students", lessons: "7 Lessons" },
    { id: 8, imageSrc: "/assets/product/product-1.webp", price: "₹120.00", category: "Bio Chemistry", rating: 4.5, reviewCount: 20, title: "Photography Crash Course for Photographers", students: "1650 Students", lessons: "10 Lessons" },
  ];

  useEffect(() => {
    if (splideRef.current) {
      const splide = splideRef.current.splide;
      nextRef.current.onclick = () => splide.go('+');
      prevRef.current.onclick = () => splide.go('-');
    }
  }, []);

  return (
    <main className='px-5 py-10 w-full md:w-[700px] lg:w-[820px]'>
      <div className='brand-container'>
        <div className='flex items-center justify-between'>
        <h3 className='text-[32px] text-[#222]'>Related courses you can explore</h3>
        
        <div className="flex flex-row gap-5 justify-center items-center">
          <button ref={prevRef} className="custom-arrow bg-[#E9E9E9] p-2 rounded-full"><FaArrowLeft/></button>
          <button ref={nextRef} className="custom-arrow bg-[#E9E9E9] p-2 rounded-full"><FaArrowRight/></button>
        </div>
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
            {products.map(product => (
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
