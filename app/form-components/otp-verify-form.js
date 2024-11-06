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
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addBeforeUnloadListener } from "../utility/helper";
import AuthService from "../services/api-services/auth-service";

const formSchema = z.object({
    otp: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})

export default function OtpVerifyForm() {
    const { signUpInformation, forgotPasswordemail, setForgotPasswordemailotpVerify } = useContext(AppContext);
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: "",
        },
    })

    useEffect(() => {

        // if(!signUpInformation.email){
        //     router.push('sign-up')
        // }

    }, [signUpInformation])



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
                                <div className="flex items-end justify-between ">
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
                                <p className="text-[14px]">OTP Expires in <span className="text-[#07A889]">00.02.59 </span></p>
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
                        <Link href={'/forgot-password'} className="w-full">
                            <Button variant="primary" className="w-full flex gap-2 font-medium uppercase" type="button" disabled={form.formState.isSubmitting}>
                                verify otp
                            </Button>
                        </Link>

<Link href={'/forgot-password'}>
                        <Button variant="primary" className="w-full flex gap-2 font-medium uppercase bg-gray-100 border text-black" type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ?
                                <LuLoader2 className="animate-spin" /> : <></>
                            }
                            resend otp
                        </Button>
                        </Link>
                    {/* <p className="text-sm opacity-60">Didn&apos;t get a code?  <Link href="#" className="text-primary underline">Click here to resend code.</Link></p> */}

                </div>
                {/* <p className="text-sm opacity-60">Back to Login  <Link href="/login" className="text-primary underline">Login.</Link></p> */}

            </form>

        </Form>
    )
}
