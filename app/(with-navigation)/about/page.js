import { AboutBanner, HeadingSection } from '@/app/utility/components/utility-components'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import BasicService from '@/app/services/api-services/basic-service'
import { handlePageError } from '@/app/utility/errorHandler'

export const metadata = {
  title: "About",
  description: "Learn more about our commitment to providing top-quality pest control services. With years of experience, our expert team is dedicated to safeguarding your home or business from pests using safe, eco-friendly methods. Discover how we can help you maintain a pest-free environment!",

};

const About = async () => {

  try {
    const responseAboutData = await BasicService.AboutPage();

    return (
      <main>
      {/* Banner */}
      <AboutBanner title={"Know about us"} subtitle={"Grow strong to take up the challenges of life."} />
      {/* Our Service */}
      <section className='bg-[#FCFCFC] pt-10'>
        <div className='brand-container flex flex-col md:flex-col lg:flex-row xl:flex-row max-lg:gap-5  gap-20 items-center justify-between max-lg:px-5 px-20'>
          {/* left */}
          <div className='flex flex-col gap-5'>
            <h4 className='uppercase text-secondary text-sm font-medium'>Our services</h4>
            <h3 className='text-[32px] mt-4'>Get Instant Access Pro Courses</h3>
            <p className='text-sm text-[#222222]  leading-6 first-letter:ml-10 text-justify'>Our institution aims to expand our hands to the students anywhere, anytime. Educating, exploring, and expanding the freedom of the students is our intention. Future is the combination of man and medium. Here, we become the medium to reach the dream of the students. Kids find exams as their frightful flight. Our Institution and our experts become a guide to make their adventure way more effortless and engrossing. Questioning openly, sharing their independent thoughts are encouraged. Having the potential to get good marks is a skill, anyone can acquire with our guidance. We have been guiding the students for more than 15 years under time and space limits.</p>
            <p className='text-sm text-[#222222] mt-2  leading-6 first-letter:ml-10 text-justify'>Students get counseling for their future endeavors and our institution stands as a pillar to our student’s growth. We pay special attention to the books, so we mobilize our materials created by the experts on time. Social circumstances are not a bane to the education and enrichment of the students anymore. Expert lectures and easy communication make the complex subject engaging. Practice tests, personalized reports, and our expert’s understanding of students make exams easier. We are devoted to creating an exceptional future with our services. We starting with Maths classes online in Tamil.</p>
          </div>
          {/* right */}
          <Image src={"/assets/about/about-1.webp"} className="w-auto h-[350px] md:w-[400px] md:h-[402px] rounded-xl" width={500} height={500} alt="Image" />
        </div>
      </section>

      {/* How it work */}
      <section className='bg-[#FCFCFC] py-10 md:py-16 lg:py-20'>
        <div className='brand-container flex  max-lg:flex-col-reverse flex-row max-lg:gap-5  gap-20 max-lg:items-center items-start justify-between max-lg:px-5 px-20'>
          {/* left */}
          <Image src={"/assets/about/about-2.webp"} className="w-auto h-[350px] md:w-[400px] md:h-[402px] rounded-xl" alt="Images" width={500} height={500} />
          {/* right */}
          <div className='flex flex-col gap-2 w-full'>
            <h4 className='uppercase text-secondary text-sm font-medium'>How it works</h4>
            <h5 className=''>Upgrade Your Skill Upgrade Your Life</h5>
            <p className='text-sm text-[#222222] w-full  leading-6 mt-4  first-letter:ml-10 text-justify'>Our institution aims to expand our hands to the students anywhere, anytime. Educating, exploring, and expanding the freedom of the students is our intention. Future is the combination of man and medium. Here, we become the medium to reach the dream of the students. Kids find exams as their frightful flight. Our Institution and our experts become a guide to make their adventure way more effortless and engrossing. Questioning openly, sharing their independent thoughts are encouraged. Having the potential to get good marks is a skill, anyone can acquire with our guidance. We have been guiding the students for more than 15 years under time and space limits.</p>
          </div>
        </div>
      </section>


      {/* Staffs  section*/}
      <section className='bg-gradient-to-br from-[#fff] to-[#CCF4FF] from-0%'>
        {/* Heading */}
        <div className='py-10'>
          <HeadingSection title="THE GUYS BEHIND THE CURTAINS" subtitle="Whose Inspirations You Love" />
        </div>
        {/* ProductCard */}
        <div className='brand-container'>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-5 px-4 md:px-6 lg:px-10 pb-10">
            {responseAboutData?.team?.map((item,index)=>(
              <StaffCard key={index} staff={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Join With Us */}
      <section className="bg-white py-10">
        <div className=' rounded-2xl p-6 md:p-10 bg-[#F7F7F7] brand-container '>
          <div className="flex flex-col justify-center items-center space-y-4 ">
            <div className="text-sm font-semibold leading-loose text-secondary uppercase tracking-[2px]">
              join with us
            </div>
            <h2 className="text-lg md:text-[22px] lg:text-[24px] font-bold leading-normal text-center text-neutral-800 px-5 w-full">
            Attend our assessment to get to know your subject knowledge
            </h2>
            <Link href={'/courses'}>
            <Button variant="primary" className="w-fit text-sm font-medium text-center text-white uppercase bg-primary rounded-md">
              Get started now
            </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
    )
} catch (error) {
    const errorMessage = await handlePageError(error);
    return (
        <>
            {errorMessage}
        </>
    )
}

}

export default About


const StaffCard = ({ staff }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden w-full p-3">
      {/* Image */}
      {/* <div className="relative w-full"> */}
        <Image
          src={staff.image}
          width={300}
          height={300}
          alt="product"
          className="object-cover object-top aspect-square w-full h-auto rounded-md"
        />
      {/* </div> */}
      <div className="text-center space-y-3 mt-3 py-2">
        <h3 className="text-[17px] font-medium line-clamp-2">{staff.name}</h3>
        <p className="text-[14px] leading-normal font-light text-[#B5B6B5] line-clamp-2">
          {staff.designation}
        </p>
      </div>
    </div>
  )
}