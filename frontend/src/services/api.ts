import axios from 'axios';
import { AuthResponse, LoginRequest, RegisterRequest } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle token expiration
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const authApi = {
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/login', data);
        return response.data;
    },

    register: async (data: RegisterRequest): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/register', data);
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },
};

export const courseApi = {
    getAllCourses: async () => {
        const response = await api.get('/courses');
        return response.data;
    },

    getCourseById: async (id: string) => {
        const response = await api.get(`/courses/${id}`);
        return response.data;
    },

    createCourse: async (data: any) => {
        const response = await api.post('/courses', data);
        return response.data;
    },

    updateCourse: async (id: string, data: any) => {
        const response = await api.put(`/courses/${id}`, data);
        return response.data;
    },

    deleteCourse: async (id: string) => {
        const response = await api.delete(`/courses/${id}`);
        return response.data;
    },

    enrollInCourse: async (courseId: string) => {
        const response = await api.post(`/courses/${courseId}/enroll`);
        return response.data;
    },

    addAnnouncement: async (courseId: string, data: any) => {
        const response = await api.post(`/courses/${courseId}/announcements`, data);
        return response.data;
    },

    addDiscussion: async (courseId: string, data: any) => {
        const response = await api.post(`/courses/${courseId}/discussions`, data);
        return response.data;
    },

    addDiscussionReply: async (courseId: string, discussionId: string, data: any) => {
        const response = await api.post(
            `/courses/${courseId}/discussions/${discussionId}/replies`,
            data
        );
        return response.data;
    },
};

export default api; 