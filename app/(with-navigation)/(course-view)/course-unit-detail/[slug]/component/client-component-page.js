"use client"
import React, { useEffect, useRef, useState } from 'react'
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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import CourseService from '@/app/services/api-services/course-service';
import { LuLoader2 } from 'react-icons/lu';


export default function CourseUnitDetailclientComponent({ unitdetails, slug }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const queryParams = new URLSearchParams(searchParams);
    const router = useRouter();
    const timeoutRef = useRef(null); // Ref to store the timeout ID
    const [loading, setLoading] = useState(false);
    const [popoverOpen, setpopoverOpen] = useState(false);
    const [sortBy, setsortBy] = useState('');

    const handleSortby = (type) => {
        if (type === 'clear') {
            setsortBy('')
            handleParams('sortby', null, true);

        } else {
            setsortBy(type);
            handleParams('sortby', type)
        }

        setpopoverOpen(false)

    };



    const [unitInformation, setUnitInformation] = useState(unitdetails ?? []);
    // const Response = (await CourseService.courseunitView(params.slug)).data;

    //INFO STANDARD SECTION
    const [searchData, setSearchData] = useState('');




    // Handle search input changes with debounce
    const handleSearchChange = (event) => {
        const newSearchData = event.target.value;
        setSearchData(newSearchData);
        setLoading(true)


        // Clear the previous timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (newSearchData.trim().length === 0) {
            setLoading(false)
            handleParams('search', null, true);

        }

        // Set a new timeout
        timeoutRef.current = setTimeout(() => {
            handleParams('search', newSearchData);
        }, 300); // Delay of 300ms
    };


    // Handle the query parameter updates
    const handleParams = (type, data, dl = false) => {
        console.log("🚀 ~ handleParams ~ dl:", dl)
        // Clone the queryParams to avoid direct mutation
        const newQueryParams = new URLSearchParams(queryParams.toString());

        switch (type) {
            case 'search':
                if (dl) {
                    newQueryParams.delete('search');  // Delete the 'search' parameter
                } else if (newQueryParams.has('search')) {
                    newQueryParams.set('search', data);  // Update existing parameter
                } else {
                    newQueryParams.append('search', data);  // Add new parameter
                }
                break;
            case 'sortby':
                if (dl) {
                    newQueryParams.delete('viewed_status');  // Delete the 'viewed_status' parameter
                } else if (newQueryParams.has('viewed_status')) {
                    newQueryParams.set('viewed_status', data);  // Update existing parameter
                } else {
                    newQueryParams.append('viewed_status', data);  // Add new parameter
                }
                break;
            default:
                break;
        }

        // Push the updated query parameters to the router without scrolling or re-rendering unnecessarily
        router.push(
            `${pathname}?${newQueryParams.toString()}`,
            undefined,
            { shallow: true, scroll: false } // `shallow: true` helps avoid data re-fetch
        );

        // Call GetData to fetch or process the new data without affecting the UI scroll
        GetData(newQueryParams.toString());
    };

    const GetData = async (paramData) => {
        try {

            const response = await CourseService.courseunitView(slug, paramData);

            if (response.status) {
                setUnitInformation(response?.data?.unit)
            }
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    // Cleanup timeout on component unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);



    return (
        <>
            <section className="brand-container px-6 flex flex-col md:flex-row items-center md:items-center justify-between py-2 md:py-5">
                <div>
                    <h3 className="uppercase text-lg">UNITS</h3>
                </div>
                <div className="flex flex-col items-center md:flex-row gap-3 lg:gap-5">
                    <Popover open={popoverOpen} onOpenChange={setpopoverOpen} className="absolute top-0 right-10">
                        <PopoverTrigger asChild>
                            <div className="relative w-fit gap-5 p-2 bg-white border rounded-full flex items-center justify-between cursor-pointer px-5">
                                <p className="text-sm font-medium text-nowrap uppercase">
                                    <span className="text-[#858585]">Sort by:</span> {sortBy ? sortBy : "None"}
                                </p>
                                <FiChevronDown className="text-xl" />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit p-0 rounded-xl">
                            <div className="w-[150px] p-2 text-sm text-black">
                                <ul>
                                    {sortBy !== '' ? (
                                        <li
                                            onClick={() => handleSortby('clear')}
                                            className="w-full p-2 hover:bg-gradient-to-br from-white to-[#b9f8ee] from-20% rounded-[10px] shadow-sm"
                                        >
                                            Clear
                                        </li>
                                    ) : (
                                        <li
                                            onClick={() => handleSortby('clear')}
                                            className="w-full p-2 hover:bg-gradient-to-br from-white to-[#b9f8ee] from-20% rounded-[10px] shadow-sm"
                                        >
                                            None
                                        </li>
                                    )}
                                    <li
                                        onClick={() => handleSortby('on-going')}
                                        className="w-full p-2 hover:bg-gradient-to-br from-white to-[#b9f8ee] from-20% rounded-[10px] shadow-sm"
                                    >
                                        On Going
                                    </li>
                                    <li
                                        onClick={() => handleSortby('completed')}
                                        className="w-full p-2 hover:bg-gradient-to-br from-white to-[#b9f8ee] from-20% rounded-[10px] shadow-sm"
                                    >
                                        Completed
                                    </li>
                                    <li
                                        onClick={() => handleSortby('yet-to-start')}
                                        className="w-full p-2 hover:bg-gradient-to-br from-white to-[#b9f8ee] from-20% rounded-[10px] shadow-sm"
                                    >
                                        Yet to Start
                                    </li>
                                </ul>
                            </div>
                        </PopoverContent>
                    </Popover>


                    <div className="relative rounded-full p-1 pl-4 px-2 flex items-center gap-2 border-[1px] border-[#E9E9E9] bg-white w-full max-w-[300px]">
                        <input
                            type="text"
                            value={searchData}
                            onChange={handleSearchChange}
                            className="placeholder:text-[15px] placeholder:px-1 w-full text-black/40 focus:outline-none"
                            placeholder="search" />
                        <p className="bg-primary rounded-full p-[6px]">
                            {loading ? <LuLoader2 className="max-sm:h-3 max-sm:w-3 w-5 h-5 text-white animate-spin" /> : <GoSearch className="max-sm:h-3 max-sm:w-3 w-5 h-5 text-white" />}
                        </p>
                    </div>
                </div>
            </section>
            <section className='flex flex-col gap-5 brand-container py-5'>
                {unitInformation?.map((item, index) => (
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
                        <UnitStatus percentage={data?.viewed_percentage} />

                    </div>
                    <h3 className="text-[22px] md:text-[24px] text-[#222222]">
                        {data?.name}
                    </h3>
                </div>

                <div className="flex flex-row gap-5 items-start md:items-center justify-start">
                    <div className="flex flex-row justify-center items-center gap-2 mt-2 md:mt-0">
                        {data?.viewed_percentage !== 0 ? <ProgressBar percentage={data?.viewed_percentage} /> : null}
                    </div>
                    {data?.viewed_percentage === 0
                        ?
                        <Link href={`/course-unit-lesson/${linkSlug}/unit/${data.id}`}>
                            <Button variant="primary" className="uppercase text-sm">start unit</Button>
                        </Link>
                        : null}


                </div>
            </div>
        </div>
    )
}

const ProgressBar = ({ percentage }) => {

    return (
        <div className="w-fit flex gap-2 items-center">
            <div className="w-[10vw] bg-gray-200 rounded-full h-3">
                {percentage !== 0 && percentage < 100 ?
                    <div className="bg-gradient-to-r from-[#FF7300] via-[#FC7B00] to-[#E1CA00] h-3 rounded-full" style={{ width: `${percentage}%` }}></div>
                    :
                    <div className="bg-gradient-to-r from-[#00FFD5] to-[#00FF44] h-3 rounded-full" style={{ width: `${percentage}%` }}></div>
                }
            </div>
            <p className="">{percentage}% </p>
        </div>
    )

}


const UnitStatus = ({ percentage }) => {
    let statusText = '';
    let inlineStyles = {
        backgroundColor: '',
        color: '',
    };

    if (percentage === 0) {
        statusText = 'Not Yet Started';
        inlineStyles = {
            backgroundColor: '#E7E7E7',  // Tailwind equivalent: bg-gray-600
            color: 'black',            // Tailwind equivalent: text-white
        };
    } else if (percentage > 0 && percentage < 100) {
        statusText = 'On Going';
        inlineStyles = {
            backgroundColor: '#FB8A2E',  // Tailwind equivalent: bg-yellow-600
            color: 'white',            // Tailwind equivalent: text-black
        };
    } else if (percentage === 100) {
        statusText = 'Completed';
        inlineStyles = {
            backgroundColor: '#10B981',  // Tailwind equivalent: bg-green-600
            color: '#FFFFFF',            // Tailwind equivalent: text-white
        };
    }

    return (
        <p
            className="py-[2px] text-sm px-3 font-medium rounded-full"
            style={inlineStyles}
        >
            {statusText}
        </p>
    );
};

