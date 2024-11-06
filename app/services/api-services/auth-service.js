import api from './fetch-service';

class AuthService {

    static async ForgototpSend(payload) {
        try {
            const response = await api.post(`/api/v1/forgot-password/send-otp`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async ForgototpVerify(payload) {
        try {
            const response = await api.post(`/api/v1/forgot-password/verify-otp`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async RestPassword(payload) {
        try {
            const response = await api.post(`/api/v1/forgot-password/reset-password`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async Signup(payload) {
        try {
            const response = await api.post(`/api/auth/customer-register`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}

export default AuthService;