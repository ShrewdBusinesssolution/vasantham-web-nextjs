import CourseService from '@/app/services/api-services/course-service';
import { CourseBanner } from '@/app/utility/components/utility-components';
import { handlePageError } from '@/app/utility/errorHandler';
import React from 'react'
import UnitClientComponent from './component/unit-client-component';

export default async function UnitLesson({ params }) {
    try {
        const Response = (await CourseService.courseunitLessonView(params.courseslug, params.unitid)).data;
        const options = { students: `${Response?.people ?? 0} Students`, lessons: `${Response?.lecture_count ?? 0} Lessons`, rating: "4", reviews: "41" }
        console.log("🚀 ~ UnitLesson ~ Response:", Response)
        console.log("🚀 ~ page ~ params:", Response)
        return (
            <main className='bg-[#fcfcfc]'>
                <section>
                    <CourseBanner title={Response?.courses?.subject?.name} subtitle={Response?.courses?.name} product={options} />
                </section>
                <UnitClientComponent />
               
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
