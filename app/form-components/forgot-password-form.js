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
    email: z.string()
        .min(1, {
            message: "Email is required.",
        })
        .email({
            message: "Invalid email format.",
        }),
})

export default function ForgotPasswordForm() {
    const { setForgotPasswordemail} = useContext(AppContext);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })
    const router = useRouter();

    // 2. Define a submit handler.
    async function onSubmit(values) {
        try {
            const response = await AuthService.ForgototpSend(values)
            if (response.status) {
                toast.success(response.message, { position: "top-right" })
                setForgotPasswordemail(values.email)
                form.reset();
                router.push('/otp-verify')
            }

        } catch (error) {
            const message = error?.response?.data?.message ?? error.message;
            if (error?.response?.status === 422) {
                //MANUAL ERROR
                form.setError('email', {
                    type: "manual",
                    message
                })
            } else {

                toast.error(message, { position: 'top-right' })
            }

        }

    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <h2 className="text-lg">Verify OTP</h2>
                <div className="flex items-end justify-between">
                    
            <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
      <InputOTPGroup className="gap-4">
        <InputOTPSlot index={0} className="border rounded-lg" />
        <InputOTPSlot index={1} className="border rounded-lg"/>
        <InputOTPSlot index={2} className="border rounded-lg"/>
        <InputOTPSlot index={3} className="border rounded-lg"/>
        <InputOTPSlot index={4} className="border rounded-lg"/>
        <InputOTPSlot index={5} className="border rounded-lg"/>
      </InputOTPGroup>
    </InputOTP>
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
