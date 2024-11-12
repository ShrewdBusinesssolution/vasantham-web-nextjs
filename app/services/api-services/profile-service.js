import api from './fetch-service';

class ProfileService {

        static async GetProfileInfo() {
            try {
                const response = await api.get(`/api/v1/student`);
                return response.data;
            } catch (error) {
                throw error;
            }
        }
}

export default ProfileService;
