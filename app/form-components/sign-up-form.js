"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { LuLoader2 } from "react-icons/lu";
import Image from "next/image";


import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner";
import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "../utility/context/context-api";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
// import AuthService from "../services/api-services/auth-service";
import { signIn } from "next-auth/react";

import { signIn as signin, signOut, useSession } from 'next-auth/react'


const formSchema = z.object({
    email: z.string()
        .min(1, {
            message: "Email is required.",
        })
        .email({
            message: "Invalid email format.",
        }),
    name: z.string()
        .min(1, {
            message: "Name is required.",
        })
        .max(100, {
            message: "Name must be less than 100 characters.",
        }),
    mobile_number: z.string()
        .length(10, {
            message: "Phone number must be exactly 10 digits.",
        })
        .regex(/^[0-9]+$/, {
            message: "Phone number must be numeric.",
        }),
    password: z.string()
        .min(6, {
            message: "Password must be at least 6 characters.",
        })
        .max(15, {
            message: "Password must be at most 15 characters.",
        }),
    terms: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms and conditions.",
    }),
})

export default function SignUpForm() {
    const router = useRouter()

    const { setSignUpInformation } = useContext(AppContext);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            name: "",
            mobile_number: "",
            password: "",
            terms: true
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values) {
        values.country_code ="+91";
        //TODO MANUAL ERROR SETTING
        try {
            const response = await AuthService.Signup(values)
            if (response.status) {
                toast.success(response.message, { position: "top-right" })
                await Login(values)
                form.reset();
                //TODO NEED TO Login
            }

        } catch (error) {
            const message = error?.response?.data?.message ?? error.message;
            toast.error(message, { position: 'top-right' })

        }

    }

    const Login = async (data) => {

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: data.email,
                password: data.password,
            });

            if(!result.ok){
                toast.error(result.error,{position:"top-right"});
            }else{
                form.reset();
                toast.success("Login successful!",{position:"top-right"})
                window.location.href = "/"; // Correct syntax for redirection
            }

        } catch (error) {
            console.log("🚀 ~ onSubmit ~ error:", error)

        }

    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="mt-5">
                            <FormLabel className="font-semibold text-lg"> Full Name <small className="text-primary">*</small></FormLabel>
                            <FormControl>
                                <Input className="text-sm placeholder:text-[#B5B6B5]" placeholder="Enter your name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-lg">Email Address <small className="text-primary">*</small></FormLabel>
                            <FormControl>
                                <Input className="text-sm placeholder:text-[#B5B6B5]" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* <FormField
                    control={form.control}
                    name="mobile_number"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone <small className="text-primary">*</small></FormLabel>
                            <FormControl>
                                <Input className="text-sm" placeholder="Enter Phone Number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-lg">Password <small className="text-primary">*</small></FormLabel>
                            <FormControl>
                                <Input className="text-sm placeholder:text-[#B5B6B5]" placeholder="Enter Password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                        <FormItem className="flex gap-2 flex-col">
                            {/* <div className="flex gap-2 items-center">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel className="mt-0">
                                    Use different settings for my mobile devices
                                </FormLabel>
                            </div> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button variant="primary" className="w-full flex gap-2 uppercase" type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ?
                        <LuLoader2 className="animate-spin" /> : <></>
                    }
                    Submit
                </Button>
                <Button
    variant="primary"
    className="w-full flex items-center gap-2 uppercase bg-gray-100 text-[#000] font-semibold border"
    type="submit"
    disabled={form.formState.isSubmitting}
>
    {form.formState.isSubmitting ? (
        <LuLoader2 className="animate-spin" />
    ) : (
        <>
           <Image
                src="/assets/google.webp"
                alt="Google"
                width={50}
                height={50}
                className="w-6 h-6 object-cover"
            />
            Continue with Google
        </>
    )}
</Button>
                <p className="text-sm opacity-60 text-center">Have account? <Link href="/login" className="text-primary underline">Log in</Link></p>
            </form>
        </Form>
    )
}
