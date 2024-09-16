import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from '../utility-components';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CourseExploreSection = () => {
  return (
    <section 
      className="relative bg-cover rounded-2xl"
      style={{ backgroundImage: "url('/assets/basic/explore-bg.webp')" }}
    >
      {/* Headings */}
      <div className='flex flex-col justify-center items-center p-8'>
        <div className='text-center space-y-5'>
          <h4 className="text-[#20ad96] text-[16px] font-semibold">Explore Courses</h4>
          <p className="text-white text-[32px] font-bold leading-[44px]">
            Over 200+ Online Courses
          </p>
          <p className="text-white text-sm">
            The ultimate planning solution for busy women who want to reach their personal goals
          </p>
        </div>
      {/* Tab section */}
      <div className='flex flex-col justify-center items-center'>
        <Tabs defaultValue="Class1" className="w-full my-5 ">
          <TabsList className="flex flex-row gap-3 rounded-full">
            <TabsTrigger value="Class1" className="flex items-center bg-transparent border border-white bg-opacity-50 text-white rounded-full px-5 py-2 text-sm font-semibold  transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-secondary data-[state=active]:border-none data-[state=active]:text-white">Class6</TabsTrigger>
            <TabsTrigger value="Class2" className="flex items-center bg-transparent border border-white bg-opacity-50 text-white rounded-full px-5 py-2 text-sm font-semibold  transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-secondary data-[state=active]:border-none data-[state=active]:text-white">Class7</TabsTrigger>
            <TabsTrigger value="Class3" className="flex items-center bg-transparent border border-white bg-opacity-50 text-white rounded-full px-5 py-2 text-sm font-semibold  transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-secondary data-[state=active]:border-none data-[state=active]:text-white">Class8</TabsTrigger>
            <TabsTrigger value="Class4" className="flex items-center bg-transparent border border-white bg-opacity-50 text-white rounded-full px-5 py-2 text-sm font-semibold  transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-secondary data-[state=active]:border-none data-[state=active]:text-white">Class9</TabsTrigger>
            <TabsTrigger value="Class5" className="flex items-center bg-transparent border border-white bg-opacity-50 text-white rounded-full px-5 py-2 text-sm font-semibold  transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-secondary data-[state=active]:border-none data-[state=active]:text-white">Class10</TabsTrigger>
            <TabsTrigger value="Class6" className="flex items-center bg-transparent border border-white bg-opacity-50 text-white rounded-full px-5 py-2 text-sm font-semibold  transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-secondary data-[state=active]:border-none data-[state=active]:text-white">Class11</TabsTrigger>
            <TabsTrigger value="Class7" className="flex items-center bg-transparent border border-white bg-opacity-50 text-white rounded-full px-5 py-2 text-sm font-semibold  transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-secondary data-[state=active]:border-none data-[state=active]:text-white">Class12</TabsTrigger>
            <TabsTrigger value="Class8" className="flex items-center bg-transparent border border-white bg-opacity-50 text-white rounded-full px-5 py-2 text-sm font-semibold  transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-secondary data-[state=active]:border-none data-[state=active]:text-white">Basic Maths</TabsTrigger>
          </TabsList>
          <TabsContent value="Class1" className="py-10">
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
            </div>
            </TabsContent>
          <TabsContent value="Class2"className="py-10">
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <ProductCard/>
              <ProductCard/>
            </div>
            </TabsContent>
          <TabsContent value="Class3"className="py-10">
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
            </div>
            </TabsContent>
          <TabsContent value="Class4"className="py-10">
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
            </div>
            </TabsContent>
          <TabsContent value="Class5"className="py-10">
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
            </div>
            </TabsContent>
          <TabsContent value="Class6"className="py-10">
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
            </div>
            </TabsContent>
          <TabsContent value="Class7"className="py-10">
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
            </div>
            </TabsContent>
          <TabsContent value="Class8"className="py-10">
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
            </div>
            </TabsContent>
          {/* Bottom Button */}
          <div className='flex flex-col justify-center space-y-4 items-center'>
            <p className='text-white text-[16px] font-light'>Take the control of their life back and start doing things to make their dream come true.</p>
            <Link href="/courses">
            <Button variant="primary" className="uppercase text-[14px]" >View All Courses</Button>
            </Link>
          </div>
        </Tabs>
        </div>

      </div>
    </section>
  );
}

export default CourseExploreSection;
