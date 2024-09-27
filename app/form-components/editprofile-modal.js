"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LuPencilLine } from "react-icons/lu";
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt } from "react-icons/fa";

export function EditProfile() {
  const [step, setStep] = useState("details");
  const [userName, setUserName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [occupation, setOccupation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Validate form
  const validateDetails = () => {
    const newErrors = {};
    if (!userName.trim()) newErrors.userName = "User Name is required.";
    if (!dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required.";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = "Valid email is required.";
    if (!gender) newErrors.gender = "Gender is required.";
    if (!phoneNumber || !/^[0-9]{10}$/.test(phoneNumber)) newErrors.phoneNumber = "Phone Number must be 10 digits.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form input handlers
  const handleUserNameChange = (e) => setUserName(e.target.value);
  const handleDateOfBirthChange = (e) => setDateOfBirth(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleGenderChange = (e) => setGender(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handleOccupationChange = (e) => setOccupation(e.target.value);

  // Save and continue
  const handleSaveContinue = async () => {
    if (validateDetails()) {
      setIsLoading(true);
      setSuccess(false);
      // Simulate a submission
      setTimeout(() => {
        setIsLoading(false);
        setSuccess(true);
      }, 2000);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="p-2 bg-gradient-to-br from-[#fff] to-[#CCF4FF] rounded-lg cursor-pointer">
          <LuPencilLine size={22} className="text-primary" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-auto p-3 flex flex-col md:px-5">
        <h5 className="text-[18px]">Edit Profile</h5>

        <div className="flex flex-col space-y-2">
          {/* User Name and DOB */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold">User Name</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-[18px] text-[#000]" />
                <input
                  type="text"
                  name="userName"
                  value={userName}
                  onChange={handleUserNameChange}
                  className="mt-2 pl-10 p-[6px] border rounded w-full placeholder:text-sm"
                  placeholder='User Name'
                />
              </div>
              {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
            </div>

            <div className="flex-1">
              <label className="block text-sm font-semibold">Date of Birth</label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-[18px] text-[#000]" />
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={handleDateOfBirthChange}
                  className="mt-2 pl-10 p-[6px] border rounded w-full"
                  placeholder="Date of Birth"
                />
              </div>
              {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
            </div>
          </div>

          {/* Email and Gender in the next row */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-[18px] text-[#000]" />
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="mt-2 pl-10 p-[6px] border rounded w-full placeholder:text-sm"
                  placeholder="Email"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="flex-1">
              <label className="block text-sm font-semibold">Gender</label>
              <select
                value={gender}
                onChange={handleGenderChange}
                className="mt-2 p-2 border rounded w-full"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
            </div>
          </div>

          {/* Phone Number on its own row */}
          <div className="pb-5">
            <label className="block text-sm font-semibold">Phone Number</label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-[18px] text-[#000]" />
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className="mt-2 pl-10 p-[6px] border rounded w-1/2 placeholder:text-sm"
                placeholder="Phone Number"
              />
            </div>
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
          </div>

          {/* Save button */}
          <div className="flex flex-row gap-4 justify-end">
            <Button variant="primary" onClick={handleSaveContinue} className="uppercase text-xs w-fit bg-[#f7f7f7] text-black border px-4 font-medium" disabled={isLoading}>
              {isLoading ? "Saving..." : "Cancel"}
            </Button>
            <Button variant="primary" onClick={handleSaveContinue} className="uppercase text-xs w-fit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>

          {/* Update message */}
          {success && <p className="text-green-500 text-sm">Profile updated successfully!</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
