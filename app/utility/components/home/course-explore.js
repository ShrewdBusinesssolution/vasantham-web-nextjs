import React from 'react';
import { StatCard } from '../utility-components';

const CourseExploreSection = () => {
  const classes = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12', 'Basic Maths'];

  return (
    <section className="flex flex-col items-center self-center mt-28 max-w-full w-[1320px] max-md:mt-10">
      <div className="flex overflow-hidden relative flex-col justify-center items-center p-8 w-full bg-sky-800 rounded-[32px] max-md:px-5">
        <div className="flex absolute bottom-px z-0 flex-col self-start px-20 pt-20 pb-52 h-[308px] right-[-226px] w-[1773px] max-md:px-5 max-md:pb-24">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c77952804ee13ea7dc9943c2348687881879add63a7863d4f9dade05630af310?placeholderIfAbsent=true&apiKey=e7852b233ecc4224803c76e115b48000" className="object-contain mb-0 w-px aspect-[0.05] max-md:mb-2.5" alt="" />
        </div>
        <div className="flex absolute top-0 z-0 flex-col self-start px-20 pt-20 pb-52 h-[308px] right-[-226px] rotate-[3.141592653589793rad] w-[1773px] max-md:px-5 max-md:pb-24">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/50ccf101a675dc1fda13f2c627cc1b6153ca1f9d481a00f5d9909e7d4736ac65?placeholderIfAbsent=true&apiKey=e7852b233ecc4224803c76e115b48000" className="object-contain mb-0 w-px aspect-[0.05] max-md:mb-2.5" alt="" />
        </div>
        <div className="flex z-0 flex-col items-center max-w-full text-center text-white w-[919px]">
          <div className="text-sm font-semibold leading-8 text-teal-500 uppercase tracking-[2px]">
            Explore Courses
          </div>
          <div className="flex flex-col mt-8 max-w-full w-[603px]">
            <h2 className="self-center max-w-full text-4xl font-bold leading-none w-[468px] max-md:max-w-full">
              Over 200+ Online Courses
            </h2>
            <p className="mt-3 text-base leading-8 max-md:max-w-full">
              The ultimate planning solution for busy women who want to reach their personal goals
            </p>
          </div>
          <div className="flex flex-wrap gap-3 items-start self-stretch mt-8 w-full text-sm font-bold uppercase max-md:max-w-full">
            {classes.map((className, index) => (
              <button
                key={index}
                className={`grow shrink gap-2.5 self-stretch py-4 pr-5 pl-6 w-20 ${
                  index === 0 ? 'bg-emerald-500' : 'bg-sky-800 border border-white border-solid'
                } min-h-[40px] rounded-[30px] max-md:pl-5`}
              >
                {className}
              </button>
            ))}
          </div>
        </div>
      </div>
      <StatCard/>
    </section>

  );
};

export default CourseExploreSection;