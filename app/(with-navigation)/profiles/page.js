import React from 'react'
import { LeftListing } from './client-components/left-listing'
import { RightListing } from './client-components/right-listing'

const Page = () => {
  return (
<main className='bg-[#f7f7f7] py-6'>
  <div className="brand-container flex flex-col md:flex-row gap-5">
{/* left Side */}
    <div className="w-full md:w-1/3 bg-[#fff] border-r rounded-2xl p-2">
    <LeftListing/>
    </div>

{/* Right Side */}
    <div className="w-full md:w-2/3">
    <RightListing/>
    </div>

    </div>
</main>
)
}

export default Page