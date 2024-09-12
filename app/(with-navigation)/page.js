import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HeadingSection } from '../utility/components/utility-components'
import WhyChooseCard from '../utility/components/home/whychoose-card'

const Home = () => {
  return (
    <main>
      {/* Banner */}
      <section className='flex flex-col justify-center py-16 md:py-24 bg-cover md:bg-bottom relative overflow-hidden' style={{ backgroundImage: `url("/assets/basic/home-banner.webp")` }}>
          <div className="relative z-10 brand-container px-5 md:px-10 flex flex-col gap-6 md:gap-8">
            {/* Text */}
            <h6 className='text-[#07A889] font-medium uppercase text-[15px]'>Expert Instruction</h6>
            <h2 className='text-white lg:w-3/5 xl:w-3/5 leading-normal'>Making learning easy with 
            our best platform!</h2>
            <p className='text-[14px] md:text-lg text-white lg:w-3/5 xl:w-3/5'>Education empowers humanity by unlocking the potential within every individual, enabling personal growth and societal progress. </p>
           {/* Buttons */}
           <div className='flex flex-col md:flex-row gap-3'>
            <Link href={'/courses'}>
              <Button variant="primary" size="lg" className="rounded-sm uppercase">
              Book Free session
              </Button>
            </Link>
            <Link href={'/courses'}>
              <Button variant="primary" size="lg" className="bg-[#07A889] rounded-sm uppercase">
              Learn More
              </Button>
            </Link>
            </div>
          </div>
        </section>

        <section className='brand-container'>
          <HeadingSection title="Why choose us" subtitle='Why choose our courses?'/>
          <WhyChooseCard/>
        </section>

    </main>
  )
}

export default Home