import api from './fetch-service'; // Assuming fetchWithAuth is exported from here

class AuthService {
    static async ForgototpSend(payload) {
        try {
            const response = await api.post('/api/forgot-password/send-otp', payload);
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async ForgototpVerify(payload) {
        try {
            const response = await api.post('/api/forgot-password/verify-otp', payload);
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async RestPassword(payload) {
        try {
            const response = await api.post('/api/forgot-password/reset-password', payload);
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async Signup(payload) {
        try {
            const response = await api.post('/api/auth/customer-register', payload);
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async sendOtp(payload) {
        try {
            const response = await api.post('/api/auth/send-otp', payload);
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async resendOtp(payload) {
        try {
            const response = await api.post('/api/auth/resend-otp', payload);
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async verifyOtp(payload) {
        try {
            const response = await api.post('/api/auth/verify-otp', payload);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default AuthService;
