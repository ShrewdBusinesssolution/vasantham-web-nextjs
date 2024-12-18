"use client"
import React, { useState } from 'react'
import { LeftListing } from './left-listing';
import { RightListing } from './right-listing';

export default function MainClientComponentProfile() {

    const [selectedItem, setSelectedItem] = useState('');
    const handleSelect = (item) => {
        setSelectedItem(item);
    };

    return (
        <div className="brand-container flex flex-col md:flex-row gap-5">
            {/* Left Side */}
            <div className="w-full md:w-1/4 bg-[#fff] border-r rounded-2xl  md:h-[500px] lg:h-[600px] sticky top-[120px]">
                <LeftListing onSelect={handleSelect} />
            </div>
            {/* Right Side */}
            <div className="w-full md:w-3/4">
                <RightListing selectedItem={selectedItem} />
            </div>
        </div>
    )
}
