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
// import BasicService from "../services/api-services/basic-service";
import Image from "next/image";
import { EnquiryForm } from "./enquery-modal";
const formSchema = z.object({
    firstName: z.string()
        .min(1, {
            message: "First Name is required.",
        })
        .max(100, {
            message: "First Name must be less than 100 characters.",
        }),
    lastName: z.string()
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
    note: z.string()
        .min(1, {
            message: "Note is required.",
        }),
    terms: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms and conditions.",
    }),
})

export default function ContactForm() {
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
            const response = await BasicService.EnquirySave(values);
            toast.success(response.message, { position: "top-right" })
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
                        name="firstName"
                        render={({ field }) => (
                            <FormItem className="text-start">
                                <FormLabel className="text-lg">Name</FormLabel>
                                {/* <small className="text-primary">*</small> */}
                                <FormControl>
                                    <Input className=" px-5 h-[52px] border border-[#E2E2E2] placeholder:text-[#B5B6B5] text-[16px] font-arial" placeholder="First Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
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
                    name="note"
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
                                        <Link href={'/privacy-policy'} className="text-primary hover:underline">
                                            Terms & Conditions
                                        </Link>
                                    </span>
                                </FormLabel>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* <Button variant="primary" className="w-fit flex gap-2 rounded-md text-[16px]" type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ?
                        <LuLoader2 className="animate-spin" /> : <></>
                    }
                  
                    Send Enquiry
                    <IoMdArrowUp />
                </Button> */}
                <EnquiryForm/>
                </div>
            </form>
        </Form>
    )
}