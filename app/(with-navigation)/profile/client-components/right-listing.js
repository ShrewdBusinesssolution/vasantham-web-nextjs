import React, { useState, useEffect, useContext } from 'react';
import UserForm from '@/app/form-components/user-form';
import Favourite from './right-side-client-components/favourite';
import Courses from './right-side-client-components/courses';
import Notification from './right-side-client-components/notification';
import Image from 'next/image';
import { AppContext } from '@/app/utility/context/context-api';
import { isEmptyobject } from '@/app/utility/helper';
import { FaExclamationCircle } from "react-icons/fa";

export const RightListing = ({ selectedItem }) => {
  const [showForm, setShowForm] = useState(true);  // Control if the form is shown

  // This effect will toggle the visibility of the form based on `selectedItem`
  useEffect(() => {
    // Always show the form if 'user' is selected, otherwise show selected component.
    if (selectedItem === 'user') {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  }, [selectedItem]);  // Run this effect whenever `selectedItem` changes

  return (
    <div>
      {showForm ? (
        <UserInformationList />  // Show the UserForm if `showForm` is true
      ) : (
        <div>
          {selectedItem === 'favourites' && <Favourite />}
          {selectedItem === 'courses' && <Courses />}
          {selectedItem === 'notifications' && <Notification />}
          {!selectedItem && <UserInformationList />}  {/* Optional message if no selection */}
        </div>
      )}
    </div>
  );
};


const UserInformationList = () => {

  const { getUserInformation, userInformation } = useContext(AppContext);

  useEffect(() => {
    if (isEmptyobject(userInformation)) {
      getUserInformation(); // Fetch user information if not available
    }
  }, [userInformation]);
  return (
    <div className='p-5 bg-white grid max-lg:grid-cols-1 grid-cols-2 gap-5'>
      <CardComponent field_value={userInformation?.name} lable={'User Name'} icon={'user.svg'} placeHolder={''} />
      <CardComponent field_value={userInformation?.date_of_birth} lable={'Date Of Birth'} icon={'calendar.svg'} placeHolder={'DOB'} />
      <CardComponent field_value={userInformation?.email} lable={'Email'} icon={'mail.svg'} placeHolder={''} />
      <CardComponent field_value={userInformation?.gender} lable={'Gender'} icon={'gender.svg'} placeHolder={'Select Gender'} />
      <CardComponent field_value={userInformation?.mobile_number} lable={'Phone Number'} icon={'phone.svg'} placeHolder={'Phone number'} />
    </div>
  )
}

const CardComponent = ({field_value, lable, icon, placeHolder}) => {
  return (
    <div className='space-y-2 w-full'>
      <h6 className='max-md:text-lg text-xl font-medium'>{lable}</h6>
      <div className='border p-3 w-full rounded-md overflow-hidden flex justify-between items-center'>
        <div className=' flex items-center gap-3'>
          <Image src={`/assets/images/user-data/${icon}`} width={20} height={20} className='w-auto h-[20px]' alt='icon' />
          <p className={`font-light ${!field_value ? 'text-[#B9B9B9]' : ''}`}>{!field_value ? placeHolder : field_value}</p>
        </div>
        {!field_value ? 
        
        <FaExclamationCircle className=' top-[18px] text-[#F8CB1E]' />
        :
        null
        }

      </div>
    </div>
  )
}