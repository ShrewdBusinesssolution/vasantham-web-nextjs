import React from "react"
import Image from "next/image"
import { FaStar, FaUser } from "react-icons/fa"
import { IoDocumentTextOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";

const HeadingSection = ({ title = "Why choose us", subtitle= "Why choose our courses?"}) => {
    return (
       <div className="flex flex-col justify-center items-center gap-2 md:gap-3">
        <h4 className="uppercase text-sm text-secondary">{title}</h4>
        <p className="font-bold text-[22px] md:text-[32px] text-center">{subtitle}</p>
       </div>
    )
}

// About Banner

const AboutBanner = ({ title = "Why choose us", subtitle= "Why choose our courses?"}) => {
    return (
<section className='flex flex-col h-[calc(75vh-80px)]  justify-center py-24 bg-cover bg-bottom relative overflow-hidden ' style={{ backgroundImage: `url("/assets/basic/about-banner.png")` }}>
          <div className='absolute z-0 inset-0 bg-[#00518A] opacity-[70%]' />
          {/* Text */}
          <div className="relativea z-10 brand-container flex flex-col justify-center items-center gap-4">
            <h2 className='text-[#20AD96] text-sm md:text-[17px] uppercase font-medium'>{title}</h2>
            <h2 className='text-white text-center px-5 md:px-0 w-full md:w-[700px] lg:w-[800px] leading-normal md:text-[48px]'>{subtitle}</h2>
          </div>
        </section>
    )
}

// Staffs

const WorkingStaffs = ({  image = "/assets/about/staff.webp", name = "Raam", designation = "Sales Team Head"}) => {
    return (
<section className="bg-white">
<div className="p-4">
    <Image src={image} width={50} height={50} alt="staff" className=""/>
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
const TestimonialCard = ({ name, content, desc, description }) => {
  return (
    <div className="flex flex-col space-y-4 p-8 bg-white bg-opacity-50 rounded-3xl max-md:px-5">
      <div className="flex flex-row justify-end">
      <Image src={"/assets/basic/quotes.webp"} width={50} height={50} alt="quotes" className=""/>
      </div>
      <div className="flex flex-col space-y-3">
        <h4 className="text-2xl font-semibold leading-none text-primary mt-4">{name}</h4>
        <p className=" text-[16px] leading-8 text-[#535967]">{content}</p>
        <p className=" text-[16px] leading-8 text-[#535967]">{desc}</p>
        <p className=" text-[16px] leading-8 text-[#535967]">{description}</p>
      </div>
    </div>
  );
};


const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden w-fit max-w-xs">
      {/* Image */}
      <div className="relative w-full">
        <Image
          src={product.imageSrc}
          width={300}
          height={300}
          alt="product"
          className="object-cover w-full h-full"
        />
        <Button variant="primary" className="absolute bottom-0 right-0 bg-secondary text-white text-lg rounded-none rounded-tl-xl">
          {product.price}
        </Button>
      </div>
      <div className="p-4 space-y-3 py-8">
        <h3 className="text-[13px] text-secondary font-semibold uppercase">{product.category}</h3>
        {/* Reviews */}
        <div className="flex flex-row items-center space-x-1">
          <p className="text-sm mt-1">{product.rating}</p>
          <span className="text-yellow-500 text-lg">
            <FaStar />
          </span>
          <span className="text-[#979797]">({product.reviewCount} reviews)</span>
        </div>
        <h2 className="text-[19px] leading-normal font-bold text-gray-800">
          {product.title}
        </h2>
        {/* Info */}
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <div className="flex items-center space-x-1 mt-2">
            <span className="text-secondary"><FaUser size={16}/></span>
            <span className="text-[#696969] mt-1">{product.students}</span>
          </div>
          <div className="flex items-center space-x-1 mt-2">
            <span className="text-secondary"><IoDocumentTextOutline size={20}/></span>
            <span className="text-[#696969]">{product.lessons}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const StaffCard = ({ staff }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden w-fit max-w-xs p-3">
      {/* Image */}
      <div className="relative w-full">
        <Image
          src={staff.imageSrc}
          width={300}
          height={300}
          alt="product"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="text-center space-y-3 mt-3 py-2">
        <h3 className="text-[17px] font-medium">{staff.name}</h3>
        <p className="text-[14px] leading-normal font-light text-[#B5B6B5]">
          {staff.para}
        </p>
      </div>
    </div>
  )
}

export { HeadingSection, AboutBanner, WorkingStaffs, StatCard, TestimonialCard, ProductCard, StaffCard}