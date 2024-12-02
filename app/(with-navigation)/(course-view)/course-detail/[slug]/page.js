import CourseService from '@/app/services/api-services/course-service'
import RelatedCourse from '@/app/utility/components/related-course';
import { AddtoCartButton, CourseBanner } from '@/app/utility/components/utility-components'
import { handlePageError } from '@/app/utility/errorHandler';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react'
import { BsCart2 } from 'react-icons/bs';

export default async function CourseView({ params }) {

    try {
        const Response = (await CourseService.courseDetailWalkingStudent(params.slug)).data;
        const options = { students: `${Response?.people ?? 0} Students`, lessons: `${Response?.lecture_count ?? 0} Lessons`, rating: "4", reviews: "41" }
        return (
            <main className='bg-[#fcfcfc]'>
                {/* Banner */}
                <section>
                    <CourseBanner title={Response?.subject?.name} subtitle={Response?.name} product={options} />
                </section>

                <section className='brand-container py-10 '>
                    <h3 className="uppercase text-secondary text-sm mb-5">About course</h3>
                    <div className="flex flex-col md:flex-row items-start justify-between gap-5">
                        {/* Left side */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-[#222] text-[32px]">Course Overview</h4>
                            <p className="text-[#222] font-medium text-[16px] w-full ">
                                {Response?.overview}
                            </p>
                        </div>
                        {/* Right side */}
                        <div className="bg-gradient-to-br from-[#fff] to-[#CCF4FF] p-5 rounded-xl flex flex-col gap-4 max-md:w-full">
                            <h3 className="text-sm text-secondary uppercase">Fee Details</h3>
                            <p className="font-bold text-[26px]">₹ {Response?.sale_price} <span className="pl-1 font-semibold text-lg line-through text-gray-400">₹ {Response?.price}</span></p>
                            <h3 className="text-sm text-secondary uppercase mt-2">Duration</h3>
                            <p className="font-bold text-[26px]">24 Hrs</p>
                            {/* Button */}
                            <AddtoCartButton product_id={Response?.id ?? 1} bought={Response?.bought} slug={params.slug} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 mt-10">
                        <h4 className="text-[#222] text-[32px]">What you&apos;ll learn</h4>
                        <div className='flex flex-col gap-2'>
                            {Response.what_you_learn?.map((text, index) => (
                                <div key={index} className='flex items-center gap-4'>
                                    <Image src={"/assets/svg/tick.svg"} width={50} height={50} className='w-[16px] h-[16px]' alt="Tick" />
                                    <p className='text-[16px] font-semibold'>{text}</p>
                                </div>
                            ))}

                        </div>
                    </div>
                </section>
                {Response?.similar_course?.length > 0 && (
                    <section className="brand-container">
                        <RelatedCourse course={Response.similar_course} />
                    </section>
                )}

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
