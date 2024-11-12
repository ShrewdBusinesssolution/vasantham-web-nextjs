// client-components/left-listing.js
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { LuPencilLine } from 'react-icons/lu';
import { GoHeart, GoFileDirectory } from 'react-icons/go';
import { IoMailOpenOutline } from 'react-icons/io5';
import { MdOutlineNavigateNext } from "react-icons/md";
import { EditProfile } from '@/app/form-components/editprofile-modal';

export const LeftListing = ({ onSelect }) => {
  const [active, setActive] = useState('');

  const handleSelect = (item) => {
    setActive(item);
    onSelect(item);
  };

  
  return (
    <main>
      <div className='flex flex-row justify-between items-center border-b p-5'>
      <div className='flex gap-2 items-center cursor-pointer' onClick={() => onSelect('user')}>
  <p className='bg-[#8A3AC8] rounded-full w-12 h-12 flex items-center justify-center text-[#fff]'>MP</p>
  <div className="flex flex-col">
    <h5 className="font-semibold text-[20px] md:text-[22px]">hi, Mounika</h5>
    <p className="text-sm text-primary">8787898989</p>
  </div>
</div>
        <EditProfile/>
      </div>

      <div className="flex flex-col gap-2 p-3 cursor-pointer">
  <div className={`flex items-center gap-2 rounded p-2 ${active === 'favourites' ? 'bg-gradient-to-br from-[#fff] to-[#CCF4FF] from-0%' : ''}`} onClick={() => handleSelect('favourites')}>
    <p className="bg-[#f7f7f7] rounded-full p-2"><GoHeart size={20} /></p>
    <div className='flex flex-col'>
      <span className='font-semibold text-[15px]'>Favourite</span>
      <p className='text-[#666666] text-sm'>view your Favourite</p>
    </div>
    <MdOutlineNavigateNext size={22} className="ml-auto" />
  </div>
  
  <div className={`flex items-center gap-2 rounded p-2 ${active === 'courses' ? 'bg-gradient-to-br from-[#fff] to-[#CCF4FF] from-0%' : ''}`} onClick={() => handleSelect('courses')}>
    <p className="bg-[#f7f7f7] rounded-full p-2"><GoFileDirectory size={20} /></p>
    <div className='flex flex-col'>
      <span className='font-semibold text-[15px]'>My Courses</span>
      <p className='text-[#666666] text-sm'>view your Orders</p>
    </div>
    <MdOutlineNavigateNext size={22} className="ml-auto" />
  </div>

  <div className={`flex items-center gap-2 rounded p-2 ${active === 'notifications' ? 'bg-gradient-to-br from-[#fff] to-[#CCF4FF] from-0%' : ''}`} onClick={() => handleSelect('notifications')}>
    <p className="bg-[#f7f7f7] rounded-full p-2"><IoMailOpenOutline size={20} /></p>
    <div className='flex flex-col'>
      <span className='font-semibold text-[15px]'>My Notifications</span>
      <p className='text-[#666666] text-sm'>view your Addresses</p>
    </div>
    <MdOutlineNavigateNext size={22} className="ml-auto" />
  </div>
</div>

    </main>
  );
}
