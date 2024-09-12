import LoginForm from '@/app/form-components/login-form'
import { LOGOPATH } from '@/app/utility/helper'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Login() {
  const session = await getServerSession()
   if(session){
        redirect('/')
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
                <div className='py-10 md:py-0 px-5 md:px-10 xl:px-20 flex flex-col justify-center space-y-3'>
                    
                    <h6 className='font-bold'>Login your Account</h6>
                    <LoginForm />
                </div>
            </div>
        </main>
    )
}
