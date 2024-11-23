import LoginForm from '@/app/form-components/login-form'
import { checkSessionAndRedirect } from '@/app/utility/sessionHelper';
import Image from 'next/image'
import React from 'react'

export default async function Login() {
     await checkSessionAndRedirect("/");

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
                    
                    <h6 className='font-bold'>Login your Account</h6>
                    <LoginForm />
                </div>
            </div>
        </main>
    )
}
