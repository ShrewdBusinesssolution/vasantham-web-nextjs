"use client"
import { useEffect, useState } from "react";
import BasicService from "../services/api-services/basic-service";

const Terms = () => {
    
    const [termsInfo, setTermsInfo] = useState(null);
    const getCompanyInformation = async () => {
        try {
            const data = await BasicService.TermsCondition();
            setTermsInfo(data);
        } catch (error) {
            console.log("🚀 ~ getCompanyInformation ~ error:", error);
        }
    };

    useEffect(() => {
        getCompanyInformation();
    }, []);

    console.log(termsInfo, "Terms and condition");

    return (
        <div className='brand-container py-10'>
            <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
            {!termsInfo ? (
                <p>Loading terms and conditions!...</p>
            ) : (
                <p>{termsInfo?.content}</p>
            )}
        </div>
    );
};

export default Terms;
