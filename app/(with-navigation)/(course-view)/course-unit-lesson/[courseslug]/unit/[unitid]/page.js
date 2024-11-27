import CourseService from '@/app/services/api-services/course-service';
import { CourseBanner } from '@/app/utility/components/utility-components';
import { handlePageError } from '@/app/utility/errorHandler';
import React from 'react'
import UnitClientComponent from './component/unit-client-component';

export default async function UnitLesson({ params }) {
    try {
        const Response = (await CourseService.courseunitLessonView(params.courseslug, params.unitid)).data;
        const options = { students: `${Response?.people ?? 0} Students`, lessons: `${Response?.lecture_count ?? 0} Lessons`, rating: "4", reviews: "41" }
        return (
            <main className='bg-[#fcfcfc]'>
                <section>
                    <CourseBanner title={Response?.courses?.subject?.name} subtitle={Response?.courses?.name} product={options} />
                </section>
                

                    <UnitClientComponent lesson={Response?.unit?.lessons ?? []} lesson_count={Response?.lesson_count ?? 0} lecture_count={Response?.lecture_count ?? 0} />
                   

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
