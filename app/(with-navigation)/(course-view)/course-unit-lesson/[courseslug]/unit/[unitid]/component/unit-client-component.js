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


export default function UnitClientComponent() {
    return (
        <section className='brand-container flex flex-col py-10 '>
            <p className='text-[#B0B0B0] text-lg'>32 Section. 272 lectures</p>
            <div className='mt-4 flex flex-row justify-between p-4 rounded-lg bg-[#f7f7f7] border border-[#E9E9E9]'>
                <h5 className='text-[20px]'>Types of photography</h5>
                <div className="flex flex-row justify-center items-center gap-2">
                    <Progress value={90} className="h-2 bg-[#00FFD5] bg-gradient-to-l from-[#00FF44] to-70% w-[170px]" />
                    <p>100%</p>
                </div>
            </div>

            {/* Introduction Photography */}
            <div className='mt-4 p-4 rounded-lg bg-[#f7f7f7] border border-[#E9E9E9]'>
                <div className='flex flex-row justify-between border-b'>
                    <h5 className='text-[20px]'>Introduction to Photography</h5>
                    <div className="flex flex-row justify-center items-center gap-2">
                        <Progress value={90} className="h-2 bg-[#00FFD5] bg-gradient-to-l from-[#00FF44] to-70% w-[170px]" />
                        <p>75%</p>
                    </div>
                </div>
                {/* video section */}
                <div className='flex flex-col gap-4 mt-5'>
                    {/* Score */}
                    <div className='flex flex-row justify-between gap-2 items-center'>
                        <div className='flex flex-row gap-4 items-center'>
                            <RiCheckDoubleFill className='text-[#07A858]' size={22} />
                            <p className='text-[#07A858] text-[18px] font-medium'>Powerful Audience & Best course materials</p>
                        </div>
                        <div className='flex flex-row items-center gap-3 cursor-pointer'>
                            <h4 className='text-[16px] text-[#222] font-medium'>Score : <span className='font-medium text-secondary'>90</span></h4>
                            <VideoModal />
                        </div>
                    </div>
                    {/* Take Test */}
                    <div className='flex flex-row justify-between gap-2 items-center'>
                        <div className='flex flex-row gap-4 items-center'>
                            <RiCheckDoubleFill className='text-[#07A858]' size={22} />
                            <p className='text-[#07A858] text-[18px] font-medium'>Powerful Audience & Best course materials</p>
                        </div>
                        <div className='flex flex-row items-center gap-3'>
                            <Link href="/test">
                                <Button variant="primary" className="uppercase">take test</Button>
                            </Link>
                            <div className='bg-[#E9E9E9] p-2 rounded-full'>
                                <Image src="/assets/svg/video.svg" width={22} height={22} alt="video_icon" className="" />
                            </div>
                        </div>
                    </div>
                    {/* 3 */}
                    <div className='flex flex-row justify-between gap-2 items-center'>
                        <div className='flex flex-row gap-4 items-center'>
                            <LuDot size={22} />
                            <p className='text-[18px] font-medium'>Powerful Audience</p>
                        </div>
                        <div className='flex flex-row items-center gap-3'>
                            <div className='bg-[#E9E9E9] p-2 rounded-full'>
                                <Image src="/assets/svg/video.svg" width={22} height={22} alt="video_icon" className="" />
                            </div>
                        </div>
                    </div>
                    {/* 4 */}
                    <div className='flex flex-row justify-between gap-2 items-center'>
                        <div className='flex flex-row gap-4 items-center'>
                            <LuDot size={22} />
                            <p className='text-[18px] font-medium'>Segmentation of photography</p>
                        </div>
                        <div className='flex flex-row items-center gap-3'>
                            <div className='bg-[#E9E9E9] p-2 rounded-full'>
                                <Image src="/assets/svg/video.svg" width={22} height={22} alt="video_icon" className="" />
                            </div>
                        </div>
                    </div>
                    {/* 5 */}
                    <div className='flex flex-row justify-between gap-2 items-center'>
                        <div className='flex flex-row gap-4 items-center'>
                            <LuDot size={22} />
                            <p className='text-[18px] font-medium'>Wildlife Photography Introducion </p>
                        </div>
                        <div className='flex flex-row items-center gap-3'>
                            <div className='bg-[#E9E9E9] p-2 rounded-full'>
                                <Image src="/assets/svg/video.svg" width={22} height={22} alt="video_icon" className="" />
                            </div>
                        </div>
                    </div>
                    {/* 6 */}
                    <div className='flex flex-row justify-between gap-2 items-center'>
                        <div className='flex flex-row gap-4 items-center'>
                            <LuDot size={22} />
                            <p className='text-[18px] font-medium'>Powerful Audience & Best course materials</p>
                        </div>
                        <div className='flex flex-row items-center gap-3'>
                            <div className='bg-[#E9E9E9] p-2 rounded-full'>
                                <Image src="/assets/svg/video.svg" width={22} height={22} alt="video_icon" className="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Next Typography */}
            <div className='mt-4 flex flex-row justify-between p-3 rounded-lg bg-[#f7f7f7] border border-[#E9E9E9]'>
                <h5 className='text-[20px]'>Laws of Photography</h5>
                <div className="flex flex-row justify-center items-center gap-2">
                    <MdArrowDownward size={22} />
                </div>
            </div>

            <div className='mt-4 flex flex-row justify-between p-3 rounded-lg bg-[#f7f7f7] border border-[#E9E9E9]'>
                <h5 className='text-[20px]'>Powerful Audience</h5>
                <div className="flex flex-row justify-center items-center gap-2">
                    <MdArrowDownward size={22} />
                </div>
            </div>

            <div className='mt-4 flex flex-row justify-between p-3 px-3 rounded-lg bg-[#f7f7f7] border border-[#E9E9E9]'>
                <h5 className='text-[20px]'>Conclusion</h5>
                <div className="flex flex-row justify-center items-center gap-2">
                    <MdArrowDownward size={22} />
                </div>
            </div>
        </section>
    )
}
