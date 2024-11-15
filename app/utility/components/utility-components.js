"use client"
import React, { useState } from "react"
import Image from "next/image"
import { FaStar, FaUser, FaHeart } from "react-icons/fa"
import { IoDocumentTextOutline, IoHeartSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { HiOutlineHeart } from "react-icons/hi2";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogOverlay, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const HeadingSection = ({ title = "Why choose us", subtitle = "Why choose our courses?" }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 md:gap-3">
      <h4 className="uppercase text-sm text-secondary">{title}</h4>
      <p className="font-bold text-[22px] md:text-[32px] text-center">{subtitle}</p>
    </div>
  )
}

// About Banner

const AboutBanner = ({ title = "Why choose us", subtitle = "Why choose our courses?" }) => {
  return (
    <section className='flex flex-col h-[calc(70vh-80px)]  justify-center py-24 bg-cover bg-bottom relative overflow-hidden ' style={{ backgroundImage: `url("/assets/basic/about-banner.png")` }}>
      <div className='absolute z-0 inset-0 bg-[#00518A] opacity-[70%]' />
      {/* Text */}
      <div className="relativea z-10 brand-container flex flex-col justify-center items-center gap-4">
        <h2 className='text-[#20AD96] text-sm md:text-[16px] uppercase font-medium'>{title}</h2>
        <h2 className='text-white text-center px-5 md:px-0 w-full md:w-[700px] lg:w-[800px] leading-normal md:text-[48px]'>{subtitle}</h2>
      </div>
    </section>
  )
}

const CourseBanner = ({
  title = "Why choose us",
  subtitle = "Why choose our courses?",
  product = { students: "100 Students", lessons: "5 Lessons", rating: "4", reviews: "41" }
}) => {
  return (
    <section className='flex flex-col h-[calc(50vh-80px)] justify-center py-16 bg-cover bg-bottom relative overflow-hidden' style={{ backgroundImage: `url("/assets/courses/coursebg.webp")` }}>
      <div className='absolute z-0 inset-0 bg-[#00518A] opacity-[70%]' />
      <div className="brand-container px-6">
        {/* Text */}
        <div className="relative z-10 flex flex-col gap-2 md:gap-4">
          <h2 className='text-[#20AD96] text-sm md:text-[15px] uppercase font-medium'>{title}</h2>
          <h2 className='text-white font-semibold w-full md:w-[600px] lg:w-[700px] leading-normal text-[26px] md:text-[32px] lg:text-[36px]'>{subtitle}</h2>
        </div>

        {/* Left Bottom Content */}
        <div className="absolute bottom-4 left-4 md:left-8 lg:left-14 flex items-center text-white gap-2">
          <p className="text-sm text-white">{product.rating}</p>
          <FaStar className="text-yellow-400 pb-1" />
          <span className="text-sm">({product.reviews} reviews)</span>
        </div>

        {/* Right Bottom Content */}
        <div className="absolute bottom-4 right-4 md:right-8 lg:right-14 flex items-center space-x-3 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <span className="text-secondary"><FaUser size={16} /></span>
            <span className="text-white mt-1 font-light">{product.students}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-secondary"><IoDocumentTextOutline size={20} /></span>
            <span className="text-white mt-1 font-light">{product.lessons}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Staffs

const WorkingStaffs = ({ image = "/assets/about/staff.webp", name = "Raam", designation = "Sales Team Head" }) => {
  return (
    <section className="bg-white">
      <div className="p-4">
        <Image src={image} width={50} height={50} alt="staff" className="" />
        <h3 className="text-[16px]">{name}</h3>
        <p className="text-sm">{designation}</p>
      </div>
    </section>
  )
}


const StatCard = ({ title, value, unit, description }) => {
  return (
    <div className="flex flex-col grow shrink p-3 text-base bg-white rounded-3xl border border-solid border-neutral-100 min-w-[240px] w-[233px]">
      <h3 className="font-bold leading-snug text-neutral-800">{title}</h3>
      <div className="mt-6 text-6xl font-semibold leading-none text-sky-500 max-md:text-4xl">
        {value}
        {unit && <span className="text-base leading-loose text-gray-600"> {unit}</span>}
      </div>
      <p className="mt-6 leading-8 text-gray-600">{description}</p>
    </div>
  )
}


// Testimonial Card



const ProductCard = ({ product, homePage }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);

  const handleWishlistToggle = () => {
    if (homePage) {
      setIsInWishlist(!isInWishlist);
    }
    // You can add logic here to handle the wishlist functionality, e.g., API calls or context updates
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden w-fit max-w-xs relative">
      {/* Image */}
      <div className="relative w-full">
        <Image
          src={product.imageSrc}
          width={300}
          height={300}
          alt="product"
          className="object-cover w-full h-full"
        />
        <Button variant="primary" className="absolute bottom-0 right-0 bg-secondary text-white text-sm md:text-lg rounded-none rounded-tl-xl">
          {product.price}
        </Button>
        {/* Wishlist Button */}
        {homePage && (
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-4 right-4 p-2 rounded-full bg-[#F2F2F2] shadow-sm transition-all ${isInWishlist ? 'text-primary' : 'text-black'
              } flex items-center gap-x-1`}
          >
            {isInWishlist ? (
              <IoHeartSharp className="h-5 w-5" />
            ) : (
              <HiOutlineHeart className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
      <div className="p-4 space-y-3 md:py-5 lg:py-8">
        <h3 className="text-[13px] text-secondary font-semibold uppercase">{product.category}</h3>
        {/* Reviews */}
        <div className="flex flex-row items-center space-x-1">
          <p className="text-sm mt-1">{product.rating}</p>
          <span className="text-yellow-500 text-lg">
            <FaStar />
          </span>
          <span className="text-[#979797]">({product.reviewCount} reviews)</span>
        </div>
        <h2 className="text-[16px] md:text-lg lg:text-[19px] leading-normal font-bold text-gray-800">
          {product.title}
        </h2>
        {/* Info */}
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <div className="flex items-center space-x-1 mt-2">
            <span className="text-secondary"><FaUser size={16} /></span>
            <span className="text-[#696969] mt-1">{product.students}</span>
          </div>
          <div className="flex items-center space-x-1 mt-2">
            <span className="text-secondary"><IoDocumentTextOutline size={20} /></span>
            <span className="text-[#696969]">{product.lessons}</span>
          </div>
        </div>
      </div>
    </div>
  )
}



const CustomizedAlert = ({ isOpen, isOpenHandler, children }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={isOpenHandler} >
      <AlertDialogTrigger />
      <AlertDialogContent className="lg:max-w-[350px] xl:max-w-[350px] lg:rounded-[20px] xl:rounded-[20px]">
        {/* need this hidden title for error prevent purpose */}
        <AlertDialogTitle className="hidden">Submission Successful</AlertDialogTitle>
        {children}
      </AlertDialogContent>
    </AlertDialog>
  )
}


export { HeadingSection, AboutBanner, WorkingStaffs, StatCard, ProductCard, CourseBanner, CustomizedAlert }