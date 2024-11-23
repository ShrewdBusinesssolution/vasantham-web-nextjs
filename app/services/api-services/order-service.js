import api from './fetch-service';

class OrderService {

    static async checkoutSummary(payload) {
        try {
            const response = await api.post(`/api/v1/checkout`, payload);
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async placeOrder(payload) {
        try {
            const response = await api.post(`/api/v1/checkout/place-order`, payload);
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async OrderVerify(payload) {
        try {
            const response = await api.post(`/api/v1/checkout/verify-online-payment`, payload);
            return response;
        } catch (error) {
            throw error;
        }
    }


}




export default OrderService;
