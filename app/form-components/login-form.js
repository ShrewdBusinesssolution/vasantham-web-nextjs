"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { LuLoader2 } from "react-icons/lu";
import { Button } from "@/components/ui/button"
import Image from "next/image";
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
import { signIn } from 'next-auth/react';
import { VscEye } from "react-icons/vsc";
import { PiEyeClosed } from "react-icons/pi";


//info:- next auth login

import { signIn as signin, signOut, useSession } from 'next-auth/react'
import { useContext, useState } from "react";
import { AppContext } from "../utility/context/context-api";
import { redirect, useRouter } from "next/navigation";



const formSchema = z.object({
    email: z.string()
        .min(1, {
            message: "Email is required.",
        })
        .email({
            message: "Invalid email format.",
        }),

    password: z.string()
        .min(6, {
            message: "Password must be at least 6 characters.",
        })
        .max(15, {
            message: "Password must be at most 15 characters.",
        }),
})

export default function LoginForm() {

    const [passwordtype, setPasswordtype] = useState(true)
    // const { data: session } = useSession()
    const { setPreLoader } = useContext(AppContext)
    const router = useRouter();


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",

        },
    })

    const onSubmit = async (data) => {

const payload = {
    "email":"rabinswalterraj@gmail.com",
    "password":"@Querty123456"
}
console.log(payload,"payload")

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

    const handleGoogleSignIn = async () => {
        setPreLoader(true)
        try {
            await signin("google", { callbackUrl: "/profile", redirect: false })
        } catch (error) {
            console.error("Sign-in error:", error);
        } finally {
            setPreLoader(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="mt-5">
                            <FormLabel className="font-semibold text-lg">Email Address<small className="text-red-500"> *</small></FormLabel>
                            <FormControl>
                                <Input className="placeholder:text-[#B5B6B5]" placeholder="Enter  your email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex justify-between items-center">
                                <FormLabel className="font-semibold text-lg">Password<small className="text-red-500"> *</small></FormLabel>
                                <Link href={'/forgot-password'} className="text-sm text-[#07A889]">
                                    <small>
                                        Forgot Password?
                                    </small>
                                </Link>
                            </div>
                            <FormControl>
                                <div className="relative ">
                                    <div className=" absolute right-0 top-0 bottom-0 z-10 h-full grid place-content-center px-5 ">
                                        <div onClick={() => { setPasswordtype(!passwordtype) }} className="cursor-pointer active:opacity-30">
                                            {passwordtype ? <VscEye size={20} className="hover:text-primary" /> : <PiEyeClosed size={20} className="hover:text-primary" />}
                                        </div>
                                    </div>
                                    <Input type={passwordtype ? 'password' : 'text'} placeholder="Enter Password" {...field} className="relative placeholder:text-[#B5B6B5]" />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button variant="primary" className="w-full flex gap-2 uppercase" type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ?
                        <LuLoader2 className="animate-spin" /> : <></>
                    }
                 Log in
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

                <p className="text-sm opacity-60 text-center">Don’t have account? <Link href="/sign-up" className="text-primary underline">Signup</Link></p>
            </form>
        </Form>

    )
}
