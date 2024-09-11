
import NewPasswordForm from '@/app/form-components/new-password-form'
import { LOGOPATH } from '@/app/utility/helper'
import { getServerSession } from 'next-auth'

import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function NewPassword() {
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
                <div className='px-5 md:px-10 xl:px-20 py-10 md:pt-10 xl:pt-10 space-y-3'>
                    <Image src={LOGOPATH}
                        width={100}
                        height={75}
                        alt='logo' />
                    <h6 className='font-medium'>Hello James&#33;</h6>
                    <p className='text-sm'>Reset your password now&#33;</p>
                    <NewPasswordForm />
                </div>
            </div>
        </main>
    )
}
