import ForgotPasswordForm from '@/app/form-components/forgot-password-form'
import { LOGOPATH } from '@/app/utility/helper'
import { getServerSession } from 'next-auth'
import { FaArrowLeft } from "react-icons/fa";
import Link from 'next/link';

import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function ForgotPassword() {
    const session = await getServerSession()
    if (session) {
      redirect("/");
    }
    return (
        <main className='h-screen max-w-screen bg-white'>
            <div className='grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-2'>
            <div className='h-screen bg-cover hidden md:hidden lg:block xl:block relative'>
            <Image src={'/assets/login.webp'} fill={true} 
                    className=' object-fit'
                    priority={true}
                    />
                </div>
                
                <div className='px-5 md:px-10 xl:px-20 flex flex-col justify-center space-y-3'>
                <div className='flex gap-3 items-center text-[#07A889] font-medium uppercase pb-10 md:pb-16'>
                <FaArrowLeft />
                <Link href="/login" className="text-[14px]">Back to login </Link>
                </div>
                        <h6 className='font-bold'>Forgot Password</h6>
                        <p className='text-[15px]'>We have sent the OTP to <span className='text-primary'>priyas2001@gmail.com</span></p>
                    <ForgotPasswordForm />
                </div>
            </div>
        </main>
    )
}
