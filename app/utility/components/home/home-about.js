import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <main className="bg-white py-6 pb-10 md:pb-12 lg:pb-20">
      <div className="flex flex-col md:flex-row px-5 md:px-5 gap-5 lg:gap-10 brand-container">
        {/* Left container*/}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-3">
          <h4 className="text-[#20ad96] text-[14px] font-semibold">ABOUT US</h4>
          <p className="text-[#3f3a64] text-[32px] w-10/12 font-bold leading-[44px]">
            Get Instant Access To Expert Solution
          </p>
          <p className="text-[#222222] text-base leading-[30px] mb-4">
            The ultimate planning solution for busy women who want to reach
            their personal goals. Effortless, comfortable, eye-catching, unique
            detail.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex justify-center items-center gap-4">
              <div className="bg-[#F7F5F4] p-4 rounded-full">
                <Image
                  src="/assets/svg/Icon.svg"
                  alt="About"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-[#3f3a64] text-xl font-bold mb-2">
                  Sign up on website
                </h4>
                <p className="text-[15px] text-[#535967]">
                  The right mentoring relationship can be a powerful tool for
                  professional growth. Bark up the right tree.
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center gap-4">
              <div className="bg-[#F7F5F4] p-4 rounded-full">
                <Image
                  src="/assets/svg/Icon-1.svg"
                  alt="About"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-[#3f3a64] text-xl font-bold mb-2">
                  Enroll your course
                </h4>
                <p className="text-[15px] text-[#535967]">
                  The right mentoring relationship can be a powerful tool for
                  professional growth. Bark up the right tree.
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center gap-4">
              <div className="bg-[#F7F5F4] p-4 rounded-full">
                <Image
                  src="/assets/svg/Icon.svg"
                  alt="About"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-[#3f3a64] text-xl font-bold mb-2">
                  Start from now
                </h4>
                <p className="text-[15px] text-[#535967]">
                  The right mentoring relationship can be a powerful tool for
                  professional growth. Bark up the right tree.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right container */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <Image
            src="/assets/basic/course-bg.webp"
            alt="About"
            width={500}
            height={500}
            className="object-contain w-[500px] h-[550px]"
          />
        </div>
      </div>
    </main>
  );
};

export default About;
