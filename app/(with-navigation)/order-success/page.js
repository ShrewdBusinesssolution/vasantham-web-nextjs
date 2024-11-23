import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function OrderSucces() {
    return (
        <main className='bg-white'>
            <div className='brand-container min-h-screen'>
                <div className='flex flex-col items-center gap-3  pt-20'>
                    <Image src={'/assets/images/course-purchase-success.png'} width={200} height={200} alt='success-image' />
                    <div className='flex flex-col items-center gap-5'>
                        <h3 className='text-center'>You have successfully purchased the course</h3>
                        <p className='text-center'>You course has been successfully purchased, Click the below button to
                            see your course status.</p>
                            <Link href={'/profile'}>
                            <Button variant="primary" className="uppercase">
                                Check Course
                            </Button>
                            </Link>
                    </div>
                </div>

            </div>

        </main>
    )
}
