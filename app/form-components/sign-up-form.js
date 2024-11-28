"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { LuLoader2 } from "react-icons/lu";
import Image from "next/image";
import { Button } from "@/components/ui/button"

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
import { useContext, useState } from "react";
import { AppContext } from "../utility/context/context-api";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { VscEye } from "react-icons/vsc";
import { PiEyeClosed } from "react-icons/pi";

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
    password: z.string()
        .min(6, {
            message: "Password must be at least 6 characters.",
        })
        .max(15, {
            message: "Password must be at most 15 characters.",
        }),
})

export default function SignUpForm() {
    const router = useRouter()
    const { setSignUpInformation } = useContext(AppContext);
    const [passwordtype, setPasswordtype] = useState(true)


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            name: "",
            password: "",
        },
    })

    // Define a submit handler
    async function onSubmit(data) {
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: data.email,
                name: data.name,
                password: data.password,
                loginType: "register"
            });

            if (!result.ok) {
                throw result;

            } else {
                toast.success("Register and Login Successfull", { position: "top-right" })
                router.push('/')
            }

        } catch (error) {
            console.log("🚀 ~ onSubmit ~ error:", error)
            const message = error?.response?.data?.message ?? error.error;
            toast.error(message, { position: "top-right" })

        }

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="mt-5">
                            <FormLabel className="font-semibold text-lg"> Full Name <small className="text-red-500">*</small></FormLabel>
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
                            <FormLabel className="font-semibold text-lg">Email Address <small className="text-red-500">*</small></FormLabel>
                            <FormControl>
                                <Input className="text-sm placeholder:text-[#B5B6B5]" placeholder="Enter your email" {...field} />
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
                            <FormLabel className="font-semibold text-lg">Password <small className="text-red-500">*</small></FormLabel>
                            <FormControl>
                                <div className="relative ">
                                    <div className=" absolute right-0 top-0 bottom-0 z-10 h-full grid place-content-center px-5 ">
                                        <div onClick={() => { setPasswordtype(!passwordtype) }} className="cursor-pointer active:opacity-30">
                                            {passwordtype ? <VscEye size={20} className="hover:text-primary" /> : <PiEyeClosed size={20} className="hover:text-primary" />}
                                        </div>
                                    </div>
                                    <Input type={passwordtype ? 'password' : 'text'} maxLength={15} className="text-sm placeholder:text-[#B5B6B5]" placeholder="Enter Password" {...field} />
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
                <p className="text-sm opacity-60 text-center">Have account? <Link href="/login" className="text-[#20AD96] font-bold underline">Log in</Link></p>
            </form>
        </Form>
    )
}
