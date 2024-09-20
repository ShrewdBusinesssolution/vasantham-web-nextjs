import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { FiChevronDown } from 'react-icons/fi';
import { GoSearch } from 'react-icons/go';

const SubjectUnit = () => {
  return (
<main className="">
    <div className="brand-container px-6 flex flex-row justify-between py-10">
        <div>
            <h3 className="uppercase text-lg">UNITS</h3>
        </div>
        <div className="flex flex-row gap-5">
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
                        placeholder="search"/>
                    <p className="bg-primary rounded-full p-[6px]">
                        <GoSearch className="w-5 h-5 text-white" />
                    </p>
                </div>
                </div>
    </div>
</main>
)
}

export default SubjectUnit