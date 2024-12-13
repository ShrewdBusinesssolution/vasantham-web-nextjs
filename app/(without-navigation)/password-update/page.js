import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Update = () => {
  return (
    <main className="h-screen max-w-screen bg-white">
      <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-2">
        <div className="h-screen bg-cover hidden md:hidden lg:block xl:block relative">
          <Image
            src={"/assets/login.webp"}
            fill={true}
            className=" object-fit"
            priority={true}
            alt="Image"
          />
        </div>
        <div className="py-10 md:py-0 px-5 md:px-10 xl:px-20 flex flex-col justify-center space-y-4">
          <Image src="/assets/gif/enquery.gif" className='' width={100} height={100} alt="Image" />
          <h6 className="font-bold capitalize">Your Password Updated Successfully!</h6>
          <p className='text-[16px]'>The password will be updated to our records, Kindly enter your
            new password and login again.</p>
          <Link href="/login">
            <Button variant="primary" className="uppercase w-fit px-5 text-xs">Back to login</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Update