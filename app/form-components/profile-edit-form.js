"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { LuLoader2 } from "react-icons/lu";
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Import Select components
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
import { useContext } from "react";
import { AppContext } from "../utility/context/context-api";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProfileService from "../services/api-services/profile-service";

const formSchema = z.object({
    name: z.string()
        .min(1, { message: "Name is required." })
        .min(3, { message: "Name Minimum 3 character required." })
        .max(50, { message: "Name must be at most 50 characters." }),

    date_of_birth: z.string()
        .min(1, { message: "Date of Birth is required." })
        .regex(
            /^\d{4}-\d{2}-\d{2}$/,
            { message: "Date of birth must be in the format DD-MM-YYYY." }
        )
        .refine(
            (date) => !isNaN(new Date(date).getTime()),
            { message: "Invalid date of birth." }
        ),

    email: z.string()
        .min(1, { message: "Email is required." })
        .email({ message: "Invalid email format." }),

    gender: z.enum(["Male", "Female"], { message: "Gender must be Male or Female." }),

    mobile_number: z.string()
        .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits." }),
});

export default function ProfileUpdateForm({ DialogOpenHandler }) {
    const { userInformation, setUserInformation, getUserInformation } = useContext(AppContext);


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: userInformation?.name,
            date_of_birth: userInformation?.date_of_birth,
            email: userInformation?.email,
            gender: userInformation?.gender,
            mobile_number: userInformation?.mobile_number,
        },
    })

    const onSubmit = async (data) => {

        try {

            const response = await ProfileService.UserProfileform(data)
            if (response.status) {
                toast.success(response.message, { position: "top-right", duration: 2000 })
                //TODO UPDATE
                getUserInformation();
                DialogOpenHandler(false)
            }

        } catch (error) {
            const message = error?.error ?? error.message;
            toast.error(message, { position: "top-right" })

        }
    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" mt-5 mx-2">
                <p className="mb-4 font-semibold">Edit profile</p>

                {/* <ScrollArea className="max-sm:h-[40vh] h-auto max-sm:px-2 max-sm:pb-3"> */}
                <div className="space-y-5">
                    <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-5">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel className="font-semibold text-lg">Enter Name<small className="text-red-500"> *</small></FormLabel>
                                    <FormControl>
                                        <Input className="placeholder:text-[#B5B6B5] focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="Enter  your Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="date_of_birth"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-lg">Enter DOB <small className="text-red-500"> *</small></FormLabel>
                                    <FormControl>
                                        <Input type="date" placeholder="Enter Date of Birth" {...field} className="relative placeholder:text-[#B5B6B5] focus-visible:ring-0 focus-visible:ring-offset-0" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-5">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel className="font-semibold text-lg">Enter Email<small className="text-red-500"> *</small></FormLabel>
                                    <FormControl>
                                        <Input type="email" className="placeholder:text-[#B5B6B5] focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="Enter  your email" {...field} disabled />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem className=" focus-visible:ring-0 focus-visible:ring-offset-0 ">
                                    <FormLabel className="font-semibold text-lg">
                                        Gender
                                        <small className="text-red-500">*</small>
                                    </FormLabel>
                                    <div className="flex flex-col">
                                        <FormControl>
                                            <Select
                                                className="bg-white rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger className={`px-5  border border-[#E2E2E2] focus-visible:ring-0 focus-visible:ring-offset-0 font-arial ${field.value === "" ? 'text-[#B5B6B5]' : ''}`}>
                                                    <SelectValue placeholder="Choose Gender" />
                                                </SelectTrigger>
                                                <SelectContent className="focus-visible:ring-0 focus-visible:ring-offset-0">
                                                    <SelectItem className="focus-visible:ring-0 focus-visible:ring-offset-0" value="Male" >Male</SelectItem>
                                                    <SelectItem className="focus-visible:ring-0 focus-visible:ring-offset-0" value="Female">Female</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className="text-[12px]" />
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-5">
                        <FormField
                            control={form.control}
                            name="mobile_number"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel className="font-semibold text-lg">Phone Number<small className="text-red-500"> *</small></FormLabel>
                                    <FormControl>
                                        <Input
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Only allow numeric input
                                            field.onChange(e); // Update form field value
                                        }}
                                        maxLength="10"
                                        type="tel" className="placeholder:text-[#B5B6B5] focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="Enter your Phone" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                    </div>
                </div>
                {/* </ScrollArea> */}


                <div className="flex gap-3 w-full justify-end pt-3">
                    <Button onClick={() => DialogOpenHandler(false)} type="button">
                        CANCEL
                    </Button>
                    <Button variant="primary" className=" flex gap-2 uppercase" type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ?
                            <LuLoader2 className="animate-spin" /> : <></>
                        }
                        SAVE CHANGES
                    </Button>
                </div>
            </form>
        </Form>

    )
}
