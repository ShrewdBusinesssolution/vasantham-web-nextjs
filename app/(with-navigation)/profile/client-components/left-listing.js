// client-components/left-listing.js
'use client';
import React, { useContext, useEffect, useState } from 'react';
import { GoHeart, GoFileDirectory } from 'react-icons/go';
import { IoMailOpenOutline } from 'react-icons/io5';
import { MdOutlineNavigateNext } from "react-icons/md";
import { AppContext } from '@/app/utility/context/context-api';
import { getInitials, isEmptyobject, scrollToTop, TruncateText } from '@/app/utility/helper';
import { EditProfileModal } from '@/app/modal-section/profile-edit-modal';

export const LeftListing = ({ onSelect }) => {
  const [active, setActive] = useState(true);
  const { getUserInformation, userInformation } = useContext(AppContext)
  const handleSelect = (item) => {
    setActive(item);
    onSelect(item);
    scrollToTop();
  };


  useEffect(() => {
    if (isEmptyobject(userInformation)) {
      getUserInformation();
    }
  }, [])

  const items = [
    {
      id: 'favourites',
      icon: <GoHeart size={20} />,
      title: 'Favourites',
      description: 'view your Favourites',
    },
    {
      id: 'courses',
      icon: <GoFileDirectory size={20} />,
      title: 'My Courses',
      description: 'view your Orders',
    },
    {
      id: 'notifications',
      icon: <IoMailOpenOutline size={20} />,
      title: 'My Notifications',
      description: 'view Notifications',
    },
  ];

  return (
    <main className=''>
      <div className='flex flex-row justify-between items-end border-b p-5 '>
        <div className='flex gap-2 items-center flex-wrap cursor-pointer' onClick={() => onSelect('user')}>
          <p className='bg-[#8A3AC8] rounded-full w-12 h-12 flex items-center justify-center text-[#fff]'>{getInitials(userInformation?.name)}</p>
          <div className="flex flex-col">
            <h5 className="font-semibold text-[20px] md:text-[22px]">{TruncateText(userInformation?.name ?? '', 15)}</h5>
            <p className="text-sm text-primary">{userInformation?.mobile_number}</p>
          </div>
        </div>
        <EditProfileModal />
      </div>

      <div className="flex flex-col gap-2 p-3 cursor-pointer ">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex justify-between items-center flex-wrap gap-2 rounded p-2 ${active === item.id ? 'bg-gradient-to-br from-[#fff] to-[#CCF4FF] from-0%' : ''
              }`}
            onClick={() => handleSelect(item.id)}
          >
            <div className="flex gap-2 items-center flex-wrap">
              <p className="bg-[#f7f7f7] rounded-full p-2">{item.icon}</p>
              <div className="flex flex-col">
                <span className="font-semibold text-[15px]">{item.title}</span>
                <p className="text-[#666666] text-sm">{item.description}</p>
              </div>
            </div>
            <MdOutlineNavigateNext size={22} className="" />
          </div>
        ))}
      </div>

    </main>
  );
}
