"use client"
import { useEffect, useState } from "react";
import BasicService from "../services/api-services/basic-service";

const Return = () => {
    
    const [returnInfo, setReturnInfo] = useState(null);
    const getCompanyInformation = async () => {
        try {
            const data = await BasicService.ReturnPolicy();
            setReturnInfo(data);
        } catch (error) {
            console.log("🚀 ~ getCompanyInformation ~ error:", error);
        }
    };

    useEffect(() => {
        getCompanyInformation();
    }, []);

    console.log(returnInfo, "Return Policy");

    return (
        <div className='brand-container py-10'>
            <h1 className="text-3xl font-bold mb-4">Return Policy</h1>
            {!returnInfo ? (
                <p>Loading return policy!...</p>
            ) : (
                <p>{returnInfo?.content}</p>
            )}
        </div>
    );
};

export default Return;
