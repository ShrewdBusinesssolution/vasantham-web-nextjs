// import axiosInstance from './axios-service';
import api from './fetch-service';

class BasicService {


    /**
     * Saves an enquiry by sending a POST request to the '/api/contact-us' endpoint.
     * 
     * @param {Object} payload - The data to be sent in the request body.
     * @returns {Promise} A promise that resolves to the data returned from the API.
     * @throws {Error} If an error occurs during the POST request.
     */
    static async EnquirySave(payload) {
        try {
            const response = await axiosInstance.post(`/api/contact-us`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    /**
     * Retrieves company information by sending a GET request to the '/api/company/profile' endpoint.
     * 
     * @returns {Promise} A promise that resolves to the data containing company information.
     * @throws {Error} If an error occurs during the GET request.
     */
    static async GetCompanyInfo() {
        try {
            const response = await api.get(`/basic/company-profile`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async PrivacyPolicy() {
        try {
            const response = await api.get(`/basic/privacy-policy`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    static async TermsCondition() {
        try {
            const response = await api.get(`/basic/terms-and-conditions`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    static async ReturnPolicy() {
        try {
            const response = await api.get(`/basic/return-policy`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

     /**
     * Retrieves company Flash Information by sending a GET request to the '/api/flash-message' endpoint.
     * 
     * @returns {Promise} A promise that resolves to the data containing company information.
     * @throws {Error} If an error occurs during the GET request.
     */
     static async GetCompanyFlashInfo() {
        try {
            const response = await axiosInstance.get(`/api/flash-message`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }


     /**
     * Retrieves Section information by sending a GET request to the '/api/flash-message' endpoint.
     * 
     * @returns {Promise} A promise that resolves to the data containing company information.
     * @throws {Error} If an error occurs during the GET request.
     */
     static async GetSectionsInfo() {
        try {
            const response = await axiosInstance.get(`/api/collections`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

     /**
     * Retrieves Popup information by sending a GET request to the '/api/flash-message' endpoint.
     * 
     * @returns {Promise} A promise that resolves to the data containing company information.
     * @throws {Error} If an error occurs during the GET request.
     */
     static async GetPopupInfo() {
        try {
            const response = await axiosInstance.get(`/api/popup`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }


    /**
     * Retrieves search results by sending a GET request to the '/api/search' endpoint with a specific keyword.
     * 
     * @param {string} keyword - The keyword to search for.
     * @returns {Promise} A promise that resolves to the data containing search results.
     * @throws {Error} If an error occurs during the GET request.
     */
    static async SearchResult(keyword, slug) {
        try {
            const response = await axiosInstance.get(`/api/search?category=${slug ?? ''}&keyword=${keyword}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }


    static async getPaymentMethod() {
        try {
            const response = await axiosInstance.get(`/api/payment-methods`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }


    static async getCategories() {
        try {
            const response = await axiosInstance.get(`/api/categories`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }


    static async getWishList(page) {
        try {
            const response = await axiosInstance.get(`/api/wishlists?page=${page}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }



}

export default BasicService;