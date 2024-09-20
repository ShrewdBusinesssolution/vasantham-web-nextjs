"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '../utility-components';
import Link from 'next/link';

// Spinner Loader
const Spinner = () => (
  <div className="flex justify-center items-center py-10">
    <div className="border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
  </div>
);

const CourseExploreSection = () => {
  const [activeTab, setActiveTab] = useState('Class1');
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

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
    const getRandomProducts = () => {
      setLoading(true);
      setTimeout(() => {
        if (products.length > 0) {
          const randomProducts = [];
          while (randomProducts.length < 3 && randomProducts.length < products.length) {
            const randomIndex = Math.floor(Math.random() * products.length);
            if (!randomProducts.includes(products[randomIndex])) {
              randomProducts.push(products[randomIndex]);
            }
          }
          setDisplayedProducts(randomProducts);
        } else {
          setDisplayedProducts([]);
        }
        setLoading(false);
      }, 1000); // Loading
    };

    getRandomProducts();
  }, [activeTab]);

  return (
    <section className="relative bg-cover rounded-2xl" style={{ backgroundImage: "url('/assets/basic/explore-bg.webp')" }}>
      {/* Headings */}
      <div className='flex flex-col justify-center items-center p-8'>
        <div className='text-center space-y-5'>
          <h4 className="text-[#20ad96] text-[16px] font-semibold">Explore Courses</h4>
          <p className="text-white text-[26px] md:text-[32px] font-bold leading-[44px]">Over 200+ Online Courses</p>
          <p className="text-white text-sm">The ultimate planning solution for busy women who want to reach their personal goals</p>
        </div>
        {/* Button section */}
        <div className='flex flex-col justify-center items-center my-5'>
          <div className="flex flex-row gap-3 w-[370px] md:w-[500px] lg:w-[840px]  justify-center items-center overflow-x-scroll hide-scrollbar">
            {['Class1', 'Class2', 'Class3', 'Class4', 'Class5', 'Class6', 'Class7', 'Class8', 'Class9', 'Class10'].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? 'secondary' : 'outline'}
                className={`text-white rounded-full px-5 py-1 text-sm font-semibold uppercase transition-all ${activeTab === tab ? 'bg-secondary' : 'border border-white bg-transparent'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </Button>
            ))}
          </div>
          {/* Content section */}
          <div className="py-10">
            {loading ? (
              <Spinner />
            ) : displayedProducts.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                {displayedProducts.map(product => (
                  <ProductCard key={product.id} product={product} homePage={false} />
                ))}
              </div>
            ) : (
              <p className='text-white text-center'>No products available.</p>
            )}
          </div>
          
        </div>
        {/* Bottom Button */}
        <div className='flex flex-col justify-center items-center gap-4'>
            <p className='text-white text-[16px] font-light text-center'>Take control of your life and start making your dreams come true.</p>
            <Link href="/courses">
              <Button variant="primary" className="uppercase text-[14px]">View All Courses</Button>
            </Link>
          </div>
      </div>
      
    </section>
  );
}

export default CourseExploreSection;
