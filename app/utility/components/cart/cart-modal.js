"use client"
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FaUser } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiDeleteBin4Line } from "react-icons/ri";
import Link from 'next/link';
import Image from "next/image";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/context-api";
import { useSession } from "next-auth/react";
import { IoCloseSharp } from "react-icons/io5";

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

export function CartModal() {
  const { data: session } = useSession();

  const { cartData, cartModal, setCartModal, checkoutHandling, cartCourseInformation, cartSummary } = useContext(AppContext);
  useEffect(() => {
    if (cartModal && session) {
      checkoutHandling();
    }
  }, [cartModal, cartData])

  return (
    <Sheet open={cartModal} onOpenChange={setCartModal}>
      <SheetTrigger asChild>
        <button className="p-2 bg-[#F7F7F7] rounded-full relative" >
          {cartData.length !== 0 ?
            <div className=' h-5 w-5 bg-primary rounded-full border-white border-[1px] absolute top-[-2px] right-[-10px] grid place-content-center'>
              <p className='text-[10px] text-white'>{cartData.length}</p>
            </div>
            : null
          }
          <Image
            src="/assets/svg/cart.svg"
            width={20}
            height={20}
            alt="cart"
          />
        </button>
      </SheetTrigger>
      <SheetContent closeicon={false} className="flex flex-col h-full overflow-hidden px-0">
        <SheetHeader className="border-b px-4">
          <div className="flex justify-between mb-2">
            <SheetTitle className="text-lg font-bold">My Cart</SheetTitle>
            <IoCloseSharp onClick={()=>setCartModal(false)} className="active:opacity-65 cursor-pointer" size={24} />
          </div>
        </SheetHeader>


        {/* Card Design */}
        {session ?
          <>
            <div className='flex-1 overflow-y-auto hide-y-scrollbar px-4'>
              {cartCourseInformation.map((course, index) => (
                <div key={index} className='rounded-xl border-2 flex flex-col px-3 py-2 mb-4'>
                  <CardComponent course={course} />
                </div>
              ))}
            </div>
            {/* Total Price Section */}
            <div className="flex flex-col justify-center bg-white px-4">
              <p className="mt-4 text-start font-medium">
                Total: <span className='font-bold'>₹ {cartSummary?.order_total ?? 0.00}</span>

                {cartSummary?.order_discount !== 0 ?
                  <span className="line-through text-[16px] text-gray-500 font-normal">
                    ₹ {cartSummary?.order_discount_value ?? 0.00}
                  </span>

                  :
                  null
                }
              </p>
              <div className="mt-2">
                <Link onClick={() => setCartModal(false)} href={'/checkout'}>
                  <Button variant="primary" className="w-full uppercase text-sm">Checkout</Button>
                </Link>
              </div>
            </div>
          </>

          :
          <div className="w-full h-full grid place-items-center px-3">

            <div className="flex flex-col items-center gap-5 justify-center">
              <p>You Have to Login</p>
              <Link onClick={() => setCartModal(false)} href={'/login'}>

                <Button variant="primary">
                  Login
                </Button>
              </Link>

            </div>
          </div>
        }

      </SheetContent>
    </Sheet>
  );
}

const CardComponent = ({ course }) => {
  const { removeFromCart, } = useContext(AppContext);

  return (
    <div className="mb-2  flex flex-col gap-2">
      <h4 className="mt-2 text-lg">{course.name}</h4>
      <p className="">
        Course fee :  <span className="font-bold ml-1"> ₹{course.sale_price} </span><span className="line-through text-gray-400">₹{course.price}</span>
      </p>
      <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0 items-center">
        <div className='flex items-center gap-4 md:gap-2'>
          <div className="flex items-center space-x-1">
            <span className="text-secondary"><FaUser size={16} /></span>
            <span className="mt-1 font-light text-[14px]">22 Students</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-secondary"><IoDocumentTextOutline size={20} /></span>
            <span className="mt-1 font-light text-[14px]">22 Lessons</span>
          </div>
        </div>
        <div onClick={() => removeFromCart(course.id)} className="bg-[#E9E9E9] rounded-lg p-2 cursor-pointer active:opacity-50">
          <RiDeleteBin4Line />
        </div>
      </div>
    </div>
  );
};
