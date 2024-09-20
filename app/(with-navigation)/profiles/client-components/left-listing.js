import React from 'react'
import Image from 'next/image'
import { LuPencilLine } from 'react-icons/lu'

export const LeftListing = () => {
  return (
<main className="">
    <div className="">
    {/* Left Side */}
    <div className='flex flex-row justify-between items-center border-b'>
    <div className='flex gap-2 items-center'>
                <div className='flex flex-row items-center gap-5'>
                    <p className='bg-[#8A3AC8] rounded-full p-3 text-[#fff]'>MP</p>
                    <div className="flex flex-col">
                        <h5 className="font-semibold text-[26px]">hi, Mounika</h5>
                        <p className="text-sm text-primary">8787898989</p>
                    </div>
                </div>
    </div>
                <div className="p-2 bg-gradient-to-br from-[#fff] to-[#CCF4FF] from-0% rounded-lg">
    <LuPencilLine size={22} className="text-primary"/>
                </div>
    </div>
<h5>sdh</h5>

    </div>
</main>
)
}
