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

        static async UserProfileform(payload) {
            try {
                const response = await api.post(`/api/v1/student/update`, payload);
                return response;
            } catch (error) {
                throw error;
            }
        }

        static async wishlistUpdate(payload) {
            try {
                const response = await api.post(`/api/v1/wishlist/update`, payload);
                return response;
            } catch (error) {
                throw error;
            }
        }

        static async getWishList(page) {
            try {
                const response = await api.get(`/api/v1/wishlist?page=${page}`);
                return response;
            } catch (error) {
                throw error;
            }
        }

        static async getCouorseList(page) {
            try {
                const response = await api.get(`/api/v1/student/course-list?page=${page}`);
                return response;
            } catch (error) {
                throw error;
            }
        }

        static async getNotificationList(page) {
            try {
                const response = await api.get(`/api/v1/student/notification-list?page=${page}`);
                return response;
            } catch (error) {
                throw error;
            }
        }
}




export default ProfileService;
