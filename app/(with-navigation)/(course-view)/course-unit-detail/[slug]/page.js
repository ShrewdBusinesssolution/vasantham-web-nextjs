import CourseService from '@/app/services/api-services/course-service'
import { AddtoCartButton, CourseBanner } from '@/app/utility/components/utility-components'
import { handlePageError } from '@/app/utility/errorHandler';
import Image from 'next/image';
import React from 'react'
import { BsCart2 } from 'react-icons/bs';
import CourseUnitDetailclientComponent from './component/client-component-page';

export default async function CourseUnitview({ params }) {

    try {
        const Response = (await CourseService.courseunitView(params.slug)).data;
        const options = { students: `${Response?.people ?? 0} Students`, lessons: `${Response?.lecture_count ?? 0} Lessons`, rating: "4", reviews: "41" }
        return (
            <main className='bg-[#fcfcfc]'>
                {/* Banner */}
                <section>
                    <CourseBanner title={Response?.subject?.name} subtitle={Response?.name} product={options} />
                </section>
                <CourseUnitDetailclientComponent unitdetails={Response?.unit} slug={params.slug} />


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
