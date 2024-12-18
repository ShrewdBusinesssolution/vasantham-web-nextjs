import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HeadingSection, ProductCard } from '../utility/components/utility-components'
import WhyChooseCard from '../utility/components/home/whychoose-card'
import Image from 'next/image'
import { TiTick } from "react-icons/ti";
import NewsletterSection from '../utility/components/home/news-letter'
import CourseExploreSection from '../utility/components/home/course-explore'
import TestimonialsSection from '../utility/components/home/testimonial-section'
import AboutSection from '../utility/components/home/home-about'
import BestService from '../utility/components/home/best-service'
import api from '../services/api-services/fetch-service'
import BasicService from '../services/api-services/basic-service'
import HomeBannerSlider from '../utility/components/home/home-banner-slider'

export const metadata = {
  title: "Homepage",
  description: "Vasantham e-Learning - Explore a wide range of expertly crafted online courses designed to empower your learning journey. Join today for skill development, career growth, and personal enrichment.",
};

const Home = async () => {

  try {
    const HomedataResponse = await BasicService.HomePage();

    return (
      <main>
        {/* Banner */}
        <HomeBannerSlider bannerData={HomedataResponse.banner} />

        {/* Why Choose section */}
        <section className='bg-[#FCFCFC]'>
          <div className='brand-container'>
            <div className='py-6 md:py-12'>
              <HeadingSection title="Why choose us" subtitle='Why choose Vasantham?' />
            </div>
            <WhyChooseCard />
          </div>
        </section>

        {/* Our Service hidden */} 
        <section className='bg-gradient-to-br from-[#fff] to-[#CCF4FF] from-0% hidden'>
          <div className='flex flex-col md:flex-row gap-10 brand-container px-8 py-10'>
            <div className='relative w-full md:w-1/2 flex items-center justify-center '>
              {/* Base image with background color and opacity */}
              <div className='relative'>
                <Image
                  src="/assets/basic/about.png"
                  className="rounded-3xl"
                  width={500}
                  height={500}
                  alt="Base Image"
                />
                <div className='absolute inset-0 bg-[#07294D66] bg-opacity-40 flex items-center justify-center rounded-3xl'>
                  {/* Overlay GIF */}
                  <Image
                    src="/assets/svg/play.svg"
                    className="w-[100px] h-[100px]"
                    width={100}
                    height={100}
                    alt="Play Button"
                  />
                </div>
              </div>
            </div>
            <div className='w-full md:w-1/2 flex flex-col justify-center '>
              <h4 className='text-[#20AD96] text-sm uppercase'>Our services</h4>
              <div className='flex flex-col gap-5 mt-6 md:mt-10'>
                <h4 className=''>Get Instant Access Pro Courses</h4>
                <p className='text-sm w-full md:w-11/12 text-justify'>The ultimate planning solution for busy women who want to reach their personal
                  goals.Effortless comfortable eye-catching unique detail</p>
                <div className='flex flex-col gap-2'>
                  <div className='flex items-center gap-4'>
                    <Image src={"/assets/svg/tick.svg"} width={50} height={50} className='w-[16px] h-[16px]' alt="Image" />
                    <p className='text-[16px] font-semibold'>Powerful Audience</p>
                  </div>
                  <div className='flex items-center gap-4'>
                    <Image src={"/assets/svg/tick.svg"} width={50} height={50} className='w-[16px] h-[16px]' alt="Image" />
                    <p className='text-[16px] font-semibold'>Powerful Audience</p>
                  </div>
                  <div className='flex items-center gap-4'>
                    <Image src={"/assets/svg/tick.svg"} width={50} height={50} className='w-[16px] h-[16px]' alt="Image" />
                    <p className='text-[16px] font-semibold'>Powerful Audience & Best course meterials</p>
                  </div>
                  <div className='flex items-center gap-4'>
                    <Image src={"/assets/svg/tick.svg"} width={50} height={50} className='w-[16px] h-[16px]' alt="Image" />
                    <p className='text-[16px] font-semibold'>Powerful Audience & Best course meterials</p>
                  </div>
                  <div className='flex items-center gap-4'>
                    <Image src={"/assets/svg/tick.svg"} width={50} height={50} className='w-[16px] h-[16px]' alt="Image" />
                    <p className='text-[16px] font-semibold'>Powerful Audience & Best course meterials</p>
                  </div>
                </div>
                <Button variant="primary" className="uppercase w-fit text-xs mt-4"> our Courses</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Best Service */}
        <section className='bg-[#F9F9F9]'>
          <div className='brand-container px-5 md:px-10'>
            <BestService ServiceCountdata={HomedataResponse.count} />
          </div>
        </section>

        {/* Course Explore */}
        <section className='bg-[#F9F9F9] py-8 md:py-12 lg:py-16'>
          <div className='brand-container'>
            <CourseExploreSection standards={HomedataResponse?.standard ?? []} courses={HomedataResponse?.cousers ?? []} />
          </div>
        </section>

        {/* About Us */}
        <section>
          <AboutSection />
        </section>

        <section className='bg-[#FCFCFC]'>
          <div className='brand-container bg-gradient-to-br from-[#fff] to-[#CCF4FF] from-0%'>
            {HomedataResponse?.testimonial.length !== 0 ?
              <TestimonialsSection testimonialData={HomedataResponse?.testimonial} />
              : <></>
            }
          </div>
        </section>

        {/* <section className='bg-[#FCFCFC] pt-6 md:pt-10'>
          <div className='brand-container py-10'>
            <NewsletterSection />
          </div>
        </section> */}

      </main>
    )
  } catch (error) {
    if (error?.status == 503) {
      redirect('/maintenance')
    }
    if (error?.status == 401) {
      const session = await getServerSession(authOptions);
      if (session) {
        signOut({ callbackUrl: '/' })
      }

    }

    return (
      <div className='brand-container py-10'>
        <h1 className="text-3xl font-bold mb-4"></h1>
        <p>Error Home page Data. Please try again later.</p>
      </div>
    );
  }


}

export default Home