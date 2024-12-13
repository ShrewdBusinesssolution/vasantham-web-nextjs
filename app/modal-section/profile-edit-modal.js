"use client";
import React, { useContext, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LuPencilLine } from "react-icons/lu";
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt } from "react-icons/fa";
import ProfileUpdateForm from "../form-components/profile-edit-form";
import { ScrollArea } from "@/components/ui/scroll-area";

export function EditProfileModal() {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen} className="">
            <DialogTrigger asChild>
                <div className="p-2 bg-gradient-to-br from-[#fff] to-[#CCF4FF] rounded-lg cursor-pointer">
                    <LuPencilLine size={22} className="text-primary" />
                </div>
            </DialogTrigger>
            <DialogContent className="max-sm:max-w-[95vw] h-auto max-w-[60vw] max-sm:px-2 max-sm:py-3 p-3 ">
                <ScrollArea className="max-md:h-[90vh]">
                    <ProfileUpdateForm DialogOpenHandler={setOpen} />
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
