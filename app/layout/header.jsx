"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { COLORLOGOPATH } from "../utility/constant";
import Link from "next/link";
import { GoSearch } from "react-icons/go";
import { FiMenu, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { FadeBottom } from "@/app/utility/animation";
import { usePathname } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
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
    <header className="sticky top-0 z-50 bg-white">
      <div className="flex flex-col lg:flex-row justify-between items-center brand-container py-5">
        {/* LOGO */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <div className="flex items-center">
            <Image src={COLORLOGOPATH} width={150} height={75} alt="logo" />
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Search */}
            <button className="p-2 text-white bg-primary rounded-full ">
              <GoSearch className="w-6 h-6" />
            </button>
            {/* Cart */}
            <button className="p-2 bg-[#F7F7F7] rounded-full">
              <Image
                src="/assets/svg/cart.svg"
                width={20}
                height={20}
                alt="cart"
              />
            </button>
            {/* User */}
            <button className="p-2 bg-[#F7F7F7] rounded-full">
              <Image
                src="/assets/svg/user.svg"
                width={20}
                height={20}
                alt="user"
              />
            </button>
            {/* Mobile Menu Icon */}
            <Button
              variant="secondary"
              className="rounded-md shadow-primary/20 shadow-lg px-1 py-[20px] border bg-white"
              onClick={handleMenuClick}
            >
              {menuOpen ? (
                <FiX className="text-primary w-9 h-8" />
              ) : (
                <FiMenu className="text-primary w-9 h-8" />
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
          <div className="relative rounded-full p-1 pl-4 px-2 flex items-center gap-2 border-[1px] border-[#E9E9E9] w-full max-w-[250px]">
            <input
              type="text"
              className="placeholder:text-[15px] placeholder:px-1 w-full text-black/40 focus:outline-none"
              placeholder="search"
            />
            <p className="bg-primary rounded-full p-1">
              <GoSearch className="w-6 h-6 text-white" />
            </p>
          </div>
          {/* Cart */}
          <div className="p-3 bg-[#F7F7F7] rounded-full">
            <Image
              src="/assets/svg/cart.svg"
              width={25}
              height={25}
              alt="cart"
            />
          </div>
          {/* User */}
          
<div>
          <Popover className="absolute top-0 right-10">
      <PopoverTrigger asChild>
        <Button variant="outline" className="rounded-full bg-[#F7F7F7]" size="icon" ><div className="">
            <Image
              src="/assets/svg/user.svg"
              width={20}
              height={20}
              alt="user"
            />
          </div></Button>
      </PopoverTrigger>
      <PopoverContent  className="w-fit p-0 rounded-xl">
        <div className="w-[150px] p-2 ">
          <ul>
            <li className="w-full p-2 hover:bg-gradient-to-br from-white to-blue-100 from-20% rounded-[10px]">My Profile</li>
            <li className="w-full p-2 hover:bg-gradient-to-br from-white to-blue-100 from-20% rounded-[10px]">Logout</li>
          </ul>
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
