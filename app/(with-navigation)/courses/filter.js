"use client";
import React, { useRef, useState } from 'react';
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

const Filter = () => {
    const products = [
        { id: 1, imageSrc: "/assets/product/product-1.webp", price: "₹120.00", category: "Science", rating: 4.5, reviewCount: 20, title: "Photography Crash Course for Photographers", students: "100 Students", lessons: "6 Lessons" },
        { id: 2, imageSrc: "/assets/product/product-1.webp", price: "₹120.00", category: "Multi Media", rating: 4.5, reviewCount: 20, title: "Photography Crash Course for Photographers", students: "1500 Students", lessons: "4 Lessons" },
        { id: 3, imageSrc: "/assets/product/product-1.webp", price: "₹120.00", category: "Social", rating: 4.5, reviewCount: 20, title: "Photography Crash Course for Photographers", students: "1200 Students", lessons: "5 Lessons" },
        { id: 4, imageSrc: "/assets/product/product-1.webp", price: "₹120.00", category: "Physics", rating: 4.5, reviewCount: 20, title: "Photography Crash Course for Photographers", students: "2500 Students", lessons: "45 Lessons" },
        { id: 5, imageSrc: "/assets/product/product-1.webp", price: "₹120.00", category: "Web Application", rating: 4.5, reviewCount: 20, title: "Photography Crash Course for Photographers", students: "3100 Students", lessons: "9 Lessons" },
        { id: 6, imageSrc: "/assets/product/product-1.webp", price: "₹120.00", category: "Computer Science", rating: 4.5, reviewCount: 20, title: "Photography Crash Course for Photographers", students: "1800 Students", lessons: "12 Lessons" },
        { id: 7, imageSrc: "/assets/product/product-1.webp", price: "₹120.00", category: "Chemistry", rating: 4.5, reviewCount: 20, title: "Photography Crash Course for Photographers", students: "2400 Students", lessons: "7 Lessons" },
        { id: 8, imageSrc: "/assets/product/product-1.webp", price: "₹120.00", category: "Bio Chemistry", rating: 4.5, reviewCount: 20, title: "Photography Crash Course for Photographers", students: "1650 Students", lessons: "10 Lessons" },
    ];

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeClass, setActiveClass] = useState(null);
    const scrollRef = useRef(null);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -100, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 100, behavior: 'smooth' });
    };

    const handleClassClick = (index) => {
      setActiveClass(index); 
        const shuffledProducts = shuffleArray([...products]);
        const selectedProducts = shuffledProducts.slice(0, 3 + Math.floor(Math.random() * 2));
        setFilteredProducts(selectedProducts);
    };

    return (
        <main className='bg-[#FCFCFC] py-10 lg:py-16 px-6 md:px-12 lg:px-16 '>
            <div className='brand-container flex flex-col md:flex-row items-center gap-3'>
                {/* Search */}
                <div className="relative rounded-full p-1 pl-4 px-2 flex items-center gap-2 border-[1px] border-[#E9E9E9] bg-white w-full max-w-[300px]">
                    <input
                        type="text"
                        className="placeholder:text-[15px] placeholder:px-1 w-full text-black/40 focus:outline-none"
                        placeholder="search"/>
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
                    <Popover className="absolute top-0 right-10">
                        <PopoverTrigger asChild>
                            <div className="relative w-fit gap-5 p-2 bg-white border rounded-full flex items-center justify-between cursor-pointer px-5">
                                <p className="text-sm font-medium text-nowrap"><span className='text-[#858585]'>Subject:</span> Maths</p>
                                <FiChevronDown className="text-xl" />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit p-0 rounded-xl">
                            <div className="w-[150px] p-2 text-sm text-black">
                                <ul>
                                    <li className="w-full p-2 hover:bg-gradient-to-br from-white to-[#b9f8ee] from-20% rounded-[10px] shadow-sm">Tamil</li>
                                    <li className="w-full p-2 hover:bg-gradient-to-br from-white to-[#b9f8ee] from-20% rounded-[10px] shadow-sm">English</li>
                                </ul>
                            </div>
                        </PopoverContent>
                    </Popover>

                    {/* Board */}
                    <Popover className="absolute top-0 right-10">
                        <PopoverTrigger asChild>
                            <div className="relative w-fit gap-5 p-2 bg-white border rounded-full flex items-center justify-between cursor-pointer">
                                <p className="text-sm font-medium text-nowrap"><span className='text-[#858585]'>Board: </span>CBSE</p>
                                <FiChevronDown className="text-xl" />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit p-0 rounded-xl">
                            <div className="w-[150px] p-2 text-sm text-black">
                                <ul>
                                    <li className="w-full p-2 hover:bg-gradient-to-br from-white to-[#b9f8ee] from-20% rounded-[10px] shadow-sm">CBSE</li>
                                    <li className="w-full p-2 hover:bg-gradient-to-br from-white to-[#b9f8ee] from-20% rounded-[10px] shadow-sm">STATE</li>
                                </ul>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div>
            <p className='text-[#B0B0B0] text-[16px] mt-5 px-5'>{filteredProducts.length} Courses found</p>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-5 justify-items-center py-5 px-5'>
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} homePage={true}/>
                ))}
            </div>
            </div>
            {/* Button */}
            <div className='flex flex-col justify-center items-center py-5 md:py-8'>
            <Button variant="primary" className="uppercase px-5 text-sm flex items-center gap-x-2">
            Load More courses<IoReloadOutline size={20}/>
            </Button>
            </div>
        </main>
    );
}

export default Filter
 