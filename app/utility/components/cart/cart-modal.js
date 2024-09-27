import React from 'react';
import { FaTimes, FaUser } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { RiDeleteBin4Line } from "react-icons/ri";
import Link from 'next/link';

const courses = [
    {
      title: "Photography Crash Course for Photographer",
      price: 2000,
      originalPrice: 500,
      students: 30,
      lessons: 4,
    },
    {
      title: "Advanced Physics",
      price: 1500,
      originalPrice: 600,
      students: 25,
      lessons: 3,
    },
   
  ];

const CartModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50 overflow-y-scroll hide-y-scrollbar ">
        <div className="bg-white h-full w-80 z-60 flex flex-col">
        <div className="flex justify-between items-start border-b-2 px-5 p-2">
          <h3 className="text-lg font-bold">My Cart</h3>
          <button onClick={onClose} className="text-[#222222] hover:text-gray-800 mt-1">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Card Design */}
        <div className='p-5'>
        {courses.map((course, index) => (
            <div className='rounded-xl border-2 flex flex-col p-5'>
          <CardComponent key={index} course={course} />
        </div>
        ))}
</div>
        {/* Total Price Section */}
        <div className="mt-auto flex flex-col justify-center p-5">
          <p className="mt-4 text-start font-medium">Total:<span className='font-bold'> ₹2000 </span><span className="line-through text-[16px] text-gray-500 font-normal">₹1000</span></p>
          <div className="w-full mt-2 flex justify-center">
          <Link href={'/checkout'} >
            <Button variant="primary" className="w-full uppercase text-sm">Checkout</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;


const CardComponent = ({ course }) => {
    return (
      <div className="mb-4 flex flex-col gap-2">
        <h4 className="mt-2 text-lg">{course.title}</h4>
        <p className="font-bold">
          Course fee: ₹{course.price} <span className="line-through text-gray-400">₹{course.originalPrice}</span>
        </p>
        <div className="flex justify-between">
            <div className='flex items-center gap-2'>
          <div className="flex items-center space-x-1">
            <span className="text-secondary"><FaUser size={16} /></span>
            <span className="mt-1 font-light text-[14px]">{course.students} Students</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-secondary"><IoDocumentTextOutline size={20} /></span>
            <span className="mt-1 font-light text-[14px]">{course.lessons} Lessons</span>
          </div>
          </div>
          <div className="bg-[#E9E9E9] rounded-lg p-2">
          <RiDeleteBin4Line />
          </div>
        </div>
      </div>
    );
  };

