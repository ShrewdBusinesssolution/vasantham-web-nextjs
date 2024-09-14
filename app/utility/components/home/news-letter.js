import { Button } from '@/components/ui/button';
import React from 'react';

const NewsletterSection = () => {
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
          <form className="flex gap-5 justify-between p-2 w-full bg-white rounded border border-gray-200">
            <label htmlFor="email" className="sr-only">Enter Your Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              className="text-base"
              aria-label="Enter Your Email"
            />
            <Button variant="primary" className=" text-sm font-medium text-center text-white uppercase bg-primary rounded-md">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;