"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoMdArrowUp } from "react-icons/io";
import { LuLoader2 } from "react-icons/lu";
import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";

export function LogoutModal({PopovercloseHandling}) {
  const [dialog, setDialogOpen] = useState(false);

  const closeHandling=() =>{
    setDialogOpen(false);
    PopovercloseHandling();
  }


  return (
    <Dialog open={dialog} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <p className="w-full p-2 hover:bg-gradient-to-br from-white to-blue-100 from-20% rounded-[10px]">Logout</p>
      </DialogTrigger>
      <DialogContent className="max-w-[310px] h-[310px] p-5">
        <DialogHeader className="text-center">
          <div className="flex items-center justify-center">
            <Image src="/assets/svg/logout.svg" className='' width={150} height={150} alt="Image" />
          </div>
          <p className="text-[#21242B] text-[17px] leading-normal text-center font-medium">
            Are you sure, Do you want to logout?
          </p>
          <div className="flex flex-row justify-center items-center gap-4">
            <Link href="/log-out">
            <Button
              variant="primary"
              className={`px-5  h-fit font-medium rounded-md bg-[#f7f7f7] border text-[#000] mt-4 uppercase w-fit`}>
              Yes, I&apos;m sure
            </Button>
            </Link>
            <Button 
              onClick={closeHandling}
              variant="primary"
              className={`px-5  h-fit font-medium rounded-md bg-primary mt-4 uppercase w-fit`}>
              no
            </Button></div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
