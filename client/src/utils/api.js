import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: '/api', // Relative URL works for both local and production
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
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
};

export const coursesAPI = {
    getAll: () => api.get('/academic/courses'),
    create: (data) => api.post('/academic/courses', data),
    getById: (id) => api.get(`/academic/courses/${id}`),
    update: (id, data) => api.put(`/academic/courses/${id}`, data),
    delete: (id) => api.delete(`/academic/courses/${id}`),
};

export const assignmentsAPI = {
    getAll: () => api.get('/assignments'),
    create: (data) => api.post('/assignments', data),
    submit: (id, formData) => api.post(`/assignments/${id}/submit`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

export const jobsAPI = {
    getAll: () => api.get('/jobs'),
    apply: (id, formData) => api.post(`/jobs/${id}/apply`, formData, {
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
    mark: (data) => api.post('/attendance', data),
};

export const userAPI = {
    getProfile: () => api.get('/users/profile'),
    updateProfile: (data) => api.put('/users/profile', data),
    changePassword: (data) => api.put('/users/password', data),
};

export default api;
