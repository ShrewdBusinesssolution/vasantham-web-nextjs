"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const paymentMethod = [
    {
        "title": "Cash On Delivery",
        "slug": "cash-on-delivery",
        "image": "http://admin-pest-control-ecommerce.shrewdbs.com/uploads/payment_method/1724330656-66c732a080abb.png"
    },
    {
        "title": "Online Payment",
        "slug": "online-payment",
        "image": "http://admin-pest-control-ecommerce.shrewdbs.com/uploads/payment_method/1724330666-66c732aa4537d.png"
    }
];

const CheckOutClientComponent = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!phoneNumber || !country || !state) {
            setError('All fields are required.');
        } else {
            setError('');
            console.log('Form submitted:', { phoneNumber, country, state });
        }
    };

    return (
        <main className='bg-[#FCFCFC] py-10 md:px-6 lg:px-10'>
            <div className='flex flex-col md:flex-row justify-center items-start brand-container gap-5 min-h-screen'>
                {/* Left side */}
                <div className='w-full md:w-1/2 h-[400px] rounded-2xl bg-[#F7F7F7] p-5 border border-[#E9E9E9] flex flex-col'>
                    <h2 className='text-[24px]'>Checkout</h2>
                    <form onSubmit={handleSubmit} className="mt-5 md:mt-8 flex-grow">
                        <div className="mb-5">
                            <label className="block mb-2 font-bold text-[18px]">Phone Number</label>
                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full p-2.5 border rounded placeholder:text-[#B5B6B5]"
                                placeholder="Enter Phone Number"
                            />
                        </div>
                        
                        <div className="mb-5 items-center">
                            <label className="block mb-2 font-bold text-[18px]">Country</label>
                            <select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full p-3 border rounded"
                            >
                                <option value="">Choose Country</option>
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                                <option value="Canada">Canada</option>
                                {/* add countries */}
                            </select>
                        </div>

                        <div className="mb-5 items-center">
                            <label className="block mb-2 font-bold text-[18px]">State</label>
                            <select
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="w-full p-3 border rounded"
                            >
                                <option value="">Choose State</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="California">California</option>
                                <option value="Ontario">Ontario</option>
                                {/* add states.. */}
                            </select>
                        </div>

                        {error && <span className="text-red-500 text-sm">{error}</span>}
                    </form>
                </div>
                
                {/* Right side */}
                <div className='w-full md:w-1/2 h-[400px] rounded-2xl bg-[#F7F7F7] p-5 border border-[#E9E9E9] flex flex-col'>
                    <h2 className='text-[24px] underline pb-5'>Summary</h2>
                    <div className='flex flex-col gap-4 pb-4 border-b-2 mt-5 flex-grow'>
                        <div className='flex justify-between'>
                            <p className='font-semibold'>Original Price:</p>
                            <p className='text-[#B5B6B5] font-medium'>₹2450.00</p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='font-semibold'>Discount Price:</p>
                            <p className='text-[#B5B6B5] font-medium'>₹2450.00</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-6 mt-5'>
                        <div className='flex justify-between'>
                            <p className='font-semibold'>Total</p>
                            <p className='text-[#B5B6B5] font-medium'>₹4900.00</p>
                        </div>
                        <p className='text-[#535967] text-lg'>By completing your purchase you agree to these <span className='text-primary'>Terms of Service.</span></p>
                        <Button className="uppercase w-full mt-4" variant="primary">Proceed to Pay</Button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CheckOutClientComponent;
