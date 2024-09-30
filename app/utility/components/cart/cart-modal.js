import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FaUser } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
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

export function CartModal({ isOpen, onClose }) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetTrigger asChild>
        {/* <Button variant="outline" onClick={onClose}>Open</Button> */}
      </SheetTrigger>
      <SheetContent className="flex flex-col h-full overflow-hidden">
        <SheetHeader className="border-b-2">
          <SheetTitle className="text-lg font-bold">My Cart</SheetTitle>
        </SheetHeader>

        {/* Card Design */}
        <div className='flex-1 overflow-y-auto hide-y-scrollbar'>
          {courses.map((course, index) => (
            <div key={index} className='rounded-xl border-2 flex flex-col p-5 mb-4'>
              <CardComponent course={course} />
            </div>
          ))}
        </div>

        {/* Total Price Section */}
        <div className="flex flex-col justify-center bg-white">
          <p className="mt-4 text-start font-medium">
            Total: <span className='font-bold'>₹{courses.reduce((total, course) => total + course.price, 0)}</span>
            <span className="line-through text-[16px] text-gray-500 font-normal">
               ₹{courses.reduce((total, course) => total + course.originalPrice, 0)}
            </span>
          </p>
          <div className="mt-2">
            <Link href={'/checkout'}>
              <Button variant="primary" className="w-full uppercase text-sm">Checkout</Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

const CardComponent = ({ course }) => {
  return (
    <div className="mb-2 md:mb-5 flex flex-col gap-2">
      <h4 className="mt-2 text-lg">{course.title}</h4>
      <p className="font-bold">
        Course fee: ₹{course.price} <span className="line-through text-gray-400">₹{course.originalPrice}</span>
      </p>
      <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0 items-center">
        <div className='flex items-center gap-4 md:gap-2'>
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
