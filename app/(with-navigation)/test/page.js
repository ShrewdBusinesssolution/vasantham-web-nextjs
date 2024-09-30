"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import SubmitModal from "./submit-modal";

const questions = [
  {
    question: "There are 49 dogs signed up for a dog show. There are 36 more small dogs than large dogs. How many small dogs have signed up to compete?",
    options: ["13 small dogs", "36 small dogs", "49 small dogs", "None of the Above"],
  },
  {
    question: "If a rectangle has a length of 8 cm and a width of 5 cm, what is its area?",
    options: ["40 cm²", "30 cm²", "50 cm²", "60 cm²"],
  },
  {
    question: "What is the value of 7 × (6 + 4)?",
    options: ["70", "60", "80", "50"],
  },
  {
    question: "If a triangle has a base of 10 cm and a height of 5 cm, what is its area?",
    options: ["25 cm²", "50 cm²", "15 cm²", "30 cm²"],
  },
  {
    question: "What is the perimeter of a square with a side length of 4 cm?",
    options: ["16 cm", "20 cm", "12 cm", "8 cm"],
  },
];

const Test = () => {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (index, value) => {
    setSelectedOptions((prev) => ({ ...prev, [index]: value }));
  };

  return (
    <main className="bg-[#fcfcfc]">
      <div className="brand-container px-5 py-10">
        <h3 className="text-[24px]">Introduction to Mathematics</h3>
        {questions.map((item, index) => (
          <div key={index} className="bg-[#F7F7F7] border border-[#E9E9E9] rounded-lg p-4 mt-5">
            <h4 className="text-[18px]">{item.question}</h4>
            <ul className="mt-2">
              {item.options.map((option, optionIndex) => (
                <li key={optionIndex}>
                  <label className="text-[#858585] font-medium">
                    <input
                      type="radio"
                      value={option}
                      checked={selectedOptions[index] === option}
                      onChange={() => handleOptionChange(index, option)}
                      className="mr-2 accent-green-600 rounded-full"
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="flex justify-end py-3">
          <SubmitModal/>
        </div>
      </div>
    </main>
  );
};

export default Test;
