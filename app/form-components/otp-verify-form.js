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
    const { signUpInformation, forgotPasswordemail, setForgotPasswordemailotpVerify} = useContext(AppContext);
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
        if(forgotPasswordemail === ''){
            router.push("/forgot-password")
        }
        // Add the beforeunload listener
        const removeBeforeUnloadListener = addBeforeUnloadListener();
        // Cleanup by removing the listener when the component unmounts
        return () => removeBeforeUnloadListener();
       
    }, []);


    // 2. Define a submit handler.
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
            <small className='opacity-60'>We’ve sent a code to <span className='text-primary'>{signUpInformation.email}</span></small>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

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
                <div className="flex gap-2">
                    <Link href={'/forgot-password'} className="w-full">
                        <Button variant="outline" className="w-full flex gap-2" type="button" disabled={form.formState.isSubmitting}>
                            cancel
                        </Button>
                    </Link>

                    <Button variant="primary" className="w-full flex gap-2" type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ?
                            <LuLoader2 className="animate-spin" /> : <></>
                        }
                        Submit
                    </Button>
                </div>
                <p className="text-sm opacity-60">Didn’t get a code?  <Link href="#" className="text-primary underline">Click here to resend code.</Link></p>
            </form>
        </Form>
    )
}
