"use client";
import React, { useState, createContext, useEffect } from "react";
import { isEmptyobject } from "../helper";
import BasicService from "@/app/services/api-services/basic-service";
// import CustomerService from "@/app/services/api-services/customer-service";
import { useSession } from "next-auth/react";
import ProfileService from "@/app/services/api-services/profile-service";
// import AddressService from "@/app/services/api-services/address-service";
export const AppContext = createContext();

export const AuthProvider = ({ children }) => {

    const { data: session } = useSession();
    const [companyInfo, setCompanyInfo] = useState({})
    const [signUpInformation, setSignUpInformation] = useState({})
    const [preloader, setPreLoader] = useState(false);
    const [forgotPasswordemail, setForgotPasswordemail] = useState("")
    const [forgotPasswordemailotpVerify, setForgotPasswordemailotpVerify] = useState(false)
    const [userInformation, setuserInformation] = useState({});




    //USEEFFECT - INITIAL CALL
    useEffect(() => {
        if (isEmptyobject(companyInfo)) {
            getCompanyInformation();
        }
    }, []);



    //API METHODS

    const getCompanyInformation = async () => {
        try {
            setCompanyInfo((await BasicService.GetCompanyInfo()).data);
        } catch (error) { console.log("🚀 ~ getCompanyInformation ~ error:", error) }
    };

    const getUserInformation = async() =>{
        try {
            const resonse = await ProfileService.GetProfileInfo();
            setuserInformation(resonse.customer)
            console.log("🚀 ~ getUserInformation ~ resonse:", resonse)
        } catch (error) {
            
        }
    }

    //     try {
    //         setwishLoading(true)
    //         const response = await BasicService.getWishList(1);
    //         if (response.status) {
    //             if (Array.isArray(response.data)) {
    //                 setwishList([]);
    //             } else {
    //                 setwishList(response.data.wishlists);
    //             }
    //         }
    //     } catch (error) {
    //         setwishList([]);
    //     } finally{
    //         setwishLoading(false)
    //     }
    // }

    // const getAddressList = async () => {
    //     try {
    //         const response = await AddressService.getAddress();
    //         if (response.status) setaddress(response.data);
    //     } catch (error) {
    //         console.log("Error fetching address:", error);
    //     }
    // };

    const value = {
        companyInfo,
        signUpInformation,
        setSignUpInformation,
        preloader,
        setPreLoader,
        forgotPasswordemail,
        setForgotPasswordemail,
        forgotPasswordemailotpVerify,
        setForgotPasswordemailotpVerify,
        getUserInformation,
        userInformation, 
        setuserInformation
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AuthProvider;