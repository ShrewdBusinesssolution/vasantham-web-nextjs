import { AboutBanner } from '@/app/utility/components/utility-components'
import React from 'react'
import Filter from './filter'

export const metadata = {
  title: "Courses",
  description: "Learn more about our commitment to providing top-quality pest control services. With years of experience, our expert team is dedicated to safeguarding your home or business from pests using safe, eco-friendly methods. Discover how we can help you maintain a pest-free environment!",

};

const Course = () => {
  return (
    <main>
         <AboutBanner title={"our courses"} subtitle={"Explore our courses"}/> 
         <div>
         <Filter/>
         </div>
    </main>
  )
}

export default Course