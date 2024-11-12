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
  const menuRef = useRef(null);
  const {data:session} = useSession();
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

  const [isCartOpen, setIsCartOpen] = useState(false);

  
  const handleOpen = () => setIsCartOpen(true);
  const handleClose = () => setIsCartOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="flex flex-col lg:flex-row justify-between items-center brand-container py-5">
        {/* LOGO */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <div className="flex items-center cursor-pointer">
            <Image src={COLORLOGOPATH} width={150} height={75} alt="logo" />
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Search */}
            <SearchForm />
            {/* Cart */}
            <CartModal />
            {/* User */}
            <div>
            <Popover className="absolute top-0 right-10">
              <PopoverTrigger asChild>
                <Button variant="outline" className="p-2 rounded-full bg-[#F7F7F7] border-none" size="icon" ><div className="">
                  <Image
                    src="/assets/svg/user.svg"
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
                      <Link href="/profiles"><li className="w-full p-2 hover:bg-gradient-to-br from-white to-blue-100 from-20% rounded-[10px]">My Profile</li></Link>
                      <li>
                        <LogoutModal />
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
              className="rounded-md shadow-primary/20 shadow-lg px-1 py-[20px] border bg-white"
              onClick={handleMenuClick}
            >
              {menuOpen ? (
                <FiX className="text-primary w-8 h-8" />
              ) : (
                <FiMenu className="text-primary w-8 h-8" />
              )}
            </Button>
          </div>
        </div>

        {/* Large screens List */}
        <div className="hidden lg:flex w-auto lg:space-x-14 items-center">
          <ul className="flex lg:flex-row space-x-8">
            <li>
              <Link href={'/'} className={`${pathname === '/' ? 'text-primary' : 'text-[#858585] text-[15px]'} hover:text-primary`}>Home</Link>
            </li>
            <li>
              <Link href="/about" className={`${pathname === '/about' ? 'text-primary ' : ' text-[#858585] text-[15px]'} hover:text-primary`} >
                About
              </Link>
            </li>
            <li>
              <Link href="/courses" className={`${pathname === '/Courses' ? ' text-primary' : 'text-[#858585] text-[15px]'} hover:text-primary`}>
                Courses
              </Link>
            </li>
            <li>
              <Link href="/contact" className={`${pathname === '/contact' ? ' text-primary' : 'text-[#858585] text-[15px]'} hover:text-primary`}>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Large Screen */}
        <div className="hidden lg:flex items-center gap-5">
          {/* Search */}
           <SearchForm />
          {/* Cart */}
            <CartModal />
            
          {/* User */}
          <div>
            <Popover className="absolute top-0 right-10">
              <PopoverTrigger asChild>
                <Button variant="outline" className="p-2 rounded-full bg-[#F7F7F7] border-none" size="icon" ><div className="">
                  <Image
                    src="/assets/svg/user.svg"
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
                      <Link href="/profiles"><li className="w-full p-2 hover:bg-gradient-to-br from-white to-blue-100 from-20% rounded-[10px]">My Profile</li></Link>
                      <li>
                        <LogoutModal />
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
