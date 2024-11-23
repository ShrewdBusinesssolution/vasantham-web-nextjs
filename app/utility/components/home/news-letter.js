"use client";
import BasicService from "@/app/services/api-services/basic-service";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LuLoader2 } from "react-icons/lu";
import { IoMdArrowUp } from "react-icons/io";

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required.",
    })
    .email({
      message: "Invalid email format.",
    }),
});

const NewsletterSection = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values) {
    const payload = {
      email: "johns.doe@example.com",
    };

    try {
      const response = await BasicService.NewsLetter(values);
      console.log(response, "response");
      form.reset();
      toast.success(response.message, { position: "top-right", duration:2000 })
    } catch (error) {
      console.error("Caught error:", error);
      const message = error?.response?.data?.message ?? error.message;
      toast.error(message, { position: "top-right" });
    }
  }

  return (
    <section className="rounded-2xl p-6 md:p-10 bg-[#F7F7F7]">
      <div className="flex gap-5 flex-col md:flex-row justify-between">
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="self-start text-sm font-semibold leading-loose text-primary uppercase tracking-[2px]">
            Newsletter
          </div>
          <h2 className="mt-5 md:mt-7 text-2xl md:text-3xl lg:text-4xl font-bold leading-none text-neutral-800">
            Subscribe to get latest news
          </h2>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-end">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 font-arial"
            >
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="text-start">
                    <FormLabel className="text-lg">Email Address</FormLabel>
                    <FormControl>
                      <Input
                        className=" px-5 h-[52px] border border-[#E2E2E2] placeholder:text-[#B5B6B5] text-[16px] font-arial"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                variant="primary"
                className="text-sm font-medium text-center text-white uppercase bg-primary rounded-md"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                Subscribe
                {form.formState.isSubmitting && (
                  <LuLoader2 className="animate-spin" />
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
