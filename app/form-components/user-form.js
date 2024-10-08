// client-components/UserForm.js
import React, { useState } from 'react';
import { FaUser, FaCalendarAlt, FaEnvelope, FaVenusMars, FaPhone } from 'react-icons/fa';

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    userName: '',
    dateOfBirth: '',
    email: '',
    gender: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.userName) newErrors.userName = 'User Name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 bg-white rounded-xl w-full md:w-[700px] lg:w-[800px]">
    {/* User Name and Date of Birth in a single row */}
    <div className="flex mb-4 gap-4">
      <div className="flex-1">
        <label className="block text-sm font-semibold">User Name</label>
        <div className="relative">
          <FaUser className="absolute left-3 top-[18px] text-[#000]" />
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="mt-2 pl-10 p-[6px] border rounded w-full"
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
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="mt-2 pl-10 p-[6px] border rounded w-full"
          />
        </div>
        {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
      </div>
    </div>

    {/* Email and Gender in the next row */}
    <div className="flex mb-4 gap-4">
      <div className="flex-1">
        <label className="block text-sm font-semibold">Email</label>
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-[18px] text-[#000]" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-2 pl-10 p-[6px] border rounded w-full"
            placeholder='Email'
          />
        </div>
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      <div className="flex-1">
        <label className="block text-sm font-semibold">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="mt-2 p-[7px] border rounded w-full"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
      </div>
    </div>

    {/* Phone Number in the next row */}
    <div className="mb-2">
      <label className="block text-sm font-semibold">Phone Number</label>
      <div className="relative">
        <FaPhone className="absolute left-3 top-[18px] text-[#000]" />
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="mt-2 pl-10 p-[6px] border rounded w-1/2"
          placeholder='Phone Number'
        />
      </div>
      {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
    </div>
  </form>
  );
};

export default UserForm;
