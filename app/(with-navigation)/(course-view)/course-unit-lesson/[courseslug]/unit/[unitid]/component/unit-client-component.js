"use client"
import React, { useState, useEffect } from 'react'
import { Line } from "rc-progress";
import { Progress } from "@/components/ui/progress"
import { RiCheckDoubleFill } from 'react-icons/ri';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LuDot } from "react-icons/lu";
import { MdArrowDownward } from 'react-icons/md';
import VideoModal from '@/app/utility/components/video-modal';
import Link from 'next/link';

import { FaArrowDown } from "react-icons/fa6";


export default function UnitClientComponent({ lesson, lesson_count, lecture_count }) {

    return (
        <section className='brand-container flex flex-col py-10 '>
            <p className='text-[#B0B0B0] text-lg'>{lesson_count} Section. {lecture_count} lectures</p>

            <Accordion lesson={lesson} />


        </section>
    )
}






const Accordion = ({ lesson }) => {
    const [activeIndices, setActiveIndices] = useState([]);

    const toggleItem = (index) => {
        if (activeIndices.includes(index)) {
            // If index is already active, remove it from the array
            setActiveIndices(activeIndices.filter((i) => i !== index));
        } else {
            // If index is not active, add it to the array
            setActiveIndices([...activeIndices, index]);
        }
    };

    return (
        <section className="mt-5">
            <div className="w-full">
                <div className=" space-y-4 ">
                    {lesson?.map((item, index) => (
                        <div
                            key={index}
                            className={`transition-all duration-200 bg-[#f7f7f7] border border-gray-200 shadow-lg cursor-pointer rounded-lg ${activeIndices.includes(index) ? "hover:bg-gray-100" : "hover:bg-gray-50"
                                }`}
                        >
                            <button
                                type="button"
                                onClick={() => toggleItem(index)}
                                className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                            >
                                <span className="flex text-lg font-semibold text-black">
                                    {item.name}
                                </span>
                                <div className='flex gap-3 items-center'>
                                    <ProgressBar percentage={item.read_percentage} />
                                    <FaArrowDown
                                        className={`w-6 h-6 text-gray-400 transform transition-all duration-300 ${activeIndices.includes(index) ? "rotate-180" : ""
                                            }`}
                                    />
                                </div>
                            </button>

                            <div
                                className={`${activeIndices.includes(index) ? "block" : "hidden"
                                    } px-4 pb-5 sm:px-6 sm:pb-6 space-y-3`}
                            >
                                {item?.lectures?.map((data, index) => (

                                    <List key={index} data={data} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const List = ({ data }) => {
    return (
        <div className='flex flex-row justify-between gap-2 items-center'>
            <div className='flex flex-row gap-4 items-center'>
                {data?.viewed ?
                    <RiCheckDoubleFill className='text-[#07A858]' size={22} />
                    :
                    <LuDot size={22} />
                }
                <p className={`${data?.viewed ? 'text-[#07A858]' : ''} text-[18px] font-medium`}>{data?.name}</p>
            </div>
            <div className='flex flex-row items-center gap-3'>
                {data?.viewed ?
                    <Link href="/test/1">
                        <Button variant="primary" className="uppercase">take test</Button>
                    </Link>
                    : null}
                <div className='bg-[#E9E9E9] p-2 rounded-full'>
                    <Image src="/assets/svg/video.svg" width={22} height={22} alt="video_icon" className="" />
                </div>
            </div>
        </div>
    )
}

const ProgressBar = ({ percentage }) => {

    return (
        <div className="w-fit flex gap-2 items-center">
            <div className="w-[10vw] bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-[#00FFD5] to-[#00FF44] h-3 rounded-full" style={{ width: `${percentage}%` }}></div>
            </div>
            <p className="mt-2 text-sm text-center text-gray-600">{percentage}% </p>
        </div>
    )

}