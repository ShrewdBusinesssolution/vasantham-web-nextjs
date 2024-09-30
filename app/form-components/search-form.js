"use client";
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { GoSearch } from "react-icons/go";
// import BasicService from '../services/api-services/basic-service';
import { toast } from 'sonner';
import Link from 'next/link';


const SUGGESTIONS = ['tamil', 'english', 'maths'];

export default function SearchForm() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [isSearchFormVisible, setIsSearchFormVisible] = useState(false);
    const [searchData, setSearchData] = useState([])
    const debounceTimeout = useRef(null);


    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Clear the previous timeout if the user is still typing
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        // Set a new timeout to trigger the API call after 3 seconds of inactivity
        debounceTimeout.current = setTimeout(() => {
            triggerSearchApi(value);
        }, 1000);
    };

    const triggerSearchApi = async (value) => {
        if (value.trim().length > 0) {
            // Trigger your API call here
            console.log("Triggering API with search term:", value);
            // Add your API call logic here

            try {
                const respnse = await BasicService.SearchResult(value);
                if(respnse.data.length !== 0){

                    setSearchData(respnse.data)
                }else{
                    toast.error("no product found",{position:"top-right", duration:1000})
                }
            } catch (error) {
                console.log("🚀 ~ triggerSearchApi ~ error:", error)
            }
        }else{
            setSearchData([])
        }
    };

    const toggleSearchForm = () => {
        setSearchData([]);
        setIsSearchFormVisible(!isSearchFormVisible);
    };
    

    return (
        <div className='relative'>
            {/* Full-page search SM screen only ---With toggle */}
            {isSearchFormVisible && window.innerWidth < 768 && (
                <div className='fixed inset-0 bg-white z-50 flex flex-col items-center pt-[200px] justify-start'>
                    {/* Close Button */}
                    <button
                        className='absolute top-0 right-0 m-4 p-2 bg-primary rounded-full z-60'
                        onClick={toggleSearchForm}
                    >
                        <IoClose className='w-6 h-6 text-white' />
                    </button>

                    {/* Search Form */}
                    <div className='relative rounded-2xl p-[10px] flex items-center gap-2 border-[1px] border-primary/10 shadow-primary/20 shadow-lg w-full max-w-[70%] overflow-hidden'>
                        <GoSearch className='w-6 h-6 text-primary' />
                        <input
                            onChange={handleInputChange}
                            type="text"
                            className='placeholder:text-sm w-full  text-black/40 focus:outline-none'
                            placeholder='Search'
                        />
                        {searchData.length !== 0 && (
                            <ul className='mt-4 w-full absolute top-full py-3 left-0 rounded-[10px] bg-white shadow-lg shadow-primary/20 h-auto'>
                                {searchData.map((item, index) => (
                                    <li key={index} className='text-sm px-3 py-3 hover:bg-secondary border-b cursor-pointer'>
                                        <Link href={`/product-detail/${item.slug}`} onClick={toggleSearchForm}>
                                        <div className='flex gap-3 items-center'>
                                            <Image
                                                src={item.thumbnail_image}
                                                width={20}
                                                height={20}
                                                alt="product"
                                                className='rounded-full'
                                            />
                                            {item.name}
                                        </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}

            {/* Search md, lg, xl */}
            <div className="hidden md:flex rounded-full p-1 pl-4 px-2 items-center gap-2 border-[1px] border-[#E9E9E9] w-full max-w-[250px]">
            <input
              type="text"
              className="placeholder:text-[15px] placeholder:px-1 w-full text-black/40 focus:outline-none"
              placeholder="search"
            />
            <p className="bg-primary rounded-full p-1">
              <GoSearch className="w-6 h-6 text-white" />
            </p>

                {searchData.length !== 0 && (
                    <ul className='mt-5 w-[300px] absolute top-[2rem] py-3 left-0 rounded-[10px] bg-white shadow-lg  shadow-primary/20 h-auto'>
                        {searchData.map((item, index) => (
                            <li key={index} className='text-sm px-3 py-3 hover:bg-secondary border-b cursor-pointer'>
                                <Link href={`/product-detail/${item.slug}`} onClick={()=>{setSearchData([]); setSearchTerm(item.name)}}>
                                <div className='flex gap-3 items-center'>
                                    <Image
                                        src={item.thumbnail_image}
                                        width={20}
                                        height={20}
                                        alt="product"
                                        className='rounded-full'
                                    />
                                    {item.name}
                                </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )} 
            </div>

            {/* IoSearch small screen */}
            <div className='md:hidden flex items-center justify-center'>
                <GoSearch
                    className='w-8 h-8 text-white bg-primary rounded-full cursor-pointer p-2'
                    onClick={toggleSearchForm}
                />
            </div>
        </div>
    );
}
