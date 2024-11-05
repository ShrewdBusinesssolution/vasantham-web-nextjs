import api from './fetch-service'; // Assuming fetchWithAuth is exported from here

class AuthService {
   
    static async Signup(payload) {
        try {
            const response = await api.post('/api/v1/auth/register', payload);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default AuthService;
