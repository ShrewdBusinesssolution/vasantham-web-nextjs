"use client";
import React, { useState, createContext, useEffect } from "react";
import { isEmptyobject } from "../helper";
import BasicService from "@/app/services/api-services/basic-service";
// import CustomerService from "@/app/services/api-services/customer-service";
import { useSession } from "next-auth/react";
import ProfileService from "@/app/services/api-services/profile-service";
import OrderService from "@/app/services/api-services/order-service";
// import AddressService from "@/app/services/api-services/address-service";
export const AppContext = createContext();

export const AuthProvider = ({ children }) => {

    const { data: session } = useSession();
    const [companyInfo, setCompanyInfo] = useState({})
    const [signUpInformation, setSignUpInformation] = useState({})
    const [preloader, setPreLoader] = useState(false);
    const [forgotPasswordemail, setForgotPasswordemail] = useState("")
    const [forgotPasswordemailotpVerify, setForgotPasswordemailotpVerify] = useState(false)
    const [userInformation, setuserInformation] = useState({}); // INFO USER INFORMATION GLOBAL STATE
    const [cartModal, setCartModal] = useState(false) // INFO CART MODAL GLOBAL STATE
    const [cartData, setCartData] = useState([]); //INFO CART GLOBAL STATE
    const [cartSummary, setCartSummary] = useState({}); //INFO CART SUMMARY
    const [cartCourseInformation, setcartCourseInformation] = useState([]); //INFO CART SUMMARY
    const [couponInformation, setCouponInformation] = useState({})






    //USEEFFECT - INITIAL CALL
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            console.log("🚀 ~ useEffect ~ JSON.parse(savedCart):", JSON.parse(savedCart))
            setCartData(JSON.parse(savedCart));
        }
        if (isEmptyobject(companyInfo)) {
            getCompanyInformation();
        }
    }, []);

    useEffect(() => {
        if (cartData && cartData.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cartData));
        }
    }, [cartData]);


    //API METHODS

    const getCompanyInformation = async () => {
        try {
            setCompanyInfo((await BasicService.GetCompanyInfo()).data);
        } catch (error) { console.log("🚀 ~ getCompanyInformation ~ error:", error) }
    };

    const getUserInformation = async () => {
        try {
            const resonse = await ProfileService.GetProfileInfo();
            setuserInformation(resonse.customer)
        } catch (error) {

        }
    }


    const checkoutHandling = async() =>{

        try {
            const savedCart = localStorage.getItem('cart');

            const response = await OrderService.checkoutSummary(
                {
                    courses: JSON.parse(savedCart)
                }
            )
            if(response.status){
                setcartCourseInformation(response?.data?.cart_courses)
                setCartSummary(response?.data.cart_summary)

            }
        } catch (error) {
            console.log("🚀 ~ checkoutHandling ~ error:", error)
            
        }

    }

    // Handler to add an item to the cart
    const addToCart = (id) => {
        setCartData((prevCart) => {
            const updatedCart = [...prevCart, { id }];
            return updatedCart;
        });
    };

    // Handler to remove one instance of an item by id
    const removeFromCart = (id) => {
        setCartData((prevCart) => {
            // Find the index of the product in the cart
            const index = prevCart.findIndex((item) => item.id === id);

            if (index !== -1) {
                const updatedCart = [...prevCart];
                updatedCart.splice(index, 1); // Remove only the first occurrence

                // If the cart is empty, store an empty array in local storage
                if (updatedCart.length === 0) {
                    localStorage.setItem("cart", JSON.stringify([])); // Store empty array in localStorage
                    setcartCourseInformation([])
                    setCartSummary({})
                    setCartModal(false);
                } else {
                    // Otherwise, update the localStorage with the updated cart
                    localStorage.setItem("cart", JSON.stringify(updatedCart));
                }

                return updatedCart; // Return the updated cart
            }

            return prevCart; // If id is not found, return the same cart
        });
    };



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
        setuserInformation, cartModal, setCartModal, cartData, addToCart, removeFromCart,
        cartSummary, setCartSummary,
        checkoutHandling,
        cartCourseInformation,
        setCartData,
        setCouponInformation
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AuthProvider;