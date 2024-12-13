"use client"
import React, { useContext } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircularProgressbar } from 'react-circular-progressbar';
import { AppContext } from '@/app/utility/context/context-api';

const SubmitModal = () => {
  const percentage = 60; //percentage
  const { TestModalopen,
    setTestModalopen,
    TestScore } = useContext(AppContext);

  return (
    <Dialog open={TestModalopen} onOpenChange={setTestModalopen}>
      <DialogTrigger asChild>
        <Button variant="primary" className="w-fit h-fit py-3 px-5 uppercase hidden">
          Submit assessment
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[280px] h-[280px] p-5 flex flex-col items-center justify-center gap-4">
        <DialogHeader>
        </DialogHeader>
        <h4 className="text-[#21242B] text-[17px] leading-normal font-semibold mb-2 text-center">
          Test submitted successfully!
        </h4>
        {/* Progress bar */}
        <div style={{ width: 100, height: 100 }} className="mb-2">
          <CircularProgressbar
            value={TestScore}
            text={`${TestScore}%`}
            styles={{
              path: { stroke: '#008DF1' }, // progress bar
              text: { fill: '#222', fontSize: '22px', fontWeight: 'bold', textAnchor: "middle", dominantBaseline: 'middle', // Vertical alignment
              }, // Text
              trail: { stroke: '#d6d6d6' }, // trail color
            }} />
        </div>
        <h4 className="text-[#21242B] text-[17px] leading-normal font-semibold text-center">
          Here&apos;s your final score..
        </h4>
      </DialogContent>
    </Dialog>
  );
}

export default SubmitModal;
