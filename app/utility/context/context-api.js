"use client";
import React, { useState, createContext, useEffect } from "react";
import { isEmptyobject } from "../helper";
import BasicService from "@/app/services/api-services/basic-service";
// import CustomerService from "@/app/services/api-services/customer-service";
import { useSession } from "next-auth/react";
// import AddressService from "@/app/services/api-services/address-service";
export const AppContext = createContext();

export const AuthProvider = ({ children }) => {

    const { data: session } = useSession();
    const [proceedCheckoutLoader, setProceedCheckoutLoader] = useState(false)
    // const [signUpInformation, setSignUpInformation] = useState({})
    // const [cartData, setCartData] = useState([]);
    // const [preloader, setPreLoader] = useState(false);
    // const [cartSummary, setCartSummary] = useState({});
    const [ProductSections, setProductSection] = useState([]);
    // const [totalCategories, setTotalCategories] = useState(0);
    // const [categoryList, setcategoryList] = useState([]);
    // const [address, setaddress] = useState([]);
    // const [orderList, setOrderList] = useState([])
    // const [wishlist, setwishList] = useState([]);
    // const [wishlistLoading, setwishLoading] = useState(false)
    // const [forgotPasswordemail, setForgotPasswordemail] = useState("")
    // const [forgotPasswordemailotpVerify, setForgotPasswordemailotpVerify] = useState(false)
    // const [addressLoading, setAddressLoading] = useState(false)
    // const [cartModal, setCartModal] = useState(false)
    // const [orderDetailModal, setOrderDetailModal] = useState(false)
    // const [couponInformation, setCouponInformation] = useState({})
    // const [popupOpen, setPopupOpen] = useState(false)
    // const [popupInformation, setPopupInformation] = useState({})
    // const [userInformation, setUserInformation] = useState({})
    // const [wishlistCount, setwishListCount] = useState(0)
    


    //FROM API TO CONTEXT BASED
    const [companyInfo, setCompanyInfo] = useState({})
    const [companyFlashData, setCompanyFlashData] = useState("")
    // Load cart data from local storage on component mount
    useEffect(() => {

        // const savedCart = localStorage.getItem('cart');
        // const savedCoupon = localStorage.getItem('coupon');

        // if (savedCart) {
        //     setCartData(JSON.parse(savedCart));
        // }
        // if (savedCoupon) {
        //     setCouponInformation(JSON.parse(savedCoupon));
        // }
        if (isEmptyobject(companyInfo)) {
            getCompanyInformation();
            getCompanyFlashInformation();
            getProductSectionsInformation();
            getPopupInformation();
            getCategoryInformation();

        }
    }, []);

    // useEffect(() => {
    //     if (session) {
    //         getUserInformation();
    //         getAddressList();
    //     }
    // }, [session])

    // useEffect(() => {
    //     if (cartData && cartData.length > 0) {
    //         localStorage.setItem('cart', JSON.stringify(cartData));
    //     }
    // }, [cartData]);

    // Cart Increase Quantity
    // const increaseQuantity = (id, product_variant_id) => {
    //     const updatedCart = cartData.some(item => item.id === id && item.product_variant_id === product_variant_id)
    //         ? cartData.map(item =>
    //             item.id === id && item.product_variant_id === product_variant_id
    //                 ? { ...item, quantity: item.quantity + 1 }
    //                 : item
    //         )
    //         : [...cartData, { id, product_variant_id, quantity: 1 }];

    //     setCartData(updatedCart);

        // Return updated cart data
    //     return updatedCart;
    // };

    // Cart Decrease Quantity
    // const decreaseQuantity = (id, product_variant_id) => {
    //     const updatedCart = cartData.map(item =>
    //         item.id === id && item.product_variant_id === product_variant_id
    //             ? { ...item, quantity: item.quantity - 1 }
    //             : item
    //     );
    //     const filteredCart = updatedCart.filter(item => item.quantity > 0);

    //     setCartData(filteredCart);

        // Update localStorage if the cart is empty
        // if (filteredCart.length === 0) {
        //     localStorage.setItem('cart', JSON.stringify([]));
        //     localStorage.removeItem('coupon_code');
        //     setCartData([]);
        //     setCartSummary([]);
        // }

        // Return filtered cart data
    //     return filteredCart;
    // };

    // Cart Remove Particular product
    // const removeCart = (id, product_variant_id) => {
    //     const updatedCart = cartData.filter(item => !(item.id === id && item.product_variant_id === product_variant_id));
    //     setCartData(updatedCart);

    //     // Update localStorage and return the updated cart data
    //     if (updatedCart.length === 0) {
    //         localStorage.setItem('cart', JSON.stringify([]));
    //         localStorage.removeItem('coupon_code');
    //         setCartData([]);
    //         setCartSummary([]);
    //         return [];
    //     }

    //     return updatedCart;
    // };

    // const removeAddress = (id) => {
    //     const updatedAddress = address.filter(item => item.id !== id);
    //     setaddress(updatedAddress);
    // };

    // const updateAddress = (id, newData) => {
    //     const updatedAddress = address.map(item =>
    //         item.id === id ? { ...item, ...newData } : item
    //     );
    //     setaddress(updatedAddress);
    // };


    //TODO COUPON SECTION
    // const CouponStore = (data) => {
    //     localStorage.setItem("coupon", JSON.stringify(data))
    //     setCouponInformation(data)

    // }
    // const CouponRemove = () => {
    //     localStorage.removeItem('coupon');
    //     setCouponInformation({})
    //     ContextCheckout()
    // }

    //API METHODS

    const getCompanyInformation = async () => {
        try {
            setCompanyInfo((await BasicService.GetCompanyInfo()).data);
        } catch (error) { console.log("🚀 ~ getCompanyInformation ~ error:", error) }
    };

    // const getUserInformation = async () => {
    //     try {
    //         const data = (await CustomerService.getCustomerInfomation()).data
    //         setUserInformation(data);
    //         setwishListCount(data.wishlist_count)
    //     } catch (error) { console.log("🚀 ~ getCompanyInformation ~ error:", error) }
    // };

    const getPopupInformation = async () => {
        try {
            const lastPopupTime = localStorage.getItem('lastPopupTime');
            const oneHour = 3600000; // 1 hour in milliseconds
            // If less than 1 hour has passed, don't show the popup
            const data = (await BasicService.GetPopupInfo()).data;
            setPopupInformation(data);

            if (lastPopupTime && new Date().getTime() - lastPopupTime < oneHour) return;

            if (data.status === 'Active') {
                setTimeout(() => {
                    setPopupOpen(true);
                    // Save the current time when the popup is shown
                    localStorage.setItem('lastPopupTime', new Date().getTime());
                }, 3000);
            }
        } catch (error) {
            console.log("Error loading popup information:", error);
        }
    };

    const getProductSectionsInformation = async () => {
        try {
            const data = (await BasicService.GetSectionsInfo()).data
            setProductSection(data.collections);
            setTotalCategories(data.total_categories);
        } catch (error) { console.log("🚀 ~ getCompanyInformation ~ error:", error) }
    }

    const getCompanyFlashInformation = async () => {
        try {
            setCompanyFlashData((await BasicService.GetCompanyFlashInfo()).data.flash_message);
        } catch (error) { console.log("🚀 ~ getCompanyInformation ~ error:", error) }
    };

    const getCategoryInformation = async () => {
        try {
            setcategoryList((await BasicService.getCategories()).data);
        } catch (error) { console.log("🚀 ~ getCompanyInformation ~ error:", error) }
    }

    // const getWishlistData = async () => {
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
        setCompanyInfo,
        // signUpInformation,
        // setSignUpInformation,
        // cartData,
        // setCartData,
        // preloader,
        // setPreLoader,
        // increaseQuantity,
        // decreaseQuantity,
        // removeCart,
        // address,
        // setaddress,
        // removeAddress,
        // updateAddress,
        // orderList,
        // setOrderList,
        // cartSummary,
        // setCartSummary,
        // wishlist,
        // setwishList,
        // forgotPasswordemail,
        // setForgotPasswordemail,
        // forgotPasswordemailotpVerify,
        // setForgotPasswordemailotpVerify,
        // addressLoading,
        // setAddressLoading,
        // cartModal,
        // setCartModal,
        // orderDetailModal,
        // setOrderDetailModal,
        // CouponStore,
        // couponInformation,
        // setCouponInformation,
        // CouponRemove,
        // proceedCheckoutLoader,
        // setProceedCheckoutLoader,
        // companyFlashData,
        ProductSections,
        // totalCategories,
        // popupOpen,
        // setPopupOpen,
        // popupInformation,
        // popupInformation,
        // userInformation,
        // wishlistCount,
        // setwishListCount,
        // categoryList,
        // getWishlistData,
        // wishlistLoading,
        // getAddressList
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AuthProvider;