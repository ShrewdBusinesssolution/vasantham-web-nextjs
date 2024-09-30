"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useForm, FormProvider } from 'react-hook-form'; // Ensure this import is correct
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Import Select components

const CheckOutClientComponent = () => {
    const methods = useForm(); // Initialize useForm here
    const { register, handleSubmit, formState: { errors } } = methods;

    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [error, setError] = useState('');

    const onSubmit = (data) => {
        if (!data.phoneNumber || !data.country || !data.state) {
            setError('All fields are required.');
        } else {
            setError('');
            console.log('Form submitted:', data);
        }
    };

    return (
        <main className='bg-[#FCFCFC] py-10 md:px-6 lg:px-10'>
            <FormProvider {...methods}>
                <div className='flex flex-col md:flex-row justify-center items-start brand-container gap-5 min-h-screen'>
                    {/* Left side */}
                    <div className='w-full md:w-1/2 h-[400px] rounded-2xl bg-[#F7F7F7] p-5 border border-[#E9E9E9] flex flex-col'>
                        <h2 className='text-[24px]'>Checkout</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 md:mt-8 flex-grow">
                            <div className="mb-5">
                                <label className="block mb-2 font-bold text-[18px]">Phone Number</label>
                                <input
                                    type="text"
                                    {...register("phoneNumber", { required: true })}
                                    className="w-full p-2.5 border rounded placeholder:text-[#B5B6B5]"
                                    placeholder="Enter Phone Number"
                                />
                                {errors.phoneNumber && <span className="text-red-500 text-sm">Phone number is required</span>}
                            </div>
                            
                            <div className="mb-5">
                                <label className="block mb-2 font-bold text-[18px]">Country</label>
                                <Select onValueChange={setCountry} value={country}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose Country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="India">India</SelectItem>
                                        <SelectItem value="USA">USA</SelectItem>
                                        <SelectItem value="Canada">Canada</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="mb-5">
                                <label className="block mb-2 font-bold text-[18px]">State</label>
                                <Select onValueChange={setState} value={state}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose State" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                                        <SelectItem value="California">California</SelectItem>
                                        <SelectItem value="Ontario">Ontario</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
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
            </FormProvider>
        </main>
    );
};

export default CheckOutClientComponent;
