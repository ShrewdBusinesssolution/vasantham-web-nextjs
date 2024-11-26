import api from './fetch-service';

class TestService {

    static async GetQuestions(payload) {
        try {
            const response = await api.post(`/api/v1/test`, payload);
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async submitAnswer(payload) {
        try {
            const response = await api.post(`/api/v1/test/submit-answer`, payload);
            return response;
        } catch (error) {
            throw error;
        }
    }


}




export default TestService;
