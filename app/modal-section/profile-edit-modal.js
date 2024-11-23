"use client";
import React, { useContext, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LuPencilLine } from "react-icons/lu";
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt } from "react-icons/fa";
import ProfileUpdateForm from "../form-components/profile-edit-form";

export function EditProfileModal() {


    return (
        <Dialog className="!w-[700px]">
            <DialogTrigger asChild>
                <div className="p-2 bg-gradient-to-br from-[#fff] to-[#CCF4FF] rounded-lg cursor-pointer">
                    <LuPencilLine size={22} className="text-primary" />
                </div>
            </DialogTrigger>
            <DialogContent className="h-auto p-3 ">
                <ProfileUpdateForm />
            </DialogContent>
        </Dialog>
    );
}
