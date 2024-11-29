"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '../utility-components';
import Link from 'next/link';
import BasicService from '@/app/services/api-services/basic-service';

// Spinner Loader
const Spinner = () => (
  <div className="flex justify-center items-center py-10">
    <div className="border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
  </div>
);

const CourseExploreSection = ({ standards, courses }) => {
  const [activeTab, setActiveTab] = useState('');
  const [courseData, setcourseData] = useState(courses);
  const [loading, setLoading] = useState(false);



  const getFilterCourse = async (standard) => {
    try {
      setLoading(true)
      setcourseData([]);
      const response = await BasicService.HomeCourseFilter(standard);
      if (response.status) {
        setActiveTab(standard)
        setcourseData(response.data)
      }

    } catch (error) {
      console.log("🚀 ~ getFilterCourse ~ error:", error)
    } finally{
      setLoading(false)
    }
  }



  return (
    <section className="relative bg-cover" style={{ backgroundImage: "url('/assets/basic/explore-bg.webp')" }}>
      {/* Headings */}
      <div className='flex flex-col justify-center items-center p-8'>
        <div className='text-center space-y-5'>
          <h4 className="text-[#20ad96] text-[16px] font-semibold">Explore Courses</h4>
          <p className="text-white text-[24px] md:text-[32px] font-bold leading-[44px]">Over 200+ Online Courses</p>
          <p className="text-white text-sm">The ultimate planning solution for busy women who want to reach their personal goals</p>
        </div>
        {/* Button section */}
        <div className='flex flex-col justify-center items-center my-5'>
          <div className="flex flex-row gap-3 w-[370px] md:w-[500px] lg:w-[860px]  justify-center items-center overflow-x-scroll hide-scrollbar">
            {standards?.map((item, index) => (
              <Button
                key={index}
                variant={activeTab === item.slug ? 'secondary' : 'outline'}
                className={`text-white rounded-full px-5 py-1 text-sm font-semibold uppercase transition-all ${activeTab === item.slug ? 'bg-secondary' : 'border border-white bg-transparent'}`}
                onClick={() => getFilterCourse(item.slug)}
              >
                {item.name}
              </Button>
            ))}
          </div>
          {/* Content section */}
          <div className="py-10">
            {loading ? (
              <Spinner />
            ) : courseData?.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>

                {courseData?.map((product, index) => (
                  <ProductCard key={index} product={product} homePage={false} />
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
