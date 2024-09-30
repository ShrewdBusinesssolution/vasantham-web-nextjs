import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircularProgressbar } from 'react-circular-progressbar';

const SubmitModal = () => {
  const percentage = 85; //percentage

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary" className="w-fit h-fit py-3 px-5 uppercase">
          Submit assessment
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[280px] h-[280px] p-5 flex flex-col items-center justify-center gap-4">
        <DialogHeader>
          <h4 className="text-[#21242B] text-[17px] leading-normal font-semibold mb-2 text-center">
            Test submitted successfully!
          </h4>
          {/* Progress bar */}
          <div style={{ width: 100, height: 100}} className="mb-2">
          <CircularProgressbar
              value={percentage}
              text={`${percentage}%`}
              styles={{
                path: { stroke: '#008DF1' }, // progress bar
                text: { fill: '#222', fontSize: '22px', fontWeight: 'bold', textAnchor:"middle" }, // Text
                trail: { stroke: '#d6d6d6' }, // trail color
              }}/>
          </div>
          <h4 className="text-[#21242B] text-[17px] leading-normal font-semibold text-center">
            Here’s your final score.
          </h4>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SubmitModal;
