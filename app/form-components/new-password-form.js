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
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AppContext } from "../utility/context/context-api";
// import AuthService from "../services/api-services/auth-service";
import { useRouter } from "next/navigation";
import { addBeforeUnloadListener } from "../utility/helper";
import { useEffect } from "react";


const formSchema = z.object({
    password: z.string()
        .min(8, {
            message: "Password must be at least 8 characters long.",
        })
        .max(20, {
            message: "Password must be no more than 20 characters long.",
        }),
    confirmPassword: z.string()
        .min(8, {
            message: "Confirm password must be at least 8 characters long.",
        })
        .max(20, {
            message: "Confirm password must be no more than 20 characters long.",
        })
        .refine((data) => data.password === data.confirmPassword, {
            path: ['confirmPassword'],
            message: 'Passwords do not match.',
        })

});
export default function NewPasswordForm() {

    const [newPasswordVisible, setNewPasswordVisible] = useState(true);
    const [retypePasswordVisible, setRetypePasswordVisible] = useState(true);
    const { forgotPasswordemail, setForgotPasswordemailotpVerify, forgotPasswordemailotpVerify } = useContext(AppContext);

    const router = useRouter();

    useEffect(() => {
        if(forgotPasswordemail === '' && !forgotPasswordemailotpVerify){
            router.push("/forgot-password")
        }
        // Add the beforeunload listener
        const removeBeforeUnloadListener = addBeforeUnloadListener();
        // Cleanup by removing the listener when the component unmounts
        return () => removeBeforeUnloadListener();
       
    }, []);


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",

        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values) {
        try {
            values.email = forgotPasswordemail;
            const response = await AuthService.RestPassword(values)
            if (response.status) {
                toast.success(response.message, { position: "top-right" })
                setForgotPasswordemailotpVerify(true)
                form.reset();
                setTimeout(() => {
                    router.push('/login')
                }, 2000);
            }

        } catch (error) {
            const message = error?.response?.data?.message ?? error.message;
            toast.error(message, { position: 'top-right' })


        }

    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold">New Password <small className="text-primary">*</small></FormLabel>
                            <FormControl>
                                <div className="relative ">
                                    <div className=" absolute right-0 top-0 bottom-0 z-10 h-full grid place-content-center px-5 ">
                                        <div onClick={() => { setNewPasswordVisible(!newPasswordVisible) }} className="cursor-pointer active:opacity-30">
                                            {newPasswordVisible ? <FaEyeSlash className="text-primary" /> : <FaEye className="text-primary" />}
                                        </div>
                                    </div>
                                    <Input className="text-md" type={newPasswordVisible ? 'password' : 'text'} placeholder="Enter Password" {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold">Confirm Password <small className="text-primary">*</small></FormLabel>
                            <FormControl>
                                <div className="relative ">
                                    <div className=" absolute right-0 top-0 bottom-0 z-10 h-full grid place-content-center px-5 ">
                                        <div onClick={() => { setRetypePasswordVisible(!retypePasswordVisible) }} className="cursor-pointer active:opacity-30">
                                            {retypePasswordVisible ? <FaEyeSlash className="text-primary" /> : <FaEye className="text-primary" />}
                                        </div>
                                    </div>
                                    <Input className="text-md" type={retypePasswordVisible ? 'password' : 'text'} placeholder="Enter Password" {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button variant="primary" className="w-full flex gap-2 uppercase" type="submit" disabled={form.isSubmitting}>
                    {form.isSubmitting ?
                        <LuLoader2 className="animate-spin" /> : <></>
                    }
                    Save & Continue
                </Button>
                {/* <p className="text-sm opacity-60">Your password must be at least 8 characters including a lowercase letter, an uppercase letter, and a number</p> */}
                {/* ``                <p className="text-sm opacity-60">Back to Login <Link href="/login" className="text-primary underline">Login?</Link></p> */}
            </form>
        </Form>
    )
}