"use client"
import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/context-api';
import { BiLoaderCircle } from "react-icons/bi";


export default function Loader() {
    const { preloader } = useContext(AppContext); // Default to an empty array

    useEffect(() => {
        if (preloader) {
          // Disable scrolling
          document.body.style.overflow = 'hidden';
        } else {
          // Enable scrolling
          document.body.style.overflow = '';
        }
    
        // Cleanup on unmount
        return () => {
          document.body.style.overflow = '';
        };
      }, [preloader]);
  return (
    <main className={`${preloader ? 'fixed' : 'hidden'} inset-0 bg-black/20 z-50 backdrop-blur-sm grid place-items-center`}>
        <BiLoaderCircle className='text-primary animate-spin h-10 w-10'  />
    </main>
  )
}
