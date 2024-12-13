"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { LuLoader2 } from "react-icons/lu";
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
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Input } from "@/components/ui/input"
import { toast } from "sonner";
import Link from "next/link";
import { AppContext } from "../utility/context/context-api";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addBeforeUnloadListener } from "../utility/helper";
import AuthService from "../services/api-services/auth-service";
import { BiLoaderCircle } from "react-icons/bi";

const formSchema = z.object({
    otp: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})

export default function OtpVerifyForm() {
    const { signUpInformation, forgotPasswordemail, setForgotPasswordemailotpVerify } = useContext(AppContext);
    const router = useRouter()
    const DefaultTime = 180; //seconds

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: "",
        },
    })

    const [timer, setTimer] = useState(DefaultTime); // 3 minutes = 180 seconds
    const [isDisabled, setIsDisabled] = useState(true);
    const [resendCodeLoading, setResendCodeLoading] = useState(false);

    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(countdown); // Cleanup on unmount
        } else {
            setIsDisabled(false); // Enable the resend OTP button when timer reaches 0
        }
    }, [timer]);



    useEffect(() => {
        if (forgotPasswordemail === '') {
            router.push("/forgot-password")
        }
        // Add the beforeunload listener
        const removeBeforeUnloadListener = addBeforeUnloadListener();
        // Cleanup by removing the listener when the component unmounts
        return () => removeBeforeUnloadListener();

    }, []);


    // Define a submit handler.
    async function onSubmit(values) {
        try {
            values.email = forgotPasswordemail;
            const response = await AuthService.ForgototpVerify(values)
            if (response.status) {
                setTimer(180);
                setIsDisabled(true);
                toast.success(response.message, { position: "top-right" })
                setForgotPasswordemailotpVerify(true)
                form.reset();
                router.push('/new-password')
            }

        } catch (error) {
            const message = error?.response?.data?.message ?? error.message;
            toast.error(message, { position: 'top-right' });
        } finally {
            setResendCodeLoading(false);
        }
    }

    const resendOtp = async () => {
        try {
            setResendCodeLoading(true)
            const resp = await AuthService.ForgototpReSend(
                { email: forgotPasswordemail }
            )


            if (resp.status) {
                toast.success(resp?.message, { position: "top-right" })
                setTimer(DefaultTime)
                setIsDisabled(true)
            }

        } catch (error) {
            console.log("🚀 ~ resendOtp ~ error:", error)

        } finally {
            setResendCodeLoading(false)
        }
    }

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return ` ${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
    return (
        <Form {...form}>
            <div className="">
                {/* <small className='text-[#7C8B9D] '>We&apos;ve sent a code to <span className='text-primary underline'>{forgotPasswordemail}</span></small> */}
                <p className="text-[15px]">We have sent the OTP to <span className="text-[#07A889]">{forgotPasswordemail}</span></p>
            </div>
            <h6 className="text-[18px]" >Verify OTP</h6>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                        <FormItem>
                            {/* <FormLabel>One-Time Password</FormLabel> */}
                            <FormControl>
                                <div className="flex flex-col md:flex-row items-center justify-between ">
                                    <InputOTP maxLength={6} {...field}>
                                        <InputOTPGroup className="flex gap-2 w-full">
                                            <InputOTPSlot className="border h-[42px] w-[42px] rounded-md text-md" index={0} />
                                            <InputOTPSlot className="border h-[42px] w-[42px] rounded-md text-md" index={1} />
                                            <InputOTPSlot className="border h-[42px] w-[42px] rounded-md text-md" index={2} />
                                            <InputOTPSlot className="border h-[42px] w-[42px] rounded-md text-md" index={3} />
                                            <InputOTPSlot className="border h-[42px] w-[42px] rounded-md text-md" index={4} />
                                            <InputOTPSlot className="border h-[42px] w-[42px] rounded-md text-md" index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                    {isDisabled && (
                                        <p className="text-[14px] pt-2 whitespace-nowrap font-arial flex items-center gap-3">
                                            OTP Expires in
                                            <span
                                                className={`text-primary ${isDisabled ? 'pointer-events-none opacity-30' : 'cursor-pointer'}`}
                                            >
                                                {isDisabled ? formatTime(timer) : ''}
                                            </span>

                                        </p>
                                    )}
                                    {/* <p className="text-[14px]">OTP Expires in <span className="text-[#07A889]">00.02.59 </span></p> */}
                                </div>
                            </FormControl>
                            {/* <FormDescription>
                                Please enter the one-time password sent to your phone.
                            </FormDescription> */}
                            <FormMessage className="text-center" />
                        </FormItem>
                    )}
                />
                <div className="space-y-3 flex flex-col gap-2">
                    <Button
                        variant="primary"
                        className="w-full flex gap-2 font-medium uppercase"
                        type="submit"
                        disabled={form.formState.isSubmitting} // Disable if form is submitting or invalid
                    >
                        Verify OTP
                        {form.formState.isSubmitting ? (
                            <LuLoader2 className="w-5 h-5 text-white animate-spin" />
                        ) : (
                            <></>
                        )}
                    </Button>

                    {!isDisabled && (
                        <Button onClick={resendOtp} type="button" variant="primary" className="w-full flex gap-2 font-medium uppercase bg-gray-100 border text-black" disabled={form.formState.isSubmitting || resendCodeLoading}>
                            {resendCodeLoading ?
                                <LuLoader2 className="animate-spin" /> : <></>
                            }
                            resend otp
                        </Button>
                    )}
                    {/* <p className="text-sm opacity-60">Didn&apos;t get a code?  <Link href="#" className="text-primary underline">Click here to resend code.</Link></p> */}

                </div>
                {/* <p className="text-sm opacity-60">Back to Login  <Link href="/login" className="text-primary underline">Login.</Link></p> */}

            </form>

        </Form>
    )
}
