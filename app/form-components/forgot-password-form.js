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
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email <small className="text-primary">*</small></FormLabel>
                            <FormControl>
                                <Input className="text-sm" placeholder="Enter Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <p className="text-sm opacity-60">Enter your registered email  associate with your account and we’ll send you a OTP to your email.</p>
                <Button variant="primary" className="w-full flex gap-2" type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ?
                        <LuLoader2 className="animate-spin" /> : <></>
                    }
                    Submit
                </Button>
                <p className="text-sm opacity-60">Already have account? <Link href="/login" className="text-primary underline">Login</Link></p>
            </form>
        </Form>
    )
}
