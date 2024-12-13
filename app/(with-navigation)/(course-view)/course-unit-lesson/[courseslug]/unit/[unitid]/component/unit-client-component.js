"use client"
import React, { useState, useEffect } from 'react'
import { Line } from "rc-progress";
import { Progress } from "@/components/ui/progress"
import { RiCheckDoubleFill } from 'react-icons/ri';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LuDot, LuLoader2 } from "react-icons/lu";
import { MdArrowDownward } from 'react-icons/md';
import VideoModal from '@/app/utility/components/video-modal';
import Link from 'next/link';

import { FaArrowDown } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import VideoService from '@/app/services/api-services/video-service';


export default function UnitClientComponent({ lesson, lesson_count, lecture_count }) {
    const router = useRouter();

    return (
        <section className='brand-container flex flex-col py-10 '>
            <p className='text-[#B0B0B0] text-lg'>{lesson_count} Lessons. {lecture_count} lectures</p>
            {lesson?.length !== 0
                ?
                <Accordion lesson={lesson} />
                :
                <div className='py-10 grid place-items-center'>
                    <div className='flex flex-col gap-5 items-center'>
                        <h5>No Lessons Found</h5>

                        <Button onClick={() => router.back()} variant="primary">
                            Back
                        </Button>

                    </div>
                </div>
            }


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
                                <span className=" flex-1 text-lg font-semibold text-black text-left">
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
    console.log("🚀 ~ List ~ data:", data)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    return (
        <div className='flex max-sm:flex-col flex-row max-sm:items-start justify-between gap-2 gap-y-5 items-center'>
            <div className='flex flex-row gap-4 items-center justify-start'>
                {data?.viewed ?
                    <RiCheckDoubleFill className='text-[#07A858] aspect-square text-5xl' size={22} />
                    :
                    <LuDot size={22} className='' />
                }
                <p className={`${data?.viewed ? 'text-[#07A858]' : ''} text-[18px] font-medium flex-1 line-clamp-2`}>{data?.name}</p>
            </div>
            <div className='flex flex-row items-center gap-3'>
                {data?.viewed && (data?.score === 0 || data?.score == null) ? (
                    <Link href={`/test/${data?.id}`}>
                        <Button variant="primary" className="uppercase">Take Test</Button>
                    </Link>
                ) : (
                    <p className='whitespace-nowrap'>{data?.score !== 0 && data?.score != null ? `${data?.score} %` : null}</p>
                )}
                <div className=' w-[40px]'>
                <div onClick={toggleModal} className='bg-[#E9E9E9] p-2 rounded-full flex-1'>
                    <Image src="/assets/svg/video.svg" width={22} height={22} alt="video_icon w-[22px] h-auto" className="" />
                </div>
                </div>
            </div>
            <VideoIfram OpenHandler={toggleModal} openFlag={isModalOpen} title={data?.name} id={data?.video_id} />
        </div>
    )
}

const ProgressBar = ({ percentage }) => {

    return (
        <div className="w-fit flex gap-2 items-center">
            <div className="w-[10vw] bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-[#00FFD5] to-[#00FF44] h-3 rounded-full" style={{ width: `${percentage}%` }}></div>
            </div>
            <p className="mt-0 text-sm text-center text-gray-600 w-[20px]">{percentage}% </p>
        </div>
    )

}


const VideoIfram = ({ OpenHandler, openFlag, title, id }) => {
    const [loading, setLoading] = useState(true);
    const [videoData, setVideoData] = useState({});

    const GetVideoInformation = async () => {
        try {
            const payload = { video_id: id };
            console.log("🚀 ~ GetVideoInformation ~ payload:", payload);
            const response = await VideoService.GetVideData(payload);
            if (response.status) {
                setVideoData(response.data);
            }
        } catch (error) {
            console.error("🚀 ~ GetVideoInformation ~ error:", error);
        } finally {
            setLoading(false);
        }
    };

    const closeHandling = () =>{
        OpenHandler();
        window.location.reload();
    }

    useEffect(() => {
        if (openFlag && id !== '') {
            GetVideoInformation();
            document.body.style.overflow = "hidden"; // Disable scrolling
        } else {
            document.body.style.overflow = "auto"; // Enable scrolling
        }
        return () => {
            document.body.style.overflow = "auto"; // Ensure scrolling is re-enabled on unmount
        };
    }, [openFlag]);

    return (
        <>
            {/* Modal */}
            {openFlag && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    {id ? (
                        <div className="bg-white rounded-xl p-4 w-[90%] md:w-[60%] relative">
                            {loading ? (
                                <div className="grid place-items-center py-20  ">
                                    <LuLoader2 className="animate-spin text-primary" size={30} />
                                </div>
                            ) : (
                                <>
                                    <h5 className='line-clamp-1 mb-2 overflow-hidden'>{title}</h5>
                                    <iframe
                                        className="rounded-xl"
                                        src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp ?? ""}&playbackInfo=${videoData?.playbackInfo}`}
                                        style={{ width: "100%", height: "50vh" }}
                                        allowFullScreen={true}
                                        allow="encrypted-media"
                                    ></iframe>
                                </>
                            )}
                            <div className="flex justify-end pt-3">
                                <Button
                                    onClick={closeHandling}
                                    className="font-bold"
                                    variant="secondary"
                                >
                                    CLOSE VIDEO
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl p-4 w-[90%] md:w-[60%] relative">
                            <p className="font-medium">{title}</p>
                            <div className="grid place-items-center py-20">
                                <p>Video Not Available</p>
                            </div>
                            <div className="flex justify-end pt-3">
                                <Button
                                    onClick={OpenHandler}
                                    className="font-bold"
                                    variant="secondary"
                                >
                                    CLOSE VIDEO
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

