'use client'
// pages/index.js
import React, { useState } from 'react';
import { LeftListing } from './client-components/left-listing';
import { RightListing } from './client-components/right-listing';

const Page = () => {
  const [selectedItem, setSelectedItem] = useState('');

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <main className='bg-[#fcfcfc] py-6'>
      <div className="brand-container flex flex-col md:flex-row gap-5">
        {/* Left Side */}
        <div className="w-full md:w-1/4 bg-[#fff] border-r rounded-2xl  md:h-[500px] lg:h-[600px]">
          <LeftListing onSelect={handleSelect} />
        </div>

        {/* Right Side */}
        <div className="w-full md:w-3/4">
          <RightListing selectedItem={selectedItem} />
        </div>
      </div>
    </main>
  );
}

export default Page;
