import api from './fetch-service';

class CourseService {

    static async list(params) {
        try {
            const queryString = params ? `?${params}` : '';
            const response = await api.get(`/api/v1/course${queryString}`);
            return response
        } catch (error) {
            throw error;
        }
    }

    static async courseDetailWalkingStudent(slug) {
        try {
            const response = await api.get(`/api/v1/course/${slug}`);
            return response
        } catch (error) {
            throw error;
        }
    }

    static async courseunitView(slug, params) {
        try {
            const queryString = params ? `?${params}` : '';
            const response = await api.get(`/api/v1/course/unit/${slug}${queryString}`);
            return response
        } catch (error) {
            throw error;
        }
    }

    static async courseunitLessonView(courseSlug, unitId) {
        try {
            const url = `/api/v1/course/${courseSlug}/unit/${unitId}`;
            console.log("🚀 ~ CourseService ~ courseunitLessonView ~ /api/v1/course/${courseSlug}/unit/${unitId}:", `/api/v1/course/${courseSlug}/unit/${unitId}`)
            const response = await api.get(url);
            return response
        } catch (error) {
            console.log("🚀 ~ CourseService ~ courseunitLessonView ~ error:", error)
            throw error;
        }
    }



}

export default CourseService;