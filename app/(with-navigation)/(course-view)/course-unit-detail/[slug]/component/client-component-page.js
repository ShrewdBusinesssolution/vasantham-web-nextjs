"use client"
import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { FiChevronDown } from 'react-icons/fi';
import { GoSearch } from 'react-icons/go';
import { Progress } from "@/components/ui/progress"
import { Button } from '@/components/ui/button';
import Link from 'next/link';


export default function CourseUnitDetailclientComponent({ unitdetails,slug }) {
    return (
        <>
            <section className="brand-container px-6 flex flex-col md:flex-row items-center md:items-center justify-between py-2 md:py-5">
                <div>
                    <h3 className="uppercase text-lg">UNITS</h3>
                </div>
                <div className="flex flex-col items-center md:flex-row gap-3 lg:gap-5">
                    <Popover className="absolute top-0 right-10">
                        <PopoverTrigger asChild>
                            <div className="relative w-fit gap-5 p-2 bg-white border rounded-full flex items-center justify-between cursor-pointer px-5">
                                <p className="text-sm font-medium text-nowrap uppercase"><span className='text-[#858585]'>sortby:</span> completed</p>
                                <FiChevronDown className="text-xl" />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit p-0 rounded-xl">
                            <div className="w-[150px] p-2 text-sm text-black">
                                <ul>
                                    <li className="w-full p-2 hover:bg-gradient-to-br from-white to-[#b9f8ee] from-20% rounded-[10px] shadow-sm">Completed</li>
                                    <li className="w-full p-2 hover:bg-gradient-to-br from-white to-[#b9f8ee] from-20% rounded-[10px] shadow-sm">On Going</li>
                                    <li className="w-full p-2 hover:bg-gradient-to-br from-white to-[#b9f8ee] from-20% rounded-[10px] shadow-sm">Yet to start</li>
                                </ul>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <div className="relative rounded-full p-1 pl-4 px-2 flex items-center gap-2 border-[1px] border-[#E9E9E9] bg-white w-full max-w-[300px]">
                        <input
                            type="text"
                            className="placeholder:text-[15px] placeholder:px-1 w-full text-black/40 focus:outline-none"
                            placeholder="search" />
                        <p className="bg-primary rounded-full p-[6px]">
                            <GoSearch className="w-5 h-5 text-white" />
                        </p>
                    </div>
                </div>
            </section>
            <section className='flex flex-col gap-5 brand-container py-5'>
                {unitdetails?.map((item, index) => (
                    <UnitCard key={index} data={item} linkSlug={slug} />
                ))}
            </section>
        </>
    )
}

const UnitCard = ({ data, linkSlug }) => {
    return (
        <div className=" rounded-lg bg-[#f7f7f7] border border-[#E9E9E9]">
            <div className="p-5 flex flex-col md:flex-row justify-between max-md:items-start items-center">
                <div className="flex flex-col gap-4">
                    <div className="flex  items-center gap-2">
                        <h3 className="text-[20px] font-medium text-nowrap text-[#535967]">Unit {data?.unit_number}</h3>
                        {/* <p className="p-1 text-sm text-white px-4 bg-green-600 rounded-full">
                            Completed
                        </p> */}

                    </div>
                    <h3 className="text-[22px] md:text-[24px] text-[#222222]">
                        {data?.name}
                    </h3>
                </div>

                <div className="flex flex-col items-start md:items-center justify-start">
                    {/* <div className="flex flex-row justify-center items-center gap-2 mt-2 md:mt-0">
                        <Progress value={40} className="h-4 bg-green-400 w-[170px]" />
                        <p>100%</p>
                    </div> */}
                    <Link href={`/course-unit-lesson/${linkSlug}/unit/${data.id}`}>
                    <Button variant="primary" className="uppercase text-sm">start unit</Button>
                    </Link>

                </div>
            </div>
        </div>
    )
}