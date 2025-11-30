import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api', // Use env var for production, proxy for local
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - Add auth token to all requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Handle 401 Unauthorized - logout user
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
            }

            // Handle other errors
            const message = error.response.data?.message || 'An error occurred';
            console.error('API Error:', message);

            return Promise.reject(error);
        } else if (error.request) {
            console.error('Network Error:', error.message);
            return Promise.reject(new Error('Network error. Please check your connection.'));
        } else {
            console.error('Error:', error.message);
            return Promise.reject(error);
        }
    }
);

// API methods
// API methods
export const authAPI = {
    register: (data: any) => api.post('/auth/register', data),
    login: (data: any) => api.post('/auth/login', data),
};

export const coursesAPI = {
    getAll: () => api.get('/academic/courses'),
    create: (data: any) => api.post('/academic/courses', data),
    getById: (id: string) => api.get(`/academic/courses/${id}`),
    update: (id: string, data: any) => api.put(`/academic/courses/${id}`, data),
    delete: (id: string) => api.delete(`/academic/courses/${id}`),
};

export const assignmentsAPI = {
    getAll: () => api.get('/assignments'),
    create: (data: any) => api.post('/assignments', data),
    submit: (id: string, formData: any) => api.post(`/assignments/${id}/submit`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

export const jobsAPI = {
    getAll: () => api.get('/jobs'),
    apply: (id: string, formData: any) => api.post(`/jobs/${id}/apply`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

export const dashboardAPI = {
    getStats: () => api.get('/dashboard/stats'),
};

export const timetableAPI = {
    getSchedule: () => api.get('/schedule/timetable'),
};

export const attendanceAPI = {
    getRecords: () => api.get('/attendance'),
    mark: (data: any) => api.post('/attendance', data),
};

export const userAPI = {
    getProfile: () => api.get('/users/profile'),
    updateProfile: (data: any) => api.put('/users/profile', data),
    changePassword: (data: any) => api.put('/users/password', data),
};

export default api;
