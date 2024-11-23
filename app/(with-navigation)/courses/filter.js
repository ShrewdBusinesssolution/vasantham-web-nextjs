"use client";
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { GoSearch } from 'react-icons/go';
import { FiChevronLeft, FiChevronRight, FiChevronDown } from 'react-icons/fi';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ProductCard } from '@/app/utility/components/utility-components';
import { Button } from '@/components/ui/button';
import { IoReloadOutline } from 'react-icons/io5';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TruncateText } from '@/app/utility/helper';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import CourseService from '@/app/services/api-services/course-service';

const Filter = ({ ResponseData }) => {

    const scrollRef = useRef(null);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const queryParams = new URLSearchParams(searchParams);
    const router = useRouter();


    const [filteredProducts, setFilteredProducts] = useState(ResponseData?.courses ?? []);
    const [resData, setResDaa] = useState(ResponseData ?? []);
    const [pagination, setPagination] = useState(ResponseData?.pagination ?? {});


    //INFO SUBJECT SECTION
    const [subjectShow, setSubjectShow] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [subjectSlug, setSubjectslug] = useState("");

    const [subjectList, setSubjectList] = useState(ResponseData?.subject ?? []);

    const SubjectHandling = (name, slug) => {
        setSelectedSubject(name)
        setSubjectslug(slug)
        setSubjectShow(false)
        HandleParams('subject', slug)
    }
    //INFO BOARD SECTION
    const [boardShow, setBoardShow] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState("")
    const [boardSlug, setBoardslug] = useState("");
    const [boardList, setBoardList] = useState(ResponseData?.board ?? [])

    const BoardHandling = (name, slug) => {
        setSelectedBoard(name)
        setBoardslug(slug)
        setBoardShow(false)
        HandleParams('board', slug)

    }
    //INFO CLASS HANDLING
    const [activeClass, setActiveClass] = useState(0);

    useEffect(() => {
        handleClassClick(0); // Automatically select Class 1 on mount
    }, []);
    
    
    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -100, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 100, behavior: 'smooth' });
    };

    const handleClassClick = (index) => {
        setActiveClass(index);
    };

    const HandleParams = (type, data) => {
        // Clone the queryParams to avoid direct mutation
        const newQueryParams = new URLSearchParams(queryParams.toString());
    
        switch (type) {
            case 'subject':
                if (newQueryParams.has('subject')) {
                    newQueryParams.set('subject', data);
                } else {
                    newQueryParams.append('subject', data);
                }
                break;
            case 'board':
                if (newQueryParams.has('board')) {
                    newQueryParams.set('board', data);
                } else {
                    newQueryParams.append('board', data);
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
    

     // Create a function to handle updating query parameters


    const GetData = async (paramData) =>{
        const response = (await CourseService.list(paramData)).data;
        setFilteredProducts(response?.courses ?? [])
    }    

    return (
        <main className='bg-[#FCFCFC] py-10 lg:py-16 px-6 md:px-12 lg:px-16 '>
            <div className='brand-container flex flex-col md:flex-row items-center gap-3'>
                {/* Search */}
                <div className="relative rounded-full p-1 pl-4 px-2 flex items-center gap-2 border-[1px] border-[#E9E9E9] bg-white w-full max-w-[300px]">
                    <input
                        type="text"
                        className="placeholder:text-[15px] placeholder:px-1 w-full text-black/40 focus:outline-none"
                        placeholder="search" />
                    <p className="bg-primary rounded-full p-[6px]">
                        <GoSearch className="w-5 h-5 text-white" />
                    </p>
                </div>

                {/* Center courses */}
                <div className="flex items-center">
                    <div className="relative flex items-center">
                        <button
                            className="absolute left-2 z-10 cursor-pointer text-xl bg-[#F7F7F7] border rounded-full p-1"
                            onClick={scrollLeft}>
                            <FiChevronLeft />
                        </button>
                        <div className='bg-[#F7F7F7] rounded-full border w-[370px] md:w-[600px] lg:w-[640px] px-12 lg:px-18' >
                            <div
                                ref={scrollRef}
                                className="hide-scrollbar flex overflow-x-auto p-1" >
                                {/* Array */}
                                {[...Array(10)].map((_, index) => (
                                    <div
                                        key={index}
                                        className={`rounded-full font-semibold uppercase text-sm p-2 px-5 flex items-center justify-center mx-2 text-nowrap cursor-pointer 
                                            ${activeClass === index ? 'bg-secondary text-white' : 'bg-white text-black'}`}
                                        onClick={() => handleClassClick(index)}>
                                        Class {index + 1}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            className="absolute right-2 z-10 cursor-pointer text-xl bg-[#F7F7F7] border rounded-full p-1"
                            onClick={scrollRight}
                        >
                            <FiChevronRight />
                        </button>
                    </div>
                </div>
                <div className='flex flex-row space-x-2'>
                    {/* Subject */}
                    <Popover open={subjectShow} onOpenChange={setSubjectShow} className="absolute top-0 right-10">
                        <PopoverTrigger asChild>
                            <div className="relative w-fit gap-5 p-2 bg-white border rounded-full flex items-center justify-between cursor-pointer px-5">
                                <p className="text-sm font-medium text-nowrap"><span className='text-[#858585]'>Subject:</span> {TruncateText(selectedSubject, 6)}</p>
                                <FiChevronDown className="text-xl" />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit p-0 rounded-xl">
                            <div className="w-[150px] p-2 text-sm text-black">
                                <ScrollArea className="h-[200px] rounded-md ">

                                    <ul>
                                        {subjectList?.map((item, index) => (
                                            <li key={index}
                                                onClick={() => SubjectHandling(item.name, item.slug)}
                                                className={`w-full p-2 ${item.name === selectedSubject ? 'bg-gradient-to-br' : ''} hover:bg-gradient-to-br from-white to-[#b9f8ee] from-20% rounded-[10px] shadow-sm cursor-pointer`}>
                                                {item.name}
                                            </li>
                                        ))}
                                    </ul>
                                </ScrollArea>
                            </div>
                        </PopoverContent>
                    </Popover>

                    {/* Board */}
                    <Popover open={boardShow} onOpenChange={setBoardShow} className="absolute top-0 right-10">
                        <PopoverTrigger asChild>
                            <div className="relative w-fit gap-5 p-2 bg-white border rounded-full flex items-center justify-between cursor-pointer">
                                <p className="text-sm font-medium text-nowrap"><span className='text-[#858585]'>Board: </span>{TruncateText(selectedBoard, 6)}</p>
                                <FiChevronDown className="text-xl" />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit p-0 rounded-xl">
                            <div className="w-[150px] p-2 text-sm text-black">
                                <ScrollArea className="h-[200px] rounded-md ">

                                    <ul>
                                        {boardList?.map((item, index) => (
                                            <li key={index}
                                                onClick={() => BoardHandling(item.name, item.slug)}
                                                className={`w-full p-2 ${item.name === selectedBoard ? 'bg-gradient-to-br' : ''} hover:bg-gradient-to-br from-white to-[#b9f8ee] from-20% rounded-[10px] shadow-sm cursor-pointer`}>
                                                {item.name}
                                            </li>
                                        ))}
                                    </ul>
                                </ScrollArea>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div>
                <p className='text-[#B0B0B0] text-[16px] mt-5 px-5'>{pagination?.total ?? 0} Courses found</p>
                {filteredProducts.length === 0 ?

                    <div className='h-[50vh] w-full grid place-content-center'>

                        <p>Course Not Found</p>
                    </div>
                    :

                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5 justify-items-center py-5 px-5'>
                        {filteredProducts?.map((item, index) => (
                            <ProductCard key={index} product={item} homePage={true} />

                        ))}
                    </div>
                }
            </div>
            {/* Button */}
            <div className='flex flex-col justify-center items-center py-5 md:py-8'>
                <Button variant="primary" className="uppercase px-5 text-sm flex items-center gap-x-2">
                    Load More courses<IoReloadOutline size={20} />
                </Button>
            </div>
        </main>
    );
}

export default Filter
