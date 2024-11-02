"use client"
import { useEffect, useState } from "react";
import BasicService from "../services/api-services/basic-service";

const Privacy = () => {
    
    const [privacyInfo, setPrivacyInfo] = useState(null)
    const getCompanyInformation = async () => {
        try {
            const data = await BasicService.PrivacyPolicy();
            setPrivacyInfo(data);
        } catch (error) {
            console.log("🚀 ~ getCompanyInformation ~ error:", error);
        }
    };

    useEffect(() => {
        getCompanyInformation();
    }, []);

    console.log(privacyInfo, "Privacy Policy");

    return (
        <div className='brand-container py-10'>
            <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
            {!privacyInfo ? (
                <p>Loading privacy policy...</p>
            ) : (
                <p>{privacyInfo?.content}</p>
            )}
        </div>
    );
};

export default Privacy;
