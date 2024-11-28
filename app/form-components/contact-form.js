"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { LuLoader2 } from "react-icons/lu";
import { IoMdArrowUp } from "react-icons/io";
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"


import { Input } from "@/components/ui/input"
import { toast } from "sonner";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState } from "react";
import { delay } from "../utility/helper";
import { CustomizedAlert } from "../utility/components/utility-components";
import BasicService from "../services/api-services/basic-service";
const formSchema = z.object({
    first_name: z.string()
        .min(1, {
            message: "Name is required.",
        })
        .max(100, {
            message: "First Name must be less than 100 characters.",
        }),
    last_name: z.string()
        .min(1, {
            message: "Last Name is required.",
        })
        .max(100, {
            message: "Last Name must be less than 100 characters.",
        }),
        email: z.string()
        .min(1, {
            message: "Email is required.",
        })
        .email({
            message: "Invalid email format.",
        }),
    mobile_number: z.string()
        .length(10, {
            message: "Phone number must be exactly 10 digits.",
        })
        .regex(/^[0-9]+$/, {
            message: "Phone number must be numeric.",
        }),
        message: z.string()
        .min(1, {
            message: "Note is required.",
        }),
    terms: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms and conditions.",
    }),
})

export default function ContactForm() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            mobile_number: "",
            terms: true,
            note: ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values) {

        try {
            await delay(2000)
            setIsDialogOpen(true)
            const response = await BasicService.EnquirySave(values);
            console.log(response,"response")
            // toast.success(response.message, { position: "top-right" })
            form.reset();

        } catch (error) {
            const message = error?.response?.data?.message ?? error.message;
            toast.error(message, { position: 'top-right' })

        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 font-arial">
                <div className="grid  lg:grid-cols-2 xl:grid-cols-2 gap-5">

                    <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem className="text-start">
                                <FormLabel className="text-lg">Name</FormLabel>
                                <FormControl>
                                    <Input className=" px-5 h-[52px] border border-[#E2E2E2] placeholder:text-[#B5B6B5] text-[16px] font-arial" placeholder="First Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                            <FormItem className="text-start">
                                <FormLabel className="text-lg font-dm_serif_display invisible">Last Name</FormLabel>
                                <FormControl>
                                    <Input className="px-5 h-[52px] border border-[#E2E2E2] placeholder:text-[#B5B6B5] text-[16px] font-arial" placeholder="Last Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>
                {/* Email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="text-start">
                            <FormLabel className="text-lg">Email Address</FormLabel>
                            <FormControl>
                                <Input className=" px-5 h-[52px] border border-[#E2E2E2] placeholder:text-[#B5B6B5] text-[16px] font-arial" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Phone Number */}
                <FormField
                    control={form.control}
                    name="mobile_number"
                    render={({ field }) => (
                        <FormItem className="text-start">
                            <FormLabel className="text-lg font-dm_serif_display">Phone Number</FormLabel>
                            <FormControl>
                                <Input className=" px-5 h-[52px] border border-[#E2E2E2] placeholder:text-[#B5B6B5] text-[16px]" placeholder="+ 91" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem className="text-start">
                            <FormLabel className="text-lg pb-1 font-dm_serif_display">Subject</FormLabel>
                            <FormControl >
                                <Textarea className=" p-5 border border-[#E2E2E2] placeholder:text-[#B5B6B5] text-[16px]" rows="7" placeholder="Type here..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-col md:flex-row gap-5 justify-between items-center">
                    <FormField
                        control={form.control}
                        name="terms"
                        render={({ field }) => (
                            <FormItem className="flex gap-2 flex-col">
                                <div className="flex gap-2 items-center">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="accent-primary  "
                                        />
                                    </FormControl>
                                    <FormLabel className="mt-0">
                                        I agree the friendly <span>
                                            <Link href={'/privacy-policy'} className="text-secondary hover:underline">
                                                Terms & Conditions.
                                            </Link>
                                        </span>
                                    </FormLabel>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button variant="primary" className="w-fit flex gap-2 rounded-md text-[16px] uppercase" type="submit" disabled={form.formState.isSubmitting}>


                        Send Enquiry
                        {form.formState.isSubmitting ?
                            <LuLoader2 className="animate-spin" /> : <IoMdArrowUp />
                        }

                    </Button>
                    {/* <EnquiryForm/> */}


                </div>
            </form>

            <CustomizedAlert isOpen={isDialogOpen} isOpenHandler={setIsDialogOpen} >
                <div className="flex flex-col items-center gap-5">

                    <div className="flex items-center justify-center">
                        <Image src="/assets/gif/enquery.gif" className='w-auto h-[120px]' width={100} height={100} alt="Image" />
                    </div>
                    <p className="text-[#000] text-[18px] leading-normal text-center font-medium">
                        We have received your enquiry!
                    </p>
                    <div className="flex flex-col justify-center items-center ">
                        <Button
                            onClick={() => { setIsDialogOpen(false) }}
                            variant="primary"
                            className={`px-5  h-fit font-medium rounded-sm bg-primary mt-4 uppercase w-fit`}>
                            close
                        </Button></div>
                </div>
            </CustomizedAlert>
        </Form>
    )
}