import { AboutBanner } from '@/app/utility/components/utility-components'
import React from 'react'
import Filter from './filter'
import CourseService from '@/app/services/api-services/course-service';
import { generateQueryString } from '@/app/utility/helper';
import { handlePageError } from '@/app/utility/errorHandler';

export const metadata = {
  title: "Courses",
  description: "Learn more about our commitment to providing top-quality pest control services. With years of experience, our expert team is dedicated to safeguarding your home or business from pests using safe, eco-friendly methods. Discover how we can help you maintain a pest-free environment!",

};

const Course = async ({ searchParams }) => {
  try {
    const respSearchParamQuery = generateQueryString(searchParams)
    const CourseResponse = (await CourseService.list(respSearchParamQuery)).data;
    const standard = searchParams['standard[]'] ?? [];
    return (
      <main>
        <AboutBanner title={"our courses"} subtitle={"Explore our courses"} />
        <div>
          <Filter ResponseData={CourseResponse} subject={searchParams?.subject ?? ''} board={searchParams?.board ?? ''} standard={standard} />
        </div>
      </main>
    )
  } catch (error) {
    handlePageError(error)
  }
}

export default Course