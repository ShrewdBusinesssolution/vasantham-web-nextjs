"use client";
import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useForm, FormProvider } from 'react-hook-form'; // Ensure this import is correct
import { zodResolver } from "@hookform/resolvers/zod"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Import Select components
import { z } from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input';
import { AppContext } from '../../context/context-api';
import { isEmptyObject } from '../reusable-components/helper';
import { toast } from 'sonner';
import OrderService from '@/app/services/api-services/order-service';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    phone_number: z.string()
        .length(10, {
            message: "Phone number must be exactly 10 digits.",
        })
        .regex(/^[0-9]+$/, {
            message: "Phone number must be numeric.",
        }),
    country: z.string()
        .min(1, {
            message: "Country is required.",
        })
        .max(100, {
            message: "Country name must be less than 100 characters.",
        }),
    state: z.string()
        .min(1, {
            message: "State is required.",
        })
        .max(100, {
            message: "State name must be less than 100 characters.",
        }),
});


const CheckOutClientComponent = () => {

    const { cartSummary, checkoutHandling, preloader, cartData,
        setPreLoader, setCartSummary, setCartData, setCouponInformation } = useContext(AppContext); // Default to an empty array
    const router = useRouter();

    useEffect(() => {
        if (isEmptyObject(cartSummary)) { checkoutHandling() }
    }, [])

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone_number: "",
            country: "India",
            state: "Tamilnadu",
        },
    })

    async function onSubmit(values) {

        try {
            values.courses = cartData;
            values.coupon_code = null;
            const response = await OrderService.placeOrder(values);
            form.reset();

            if (response.status) {
                OnlineRazorpayPayment(response.data)
            }

        } catch (error) {
            console.log("🚀 ~ onSubmit ~ error:", error)
            const message = error?.response?.data?.message ?? error.message;
            toast.error(message, { position: 'top-right' })

        }
    }

    const OnlineRazorpayPayment = async (profileData) => {
        try {
            setPreLoader(true)
            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) {
                alert('Razorpay SDK failed to load. Are you online?');
                return;
            }
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Replace with your Razorpay Key ID
                amount: profileData.order.amount, // Amount in paise (smallest currency unit)
                currency: 'GBP',
                name: 'Vasantham',
                description: 'Course Purchase',
                order_id: profileData.order.id, // Razorpay Order ID
                handler: function (response) {
                    OnlineSucess(response)
                    // You can verify the payment on the backend here, if needed
                },
                prefill: {
                    name: profileData.customer.name,
                    email: profileData.customer.email,
                    contact: profileData.customer.phone,
                },
                notes: {
                    address: 'Razorpay Corporate Office',
                },
                theme: {
                    color: '#008DF1',
                },
            };
            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.log("🚀 ~ OnlineRazorpayPayment ~ error:", error)
        } finally {
            setPreLoader(false)
        }
    }

    const OnlineSucess = async (data) => {
        try {
            setPreLoader(true)
            const response = await OrderService.OrderVerify(data);
            if (response.status) {
                successRdirect()
            }
        } catch (error) {
            const message = error?.response?.data?.message ?? error.message;
            toast.error(message, { position: 'top-right' })
        } finally {
            setPreLoader(false)
        }
    }

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const successRdirect = () => {
        localStorage.removeItem('cart');
        localStorage.removeItem('coupon');
        setCartSummary({})
        setCartData([]);
        setCouponInformation({})
        router.push('/order-success')
    }


    return (
        <main className='bg-[#FCFCFC] py-10 md:px-6 lg:px-10'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 font-arial">
                    <div className='flex flex-col md:flex-row justify-center items-start brand-container gap-5 min-h-screen'>
                        {/* Left side */}
                        <div className='w-full md:w-1/2  rounded-2xl bg-[#F7F7F7] p-5 border border-[#E9E9E9] flex flex-col space-y-5'>
                            <h2 className='text-[24px]'>Checkout</h2>
                            <div className="mt-5">
                                <FormField
                                    control={form.control}
                                    name="phone_number"
                                    render={({ field }) => (
                                        <FormItem className="text-start">
                                            <FormLabel className="font-bold text-[18px]">Phone Number</FormLabel>
                                            <FormControl>
                                                <Input className=" px-5 h-[52px] border border-[#E2E2E2] placeholder:text-[#B5B6B5] text-[16px] font-arial" placeholder="Enter Phone Number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>

                            <div className="">

                                <FormField
                                    control={form.control}
                                    name="country"
                                    render={({ field }) => (
                                        <FormItem className=" gap-x-2  ">
                                            <FormLabel className="font-bold text-[18px]">
                                                Country
                                                {/* <small className="text-primary">*</small> */}
                                            </FormLabel>
                                            <div className="flex flex-col">
                                                <FormControl>
                                                    <Select
                                                        className="bg-white rounded-lg "
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <SelectTrigger className={`px-5 h-[52px] border border-[#E2E2E2]  text-[16px] font-arial ${field.value === "" ? 'text-[#B5B6B5]' : ''}`}>
                                                            <SelectValue placeholder="Choose Country" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="India">India</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className="text-[12px]" />
                                            </div>
                                        </FormItem>
                                    )}
                                />


                            </div>

                            <div className="">
                                <FormField
                                    control={form.control}
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem className=" gap-x-2  ">
                                            <FormLabel className="font-bold text-[18px]">
                                                Country
                                                {/* <small className="text-primary">*</small> */}
                                            </FormLabel>
                                            <div className="flex flex-col">
                                                <FormControl>
                                                    <Select
                                                        className="bg-white rounded-lg "
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <SelectTrigger className={`px-5 h-[52px] border border-[#E2E2E2]  text-[16px] font-arial ${field.value === "" ? 'text-[#B5B6B5]' : ''}`}>
                                                            <SelectValue placeholder="Choose State" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Tamilnadu">Tamilnadu</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className="text-[12px]" />
                                            </div>
                                        </FormItem>
                                    )}
                                />

                            </div>
                        </div>

                        {/* Right side */}
                        <div className='w-full md:w-1/2 h-[400px] rounded-2xl bg-[#F7F7F7] p-5 border border-[#E9E9E9] flex flex-col'>
                            <h2 className='text-[24px] underline pb-5'>Summary</h2>
                            <div className='flex flex-col gap-4 pb-4 border-b-2  flex-grow'>
                                <div className='flex justify-between'>
                                    <p className='font-semibold'>Original Price:</p>
                                    <p className='text-[#B5B6B5] font-medium'>₹ {cartSummary?.order_sub_total ?? 0.00}</p>
                                </div>
                                {cartSummary?.order_discount !== 0 ?

                                    <div className='flex justify-between'>
                                        <p className='font-semibold'>Discount Price:</p>
                                        <p className='text-[#B5B6B5] font-medium'>₹ {cartSummary?.order_discount_value ?? 0.00}</p>
                                    </div>
                                    : null}
                            </div>
                            <div className='flex flex-col gap-6 mt-5'>
                                <div className='flex justify-between'>
                                    <p className='font-semibold'>Total</p>
                                    <p className='text-[#B5B6B5] font-medium'>₹ {cartSummary?.order_total ?? 0.00}</p>
                                </div>
                                <p className='text-[#535967] text-lg'>By completing your purchase you agree to these <span className='text-primary'>Terms of Service.</span></p>
                                <Button type="submit" className="uppercase w-full mt-4" variant="primary">Proceed to Pay</Button>
                            </div>
                        </div>
                    </div>
                </form>

            </Form>


        </main>
    );
};

export default CheckOutClientComponent;
