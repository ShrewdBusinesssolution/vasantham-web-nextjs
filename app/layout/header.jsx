"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { COLORLOGOPATH } from "../utility/constant";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { FadeBottom, FadeUp } from "@/app/utility/animation";
import { usePathname } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { LogoutModal } from "../form-components/logout-modal";
import { useSession } from "next-auth/react";
import { CartModal } from "../utility/components/cart/cart-modal";
import SearchForm from "../form-components/search-form";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const closePopover = () => {
    setIsPopoverOpen(false);
  };
  const menuRef = useRef(null);
  const { data: session } = useSession();
  const pathname = usePathname();

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuClick = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50 bg-white w-full">
      <div className="flex flex-row justify-between items-center brand-container py-5">
        {/* LOGO */}
        <Link href={'/'}>
        <div className="flex items-center cursor-pointer">
          <Image src={COLORLOGOPATH} width={150} height={75} alt="logo" className="max-sm:w-[30vw] w-[150px] h-auto" />
        </div>
        </Link>
        {/* Large screens List */}
        <div className="hidden lg:flex w-auto lg:space-x-14 items-center">
          <ul className="flex lg:flex-row space-x-8">
            <li>
              <Link href={'/'} className={`font-medium ${pathname === '/' ? 'text-[#07A889]' : 'text-[#858585] text-[15px]'} hover:text-[#07A889]`}>Home</Link>
            </li>
            <li>
              <Link href="/about" className={`font-medium ${pathname === '/about' ? 'text-[#07A889] ' : ' text-[#858585] text-[15px]'} hover:text-[#07A889]`} >
                About
              </Link>
            </li>
            <li>
              <Link href="/courses" className={`font-medium ${pathname === '/courses' ? ' text-[#07A889]' : 'text-[#858585] text-[15px]'} hover:text-[#07A889]`}>
                Courses
              </Link>
            </li>
            <li>
              <Link href="/contact" className={`font-medium ${pathname === '/contact' ? ' text-[#07A889]' : 'text-[#858585] text-[15px]'} hover:text-[#07A889]`}>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-2 ">
          {/* Search */}
          <SearchForm />
          {/* Cart */}
          <CartModal />
          {/* User */}
          <div>
            <Popover className="" open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="max-sm:p-1 p-2 rounded-full bg-[#F7F7F7] border-none" size="icon" ><div className="">
                  <Image
                    src="/assets/svg/user.svg"
                    className="max-sm:w-[3vw] max-md:w-[20px] max-sm:h-auto"
                    width={20}
                    height={20}
                    alt="user"
                  />
                </div></Button>
              </PopoverTrigger>
              <PopoverContent className="w-fit p-0 rounded-xl">
                <div className="w-[150px] p-2 cursor-pointer">
                  {session ?
                    <ul>
                      <Link onClick={closePopover} href="/profile" ><li className="w-full p-2 hover:bg-gradient-to-br from-white to-blue-100 from-20% rounded-[10px] "><p>My Profiles</p></li></Link>
                      <li>
                        <LogoutModal PopovercloseHandling={closePopover} />
                      </li>
                    </ul>
                    :
                    <ul>
                      <li>
                        <Link href="/login"><li className="w-full p-2 hover:bg-gradient-to-br from-white to-blue-100 from-20% rounded-[10px]">login</li></Link>
                      </li>
                      <li>
                        <Link href="/sign-up"><li className="w-full p-2 hover:bg-gradient-to-br from-white to-blue-100 from-20% rounded-[10px]">sign up</li></Link>
                      </li>
                    </ul>}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          {/* Mobile Menu Icon */}
          <Button
            variant="secondary"
            className=" shadow-primary/20 shadow-lg max-sm:p-2 p-3 border bg-white max-lg:flex hidden aspect-square rounded-full"
            onClick={handleMenuClick}
          >
            {menuOpen ? (
              <FiX className="text-primary max-sm:w-[4vw] max-sm:h-auto  asp w-8 h-8" />
            ) : (
              <FiMenu className="text-primary max-sm:w-[4vw] max-sm:h-auto  asp w-8 h-8" />
            )}
          </Button>
        </div>

      </div>

      {/* Mobile Menu List */}
      <AnimatePresence mode="wait">
        {menuOpen && (
          <motion.div
            ref={menuRef}
            className="absolute top-22 left-0 w-full h-fit bg-white rounded-b-3xl shadow-lg z-20 lg:hidden xl:hidden border-b border-t-0 border-[#acbefa]"
            variants={FadeBottom(0.2)}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex flex-col gap-2 text-center p-5">
              <Link href={'/'} className={`${pathname === '/' ? 'text-primary' : 'text-[#858585] text-[15px]'} hover:text-primary`} onClick={() => setMenuOpen(false)}>Home</Link>
              <Link href={"/about"} className={`${pathname === '/about' ? 'text-primary ' : ' text-[#858585] text-[15px]'} hover:text-primary`} onClick={() => setMenuOpen(false)}>
                About Us
              </Link>
              <Link href={"/courses"} className={`${pathname === '/Courses' ? ' text-primary' : 'text-[#858585] text-[15px]'} hover:text-primary`} onClick={() => setMenuOpen(false)}>
                Courses
              </Link>
              <Link href={"/contact"} className={`${pathname === '/contact' ? ' text-primary' : 'text-[#858585] text-[15px]'} hover:text-primary`} onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
