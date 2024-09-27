"use client";
import React, { useState, useEffect } from "react";
import { Line } from "rc-progress";
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button";

const Chapters = () => {
  // State to manage progress percentage
  const [progress, setProgress] = useState(100);

  // Function to adjust progress
  const adjustProgress = (change) => {
    setProgress((prev) => {
      const newProgress = prev + change;
      if (newProgress > 100) return 100; // Cap at 100
      if (newProgress < 0) return 0;    // Floor at 0
      return newProgress;
    });
  };

  // Use effect to simulate progress update
  useEffect(() => {
    const interval = setInterval(() => {
      adjustProgress(10); // Increment by 10 every second
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <main className="bg-[#FCFCFC] px-16 py-5">
      <div className="flex flex-col gap-5 brand-container">
      <div className=" rounded-lg bg-[#f7f7f7] border border-[#E9E9E9]">
        <div className="p-5 flex flex-row justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <h3 className="text-[20px] font-medium text-[#535967]">Unit 1</h3>
              <p className="p-1 text-sm text-white px-4 bg-green-600 rounded-full">
                Completed
              </p>
              
            </div>
            <h3 className="text-[24px] text-[#222222]">
              Introduction to Mathematics
            </h3>
          </div>

          <div className="flex flex-col items-center justify-center">
            {/* Progress Bar */}
            <div className="flex flex-row justify-center items-center gap-2">
            <Progress value={90} className="h-2 bg-[#00FFD5] bg-gradient-to-l from-[#00FF44] to  w-[170px]" />
            <p>100%</p>
            </div>
            <div>
            
            </div>
          </div>
        </div>
      </div>
      {/* Card 2 */}
      <div className=" rounded-lg bg-[#f7f7f7] border border-[#E9E9E9]">
        <div className="p-5 flex flex-row justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <h3 className="text-[20px] font-medium text-[#535967]">Unit 2</h3>
              <p className="p-1 text-sm text-white px-4 bg-[#FB8A2E] rounded-full">
                On Going
              </p>
              
            </div>
            <h3 className="text-[24px] text-[#222222]">
              Introduction to Mathematics
            </h3>
          </div>

          <div className="flex flex-col items-center justify-center">
            {/* Progress Bar */}
            <div className="flex flex-row justify-center items-center gap-2">
            <Progress value={90} className="h-2 bg-[#FC7B00] bg-gradient-to-l from-[#E1CA00] to  w-[170px]" />
            <p>25%</p>
            </div>
            <div>
            
            </div>
          </div>
        </div>
      </div>
      {/* Card 3 */}
      <div className=" rounded-lg bg-[#f7f7f7] border border-[#E9E9E9]">
        <div className="p-5 flex flex-row justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <h3 className="text-[20px] font-medium text-[#535967]">Unit 3</h3>
              <p className="p-1 text-sm text-black px-4 bg-gray-200 font-semibold rounded-full">
                Yet to start
              </p>
              
            </div>
            <h3 className="text-[24px] text-[#222222]">
              Introduction to Mathematics
            </h3>
          </div>

          <div className="flex flex-col items-center justify-center">
<Button variant="primary" className="uppercase text-sm">start unit</Button>            
            <div>
            
            </div>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
};

export default Chapters;
