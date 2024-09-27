import { CourseBanner } from '@/app/utility/components/utility-components'
import React from 'react'
import AboutCourse from './about-course'
import SectionLecture from './section-lecture'
import RelatedCourse from '@/app/utility/components/related-course'

const UnitDetail = () => {
    const productData = {
        students: "1500 Students",
        lessons: "6 lessons",
        rating: "4.5",
        reviews:"30"
    }

  return (
   <main className='bg-[#fcfcfc]'>
    {/* Banner */}
    <section>
            <CourseBanner title="Design" subtitle="Photography Crash Course for
Photographer" product={productData}/>
        </section>

{/* AboutSection */}
      <section className='brand-container'>
        <AboutCourse/>
      </section>
{/* Section & Lecture */}
      <section className="brand-container">
        <SectionLecture/>
      </section>
{/* Related Courses */}
      <section className="brand-container">
        <RelatedCourse/>
      </section>
         </main>
  )
}

export default UnitDetail