import React from 'react'
import { CourseBanner } from '@/app/utility/components/utility-components'
import SubjectUnit from './subject-units'
import Chapters from './chapters'

const CourseView = () => {
const productData = {
    students: "1500 Students",
    lessons: "10 lessons",
    rating: "4.5",
    reviews:"41"
}

  return (
    <main>
        {/* Banner */}
        <section>
            <CourseBanner title="Design" subtitle="Photography Crash Course for
Photographer" product={productData}/>
        </section>

        <section className="pt-16 bg-[#FCFCFC]">
        <SubjectUnit/>
        </section>

        <section>
        <Chapters/>
        </section>
    </main>
  )
}

export default CourseView