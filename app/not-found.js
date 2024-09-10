import Image from 'next/image'
import React from 'react'

export default function NotFound() {
    return (
        <main className='band-container h-screen w-full grid place-items-center'>

            <div className='flex flex-col items-center gap-8'>
                <h1 className='text-[#00518A] text-center'>oops!</h1>
                <h5 className='text-[#B7D3DD] font-normal'>Page not found</h5>
                <Image src={'/assets/not-found-pic.webp'} alt='not found pic'
                    width={500}
                    height={300}
                    className='w-[500px] h-auto'
                />
            </div>


        </main>
    )
}
