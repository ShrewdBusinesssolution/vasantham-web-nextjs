"use client";
import React, { useState, createContext, useEffect } from "react";
import { TempOrderList } from "../constant";
export const AppContext = createContext();


export const AuthProvider = ({ children }) => {


    const cart_dummy = [
        {
            id: 1,
            name: "Sofa",
            price: 800,
            quantity: 1,
            rating: 3
        },
        {
            id: 2,
            name: "Dining Table",
            price: 600,
            quantity: 1,
            rating: 3
        },
        {
            id: 3,
            name: "Armchair",
            price: 400,
            quantity: 2,
            rating: 3
        }
    ];
    const addresses = [
        {
            id: 1,
            type: 'home',
            name: 'John Doe',
            address: '123 Main St, Apartment 4B',
            pincode: '123456',
            phoneNumber: '123-456-7890'
        },
        {
            id: 2,
            type: 'office',
            name: 'Jane Smith',
            address: '456 Corporate Blvd, Suite 100',
            pincode: '654321',
            phoneNumber: '234-567-8901'
        },
        {
            id: 3,
            type: 'others',
            name: 'Mike Johnson',
            address: '789 Elm St, PO Box 567',
            pincode: '789123',
            phoneNumber: '345-678-9012'
        }
    ];
    const [companyInfo, setCompanyInfo] = useState({})
    const [signUpInformation, setSignUpInformation] = useState({})
    const [cartData, setCartData] = useState([]);
    const [preloader, setPreLoader] = useState(false);
    const [cartSummary, setCartSummary] = useState({});
    const [address, setaddress] = useState([]);
    const [orderList, setOrderList] = useState([])
    const [wishlist, setwishList] = useState([])
    const [forgotPasswordemail, setForgotPasswordemail] = useState("")
    const [forgotPasswordemailotpVerify, setForgotPasswordemailotpVerify] = useState(false)
    const [addressLoading, setAddressLoading] = useState(true)




    // Load cart data from local storage on component mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartData(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        if (cartData && cartData.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cartData));
        }
    }, [cartData]);

    const decreaseQuantity = (id) => {
        const updatedCart = cartData.map(item =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
        const filteredCart = updatedCart.filter(item => item.quantity > 0);

        setCartData(filteredCart);

        // Update localStorage if the cart is empty
        if (filteredCart.length === 0) {
            localStorage.setItem('cart', JSON.stringify([]));
        }

        // Return filtered cart data
        return filteredCart;
    };
    const increaseQuantity = (id) => {
        const updatedCart = cartData.some(item => item.id === id)
            ? cartData.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
            : [...cartData, { id, quantity: 1 }];

        setCartData(updatedCart);

        // Return updated cart data
        return updatedCart;
    };
    const removeCart = (id) => {
        const updatedCart = cartData.filter(item => item.id !== id);
        setCartData(updatedCart);

        // Update localStorage and return the updated cart data
        if (updatedCart.length === 0) {
            localStorage.setItem('cart', JSON.stringify([]));
            return [];
        }

        return updatedCart;
    };

    const removeAddress = (id) => {
        const updatedAddress = address.filter(item => item.id !== id);
        setaddress(updatedAddress);
    };

    const updateAddress = (id, newData) => {
        const updatedAddress = address.map(item =>
            item.id === id ? { ...item, ...newData } : item
        );
        setaddress(updatedAddress);
    };





    const value = {
        companyInfo,
        setCompanyInfo,
        signUpInformation,
        setSignUpInformation,
        cartData,
        setCartData,
        preloader,
        setPreLoader,
        increaseQuantity,
        decreaseQuantity,
        removeCart,
        address,
        setaddress,
        removeAddress,
        updateAddress,
        orderList,
        setOrderList,
        cartSummary,
        setCartSummary,
        wishlist,
        setwishList,
        forgotPasswordemail,
        setForgotPasswordemail,
        forgotPasswordemailotpVerify,
        setForgotPasswordemailotpVerify,
        addressLoading,
        setAddressLoading

    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AuthProvider;