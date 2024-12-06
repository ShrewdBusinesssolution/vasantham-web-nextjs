"use client"
import React, { useContext, useEffect, useState } from "react"
import Image from "next/image"
import { FaStar, FaUser, FaHeart } from "react-icons/fa"
import { IoDocumentTextOutline, IoHeartSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { HiOutlineHeart } from "react-icons/hi2";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogOverlay, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import ProfileService from "@/app/services/api-services/profile-service";
import { toast } from "sonner";
import Link from "next/link";
import { AppContext } from "../context/context-api";
import { BsCart2, BsCheckCircle, BsTrash } from "react-icons/bs";
import { getSession } from "next-auth/react";
import { LuLoader2 } from "react-icons/lu";

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
    <section className='flex flex-col h-[40vh]  justify-center py-24 bg-cover bg-bottom relative overflow-hidden ' style={{ backgroundImage: `url("/assets/basic/about-banner.png")` }}>
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
    <section className='flex flex-col  justify-center py-10 bg-cover bg-bottom relative overflow-hidden' style={{ backgroundImage: `url("/assets/courses/coursebg.webp")` }}>
      <div className='absolute z-0 inset-0 bg-[#00518A] opacity-[70%]' />
      <div className="brand-container px-6">
        {/* Text */}
        <div className="relative z-10 flex flex-col gap-2 md:gap-4">
          <h2 className='text-[#20AD96] text-sm md:text-[15px] uppercase font-medium'>{title}</h2>
          <h2 className='text-white font-semibold w-full md:w-[600px] lg:w-[700px] leading-normal text-[26px] md:text-[32px] lg:text-[36px]'>{subtitle}</h2>
        </div>

        {/* Left Bottom Content */}
        <div className="relative flex justify-between  text-white mt-10">
          <div className="flex items-center gap-2">
            <p className="text-sm text-white">{product.rating}</p>
            <FaStar className="text-yellow-400 pb-1" />
            <span className="text-sm">({product.reviews} reviews)</span>
          </div>
          <div className="flex flex-wrap gap-3 items-center justify-end">
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
        {/* Right Bottom Content */}
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



const ProductCard = ({ product, homePage, fromwalkingUser = true }) => {
  const [isInWishlist, setIsInWishlist] = useState(product?.wishlist ?? false);
  const [wishlistLoading, setwishlistLoading] = useState(false);
  const link = `/course-detail/${product?.slug}`;

  const handleWishlistToggle = () => {
    if (homePage) {
      HandlingWishlist()
    }
    // You can add logic here to handle the wishlist functionality, e.g., API calls or context updates
  };

  const HandlingWishlist = async () => {
    try {
      const session = await getSession();
      if (!session) {
        toast.warning("Please Login", { position: "top-right" });
        return null;
      }
      setwishlistLoading(true);
      const response = await ProfileService.wishlistUpdate({
        course_id: product.id,
        status: !isInWishlist
      })
      if (response.status) {
        toast.success(response.message, { position: "top-right", duration: 2000 })
        setIsInWishlist(!isInWishlist)
      }
    } catch (error) {
      const message = error?.response?.data?.message ?? error.message;
      toast.error(message, { position: 'top-right', duration: "2000" })
    } finally {
      setwishlistLoading(false);

    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden w-full relative">
      {/* Image */}
      <Link href={link}>

        <div className="relative w-full">

          <Image
            src={product.image}
            width={300}
            height={300}
            alt="product"
            className="w-full  object-cover object-center max-sm:h-[20vh] h-[180px] aspect-square"
          />

          <div className="absolute bottom-0 right-0 bg-secondary rounded-none rounded-tl-xl px-3 py-2 flex gap-2 items-center">
            <small className="text-white line-through">
              ₹  {product.price}
            </small>
            <p className=" text-white text-sm md:text-lg ">
              ₹ {product.sale_price}
            </p>
          </div>
        </div>
      </Link>
      {/* Wishlist Button */}
      {homePage && (
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-4 right-4 p-2 rounded-full bg-[#F2F2F2] shadow-sm transition-all ${isInWishlist ? 'text-primary' : 'text-black'
            } flex items-center gap-x-1`}
        >
          {wishlistLoading ? (
            <LuLoader2 className="h-5 w-5 text-primary animate-spin" />
          ) : isInWishlist ? (
            <IoHeartSharp className="h-5 w-5 text-red-500" />
          ) : (
            <HiOutlineHeart className="h-5 w-5" />
          )}

        </button>
      )}
      <Link href={link}>
        <div className="p-4 space-y-3 md:py-5 lg:py-8">
          <h3 className="text-[13px] text-secondary font-semibold uppercase max-sm:w-[80vw] text-wrap">{product?.subject?.name}</h3>
          {/* Reviews */}
          <div className="flex flex-row items-center space-x-1">
            <p className="text-sm mt-1">{product.ratings}</p>
            <span className="text-yellow-500 text-lg">
              <FaStar />
            </span>
            <span className="text-[#979797]">(22 reviews)</span>
          </div>
          <h2 className="text-[16px] md:text-lg lg:text-[19px] leading-normal font-bold text-gray-800 max-sm:w-[80vw] text-wrap">
            {product.name}
          </h2>
          {/* Info */}
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <div className="flex items-center space-x-1 mt-2">
              <span className="text-secondary"><FaUser size={16} /></span>
              <span className="text-[#696969] mt-1">{product?.people ?? 0}</span>
            </div>
            <div className="flex items-center space-x-1 mt-2">
              <span className="text-secondary"><IoDocumentTextOutline size={20} /></span>
              <span className="text-[#696969]">{product?.lecture_count ?? 0}</span>
            </div>
          </div>
        </div>
      </Link>

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

const AddtoCartButton = ({ product_id, bought = false, slug }) => {
  const { cartData = [], addToCart, removeFromCart } = useContext(AppContext); // Default to an empty array
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const result = cartData.some((item) => item.id === product_id);
    setIsAdded(result);
  }, [cartData, product_id]);

  return (
    <div className="flex justify-center items-center">
      {bought ? (
        <Link href={`/course-unit-detail/${slug}`}>
          <Button
            variant="primary"
            className="mt-2 px-8 text-sm flex items-center gap-x-2 w-full"
            disabled
          >
            View Unit
          </Button>
        </Link>
      ) : isAdded ? (
        <Button
          variant=""
          className="mt-2 uppercase bg-green-500 px-8 text-sm flex items-center gap-x-2 w-full"
        >
          <div className="flex gap-x-2">
            Added <BsCheckCircle size={20} />
          </div>
        </Button>
      ) : (
        <Button
          onClick={() => addToCart(product_id)}
          variant="primary"
          className="mt-2 uppercase px-8 text-sm flex items-center gap-x-2 w-full"
        >
          Add to cart <BsCart2 size={20} />
        </Button>
      )}
    </div>
  );
};

export { HeadingSection, AboutBanner, WorkingStaffs, StatCard, ProductCard, CourseBanner, CustomizedAlert, AddtoCartButton }