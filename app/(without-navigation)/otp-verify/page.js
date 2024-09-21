import OtpVerifyForm from '@/app/form-components/otp-verify-form'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'
import { LuArrowLeft } from 'react-icons/lu'
import Link from 'next/link'

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
                    alt="Image"
                    />
                </div>
                <div className='py-10 md:py-0 px-5 md:px-10 xl:px-20 flex flex-col justify-center space-y-3'>
                <div className='flex gap-3 items-center text-[#07A889] uppercase pb-10 md:pb-24'>
                <LuArrowLeft size={22} className='font-light'/>
                <Link href="/login" className="text-[14px] font-semibold">Back to login </Link>
                </div>
                <h6 className='font-bold'>Forgot Password</h6>
                <OtpVerifyForm />
                    </div>
                </div>
        </main>
    )
}
