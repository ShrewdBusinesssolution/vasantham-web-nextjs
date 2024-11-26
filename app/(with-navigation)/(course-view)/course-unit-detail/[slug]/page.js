import CourseService from '@/app/services/api-services/course-service'
import { AddtoCartButton, CourseBanner } from '@/app/utility/components/utility-components'
import { handlePageError } from '@/app/utility/errorHandler';
import Image from 'next/image';
import React from 'react'
import { BsCart2 } from 'react-icons/bs';
import CourseUnitDetailclientComponent from './component/client-component-page';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
                {Response?.unit.length !== 0 ?

                    <CourseUnitDetailclientComponent unitdetails={Response?.unit} slug={params.slug} />
                    :
                    <div className='py-10 grid place-items-center'>
                        <div className='flex flex-col gap-5 items-center'>
                            <h5>No units Found</h5>
                            <Link href={'/'}>
                                <Button variant="primary">
                                    Home
                                </Button>
                            </Link>
                        </div>
                    </div>
                }


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
