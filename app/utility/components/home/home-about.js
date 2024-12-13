import React from "react";
import Image from "next/image";

const About = () => {
  const features = [
    {
      icon: "/assets/svg/Icon.svg",
      title: "Sign up on website",
      description:
        "The right mentoring relationship can be a powerful tool for professional growth. Bark up the right tree.",
    },
    {
      icon: "/assets/svg/Icon-1.svg",
      title: "Enroll your course",
      description:
        "The right mentoring relationship can be a powerful tool for professional growth. Bark up the right tree.",
    },
    {
      icon: "/assets/svg/Icon.svg",
      title: "Start from now",
      description:
        "The right mentoring relationship can be a powerful tool for professional growth. Bark up the right tree.",
    },
  ];

  return (
    <main className="bg-[#F9F9F9] py-6 pb-10 md:pb-12 lg:pb-20">
      <div className="brand-container">
        <h4 className="text-[#20ad96] text-[14px] font-semibold">ABOUT US</h4>
        <h4 className="text-[#3f3a64]">
          Get Instant Access To Expert Solution
        </h4>
      </div>
      <div className="flex flex-col md:flex-row px-5 md:px-5 gap-5 lg:gap-10 brand-container">
        {/* Left container*/}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-3">

          <p className="text-[#222222] text-base leading-[30px] mb-4">
            The ultimate planning solution for busy women who want to reach
            their personal goals. Effortless, comfortable, eye-catching, unique
            detail.
          </p>
          <div className="flex flex-col gap-4">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>

        {/* Right container */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <Image
            src="/assets/basic/course-bg.webp"
            alt="About"
            width={500}
            height={500}
            className="object-contain w-[500px] h-auto"
          />
        </div>
      </div>
    </main>
  );
};

export default About;


const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="flex items-start  gap-4">
      <div className="bg-[#F7F5F4] p-4 rounded-full">
        <Image
          src={icon}
          alt={title}
          width={40}
          height={40}
          className="object-cover"
        />
      </div>
      <div>
        <h4 className="text-[#3f3a64] text-xl font-bold mb-2">{title}</h4>
        <p className="text-[15px] text-[#535967]">{description}</p>
      </div>
    </div>
  );
};