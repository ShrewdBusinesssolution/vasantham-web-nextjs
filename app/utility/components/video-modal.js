import React from 'react'
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

const VideoModal = () => {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="primary" className="w-fit flex gap-2 rounded-md text-[16px]" type="submit">
        Send Enquiry
        <IoMdArrowUp />
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-[330px] h-[250px] p-5">
      <DialogHeader className="text-center">
        <div className="flex items-center justify-center">
          <Image src="/assets/gif/enquery.gif" className='' width={100} height={100} alt="Image" />
        </div>
        <p className="text-[#000] text-[18px] leading-normal text-center font-medium">
          We have received your enquiry!
        </p>
        <div className="flex flex-col justify-center items-center ">
          <Button
            variant="primary"
            className={`px-5  h-fit font-medium rounded-sm bg-primary mt-4 uppercase w-fit`}>
            close
          </Button></div>
      </DialogHeader>
    </DialogContent>
  </Dialog>
  )
}

export default VideoModal