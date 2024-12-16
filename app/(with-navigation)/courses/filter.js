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
import { LuLoader2 } from 'react-icons/lu';

const Filter = ({ ResponseData, subject, board, standard }) => {

    const scrollRef = useRef(null);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const queryParams = new URLSearchParams(searchParams);
    const router = useRouter();
    const timeoutRef = useRef(null); // Ref to store the timeout ID
    const [filteredProducts, setFilteredProducts] = useState(ResponseData?.courses ?? []);
    const [resData, setResDaa] = useState(ResponseData ?? []);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [loadMore, setLoadMore] = useState(false)

    const [pagination, setPagination] = useState(ResponseData?.pagination ?? {});


    useEffect(() => {
        DeletePageParam();
    }, [])

    const DeletePageParam = () => {
        const NewParamData = new URLSearchParams(queryParams.toString());
        NewParamData.delete('page'); // Delete the 'board' parameter

        router.push(
            `${pathname}?${NewParamData.toString()}`,
            undefined,
            { shallow: true, scroll: false } // `shallow: true` helps avoid data re-fetch
        );

        GetData(NewParamData.toString());

    }


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
            HandleParams('search', null, true);

        }

        // Set a new timeout
        timeoutRef.current = setTimeout(() => {
            HandleParams('search', newSearchData);
        }, 300); // Delay of 300ms
    };



    //INFO STANDARD SECTION
    const [standardList, setStandardList] = useState(ResponseData?.standard ?? []);
    const [activeClasses, setActiveClasses] = useState(standard); // Array to store selected indices

    const HandleStandard = (slug) => {
        setActiveClasses((prev) => {
            // Ensure it's always an array
            if (!Array.isArray(prev)) {
                console.error("Expected an array but got:", prev);
                prev = []; // Fallback to an empty array
            }
    
            let updatedActiveClasses;
    
            if (prev.includes(slug)) {
                // If the current slug is already active, clear it
                updatedActiveClasses = [];
            } else {
                // Set only the current slug as active
                updatedActiveClasses = [slug];
            }
    
            // Update the URL with the new standard
            HandleParams('standard', updatedActiveClasses);
    
            return updatedActiveClasses;
        });
    };


    //INFO SUBJECT SECTION
    const [subjectShow, setSubjectShow] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(subject);
    const [subjectSlug, setSubjectslug] = useState("");


    const [subjectList, setSubjectList] = useState(ResponseData?.subject ?? []);

    const SubjectHandling = (name, slug) => {
        if (name === 'clear') {
            setSelectedSubject('');
            setSubjectslug('');
            setSubjectShow(false);
            HandleParams('subject', slug, true); // Pass `true` to indicate deletion
        } else {
            setSelectedSubject(name);
            setSubjectslug(slug);
            setSubjectShow(false);
            HandleParams('subject', slug);
        }
    };
    //INFO BOARD SECTION
    const [boardShow, setBoardShow] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState(board)
    const [boardSlug, setBoardslug] = useState("");
    const [boardList, setBoardList] = useState(ResponseData?.board ?? [])

    const BoardHandling = (name, slug) => {
        if (name === 'clear') {

            setSelectedBoard("")
            setBoardslug("")
            setBoardShow(false)
            HandleParams('board', slug, true)
        } else {
            setSelectedBoard(name)
            setBoardslug(slug)
            setBoardShow(false)
            HandleParams('board', slug)
        }

    }

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -100, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 100, behavior: 'smooth' });
    };


    const HandleParams = (type, data, dl = false) => {
        // Clone the queryParams to avoid direct mutation
        const newQueryParams = new URLSearchParams(queryParams.toString());
        let paginate = false;

        switch (type) {
            case 'search':
                newQueryParams.delete('page'); // Delete the 'board' parameter
                if (dl) {
                    newQueryParams.delete('search');  // Delete the 'search' parameter
                } else if (newQueryParams.has('search')) {
                    newQueryParams.set('search', data);  // Update existing parameter
                } else {
                    newQueryParams.append('search', data);  // Add new parameter
                }
                break;
            case 'standard':
                newQueryParams.delete('page'); // Delete the 'board' parameter

                if (dl) {
                    // If `dl` is true, delete the `standard` parameter from the URL
                    newQueryParams.delete('standard[]');
                } else if (data.length > 0) {
                    // If the data array is not empty, set the `standard` parameter as an array
                    // URLSearchParams can append the same key multiple times (for an array)
                    newQueryParams.delete('standard[]'); // Remove any existing `standard` params
                    data.forEach((slug) => {
                        newQueryParams.append('standard[]', slug); // Append each selected standard slug
                    });
                } else {
                    // If no standards are selected, delete the `standard` parameter
                    newQueryParams.delete('standard[]');
                }
                break;

            case 'subject':
                newQueryParams.delete('page'); // Delete the 'board' parameter
                if (dl) {
                    newQueryParams.delete('subject'); // Delete the 'subject' parameter
                } else if (newQueryParams.has('subject')) {
                    newQueryParams.set('subject', data); // Update existing parameter
                } else {
                    newQueryParams.append('subject', data); // Add new parameter
                }
                break;
            case 'board':
                newQueryParams.delete('page'); // Delete the 'board' parameter

                if (dl) {
                    newQueryParams.delete('board'); // Delete the 'board' parameter
                } else if (newQueryParams.has('board')) {
                    newQueryParams.set('board', data); // Update existing parameter
                } else {
                    newQueryParams.append('board', data); // Add new parameter
                }
                break;
            case 'pagination':
                if (dl) {
                    newQueryParams.delete('page'); // Delete the 'board' parameter
                } else if (newQueryParams.has('page')) {
                    newQueryParams.set('page', data); // Update existing parameter
                } else {
                    newQueryParams.append('page', data); // Add new parameter
                }
                paginate = true
                break;
            default:
                break;
        }

        router.replace(`${pathname}?${newQueryParams.toString()}`, { scroll: false });
        // Call GetData to fetch or process the new data without affecting the UI scroll
        GetData(newQueryParams.toString(), paginate);
    };


    const GetData = async (paramData, fromPagination = false) => {
        try {
            if (fromPagination) {
                setLoadMore(true);
            }
    
            const response = (await CourseService.list(paramData)).data;
    
            setFilteredProducts(prevData => {
                const newCourses = response?.courses ?? [];
    
                // If paginating, append new courses to the existing ones
                return fromPagination ? [...prevData, ...newCourses] : newCourses;
            });
    
            // Update pagination and page state
            setPagination(response?.pagination ?? []);
            setPage(response?.pagination?.current_page);
    
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
            setLoadMore(false);
        }
    };





    return (
        <main className='bg-[#FCFCFC] py-10 lg:py-16 px-6 md:px-12 lg:px-16 '>
            <div className='brand-container flex flex-col xl:flex-row   items-center justify-between gap-3'>
                {/* Search */}
                <div className="relative rounded-full p-1 pl-4 px-2 flex items-center gap-2 border-[1px] border-[#E9E9E9] bg-white w-full max-w-[300px]">
                    <input
                        value={searchData}
                        onChange={handleSearchChange}
                        type="text"
                        className="placeholder:text-[15px] placeholder:px-1 w-full text-black/40 focus:outline-none"
                        placeholder="search" />
                    <p className="bg-primary rounded-full p-[6px]">
                        {loading ? <LuLoader2 className="max-sm:h-3 max-sm:w-3 w-5 h-5 text-white animate-spin" /> : <GoSearch className="max-sm:h-3 max-sm:w-3 w-5 h-5 text-white" />}

                    </p>
                </div>

                {/* Center courses */}
                <div className="flex items-center ">
                    <div className="relative flex items-center">
                        <button
                            className="absolute left-2 z-10 cursor-pointer text-xl bg-[#F7F7F7] border rounded-full p-1"
                            onClick={scrollLeft}>
                            <FiChevronLeft />
                        </button>
                        <div className='bg-[#F7F7F7] rounded-full border  max-lg:w-[90vw] xl:w-[640px] px-12 lg:px-18'>
                            <div
                                ref={scrollRef}
                                className="hide-scrollbar flex overflow-x-auto p-1">
                                {/* Array */}
                                {standardList?.map((item) => (
                                    <div
                                        key={item.slug}
                                        className={`rounded-full font-semibold uppercase text-sm p-2 px-5 flex items-center justify-center mx-2 text-nowrap cursor-pointer 
                    ${activeClasses.includes(item.slug) ? 'bg-secondary text-white' : 'bg-white text-black'}`}
                                        onClick={() => HandleStandard(item.slug)}>
                                        {item.name}
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
                                <ScrollArea className={`${subjectList.length > 5 ? 'h-[200px]' : 'h-fit'} rounded-md `}>

                                    <ul>
                                        {selectedSubject !== '' ?
                                            <li
                                                onClick={() => SubjectHandling('clear', null)}
                                                className={`w-full p-2 hover:bg-gradient-to-br from-white to-[#b9f8ee] from-20% rounded-[10px] shadow-sm cursor-pointer`}>
                                                Clear
                                            </li>
                                            :
                                            null
                                        }
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
                                <ScrollArea className={`${boardList.length > 5 ? 'h-[200px]' : 'h-fit'} rounded-md `}>

                                    <ul>
                                        {selectedBoard !== '' ?
                                            <li
                                                onClick={() => BoardHandling('clear', null)}
                                                className={`w-full p-2 hover:bg-gradient-to-br from-white to-[#b9f8ee] from-20% rounded-[10px] shadow-sm cursor-pointer`}>
                                                Clear
                                            </li>
                                            :
                                            null
                                        }

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

            <div className='brand-container'>
                <p className='font-semibold text-[16px] mt-5'>{filteredProducts.length} Courses found</p>
                {filteredProducts.length === 0 ?

                    <div className='h-[50vh] w-full grid place-content-center'>

                        <p>Course Not Found</p>
                    </div>
                    :

                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5 justify-items-center py-5 '>
                        {filteredProducts?.map((item, index) => (
                            <ProductCard key={index} product={item} homePage={true} />

                        ))}
                    </div>
                }
            </div>
            {/* Button */}
            {pagination?.total_pages > 1 && pagination?.total_pages !== page ?
                <div className='flex flex-col justify-center items-center py-5 md:py-8'>
                    <Button disabled={loadMore} onClick={() => { HandleParams('pagination', page + 1) }} variant="primary" className="uppercase px-5 text-sm flex items-center gap-x-2">
                        Load More courses<IoReloadOutline className={`${loadMore ? 'animate-spin' : ''}`} size={20} />
                    </Button>
                </div>
                : null}

        </main>
    );
}

export default Filter
