"use client";
import React, { useContext, useState } from "react";
import SubmitModal from "./submit-modal";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import TestService from "@/app/services/api-services/test-service";
import { AppContext } from "@/app/utility/context/context-api";
import { LuLoader2 } from "react-icons/lu";

export default function TestClientComponent({ lectureId, questions }) {
    const [selectedOptions, setSelectedOptions] = useState({});
    const [loading, setLoading] = useState(false);
    const { setTestModalopen, setTestScrore } = useContext(AppContext);

    // Handle radio button change
    const handleOptionChange = (questionId, answerId) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [questionId]: answerId,
        }));
    };

    // Handle form submission
    const handleSubmit = async () => {
        try {
            setLoading(true);
            const answers = Object.entries(selectedOptions).map(([questionId, answerId]) => ({
                question_id: parseInt(questionId, 10),
                answer_id: answerId,
            }));

            const payload = {
                lecture_id: lectureId,
                answers,
            };

            const Response = await TestService.submitAnswer(payload);
            if (Response.status) {
                toast.success(Response.message, { position: "top-right", duration: 2000 });
                setTestModalopen(true);
                setTestScrore(Response?.data?.percentage);
            }
        } catch (error) {
            const message = error?.response?.data?.message ?? error.message;
            toast.error(message, { position: "top-right", duration: 2000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {questions && questions.length > 0 ? (
                questions.map((item) => (
                    <div
                        key={item.question_id}
                        className="bg-[#F7F7F7] border border-[#E9E9E9] rounded-lg p-4 mt-5"
                    >
                        <h4 className="text-[18px]">{item.question_text}</h4>
                        <ul className="mt-2">
                            {item.answers.map((option) => (
                                <li key={option.answer_id}>
                                    <label className="flex items-center text-[#858585] font-medium">
                                        <input
                                            type="radio"
                                            value={option.answer_id}
                                            checked={selectedOptions[item.question_id] === option.answer_id}
                                            onChange={() => handleOptionChange(item.question_id, option.answer_id)}
                                            className="hidden"
                                        />
                                        <span
                                            className={`w-5 h-5 flex justify-center items-center border rounded-full mr-2 ${selectedOptions[item.question_id] === option.answer_id
                                                ? "bg-green-600 text-white"
                                                : "border-gray-400"
                                                }`}
                                        >
                                            {selectedOptions[item.question_id] === option.answer_id && "✓"}
                                        </span>
                                        {option.answer_text}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <div className="bg-[#F7F7F7] border border-[#E9E9E9] rounded-lg p-4 mt-5">
                    <p className="text-center text-gray-600">No questions available right now.</p>
                </div>
            )}
            {questions && questions.length > 0 && (
                <div className="flex justify-end py-3">
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        className="flex gap-2 items-center uppercase"
                    >
                        Submit assessment
                        {loading && <LuLoader2 className="animate-spin" />}
                    </Button>
                </div>
            )}
            <SubmitModal />
        </>
    );
}
