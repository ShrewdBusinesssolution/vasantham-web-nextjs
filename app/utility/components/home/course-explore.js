"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '../utility-components';
import Link from 'next/link';
import BasicService from '@/app/services/api-services/basic-service';
import { TruncateText } from '../../helper';

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
    } finally {
      setLoading(false)
    }
  }



  return (
    <section className="relative bg-cover rounded-[30px]" style={{ backgroundImage: "url('/assets/basic/explore-bg.png')" }}>
      {/* Headings */}
      <div className='flex flex-col justify-center items-center '>
        <div className='text-center space-y-5 pt-8'>
          <h4 className="text-[#20ad96] text-[16px] font-semibold">Explore Courses</h4>
          <p className="text-white text-[24px] md:text-[32px] font-bold leading-[44px]">Over 200+ Online Courses</p>
          <p className="text-white text-sm">The ultimate planning solution for busy women who want to reach their personal goals</p>
        </div>
        {/* Button section */}
        <div className="flex flex-row gap-3 w-[100%] py-5  justify-center items-center overflow-x-scroll hide-scrollbar scroll-padding-x-[5rem]"   style={{ scrollMarginLeft: '2.5rem', paddingLeft: '2.5rem' }}>
          {standards?.map((item, index) => (
            <Button
              key={index}
              variant={activeTab === item.slug ? 'secondary' : 'outline'}
              className={`text-white rounded-full px-5 py-1 text-sm font-semibold uppercase transition-all  ${activeTab === item.slug ? 'bg-secondary' : 'border border-white bg-transparent'}`}
              onClick={() => getFilterCourse(item.slug)}
            >
              {TruncateText(item.name, 10)}
            </Button>
          ))}
        </div>
          {/* Content section */}
          <div className="py-10 max-sm:px-5 px-10 w-full flex justify-center items-center">
            {loading ? (
              <Spinner />
            ) : courseData?.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full'>

                {courseData?.map((product, index) => (
                  <ProductCard key={index} product={product} homePage={false} />
                ))}

              </div>
            ) : (
              <p className='text-white text-center'>No Courses available.</p>
            )}
          </div>

        {/* Bottom Button */}
        <div className='flex flex-col justify-center items-center gap-4 pb-8'>
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
