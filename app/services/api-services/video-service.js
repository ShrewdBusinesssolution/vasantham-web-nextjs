import api from './fetch-service';

class VideoService {

    static async GetVideData(payload) {
        try {
            const response = await api.post(`/api/v1/video/get-video`, payload);
            return response;
        } catch (error) {
            throw error;
        }
    }



}




export default VideoService;
