"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { CartModal } from "../../utility/components/cart/cart-modal";
import { BsCart2 } from "react-icons/bs";

const AboutCourse = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="py-10 md:px-5">
      <h3 className="uppercase text-secondary text-sm">About course</h3>
      <div className="flex flex-col md:flex-row items-center justify-between gap-5">
        {/* Left side */}
        <div className="flex flex-col gap-4">
          <h4 className="text-[#222] text-[32px]">Course Overview</h4>
          <p className="text-[#222] font-medium text-[16px] w-full md:w-[700px] lg:w-[820px]">
            Integers, Fractions and Decimals, Simple Equations, Lines and Angles,
            The Triangle and Its Properties, Congruence of Triangles, Rational
            Numbers, Comparing Quantities, Exponents and Powers, Algebraic
            Expressions, Perimeter and Area, Data Handling. VLI helps you to
            understand the formulae and develop your problem-solving ability.
            Additional tests are provided for practice to improve your score and
            understanding.
          </p>
        </div>
        {/* Right side */}
        <div className="bg-gradient-to-br from-[#fff] to-[#CCF4FF] p-5 rounded-xl flex flex-col gap-4">
          <h3 className="text-sm text-secondary uppercase">Fee Details</h3>
          <p className="font-bold text-[26px]">₹399.00 <span className="pl-1 font-semibold text-lg line-through text-gray-400">₹800.00</span></p>
          <h3 className="text-sm text-secondary uppercase mt-2">Duration</h3>
          <p className="font-bold text-[26px]">24 Hrs</p>
          {/* Button */}
          <div className="flex justify-center items-center">
          <Button variant="primary" className="mt-2 uppercase px-8 text-sm flex items-center gap-x-2" onClick={handleAddToCart}>
              Add to cart <BsCart2 size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Cart Modal */}
      <CartModal isOpen={isModalOpen} onClose={closeModal} />

      {/* What you will learn */}
      <div className="flex flex-col gap-5 mt-10">
        <h4 className="text-[#222] text-[32px]">What you&apos;ll learn</h4>
        <div className='flex flex-col gap-2'>
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className='flex items-center gap-4'>
              <Image src={"/assets/svg/tick.svg"} width={50} height={50} className='w-[16px] h-[16px]' alt="Tick" />
              <p className='text-[16px] font-semibold'>Powerful Audience {index % 2 === 0 ? '& Best course materials' : ''}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AboutCourse;
