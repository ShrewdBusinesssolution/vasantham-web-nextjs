"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { LuLoader2 } from "react-icons/lu";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"


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
// import AuthService from "../services/api-services/auth-service";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AppContext } from "../utility/context/context-api";

const formSchema = z.object({
    otp: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})


export default function ForgotPasswordForm() {
    const { setForgotPasswordemail } = useContext(AppContext);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: "",
        },
    })
    const router = useRouter();

   // 2. Define a submit handler.
   async function onSubmit(values) {
    try {
        // values.email = forgotPasswordemail;
        const response = await AuthService.ForgototpVerify(values)
        if (response.status) {
            toast.success(response.message, { position: "top-right" })
            setForgotPasswordemailotpVerify(true)
            form.reset();
            router.push('/new-password')
        }

    } catch (error) {
        const message = error?.response?.data?.message ?? error.message;
            toast.error(message, { position: 'top-right' })

    }
}


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <h2 className="text-lg">Verify OTP</h2>
                <div className="flex items-end justify-between">

                <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>One-Time Password</FormLabel>
                            <FormControl>
                                <InputOTP maxLength={6} {...field}>
                                    <InputOTPGroup className="flex gap-5 justify-center w-full">
                                        <InputOTPSlot className="border rounded-md text-md" index={0} />
                                        <InputOTPSlot className="border rounded-md text-md" index={1} />
                                        <InputOTPSlot className="border rounded-md text-md" index={2} />
                                        <InputOTPSlot className="border rounded-md text-md" index={3} />
                                        <InputOTPSlot className="border rounded-md text-md" index={4} />
                                        <InputOTPSlot className="border rounded-md text-md" index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <FormDescription>
                                Please enter the one-time password sent to your phone.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                    <p className="text-[14px]">OTP Expires in <span className="text-[#07A889]">00.02.59 </span></p>
                </div>
                {/* <p className="text-sm opacity-60">Enter your registered email  associate with your account and we’ll send you a OTP to your email.</p> */}
                <Button variant="primary" className="w-full flex gap-2 uppercase" type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ?
                        <LuLoader2 className="animate-spin" /> : <></>
                    }
                    Verify OTP
                </Button>
                <Button variant="primary" className="w-full flex gap-2 uppercase bg-gray-100 border text-[#000] font-semibold" type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ?
                        <LuLoader2 className="animate-spin" /> : <></>
                    }
                    resend OTP
                </Button>
                {/* <p className="text-sm opacity-60">Already have account? <Link href="/login" className="text-primary underline">Login</Link></p> */}
            </form>
        </Form>
    )
}
