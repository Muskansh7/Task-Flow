import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const authService = {
    register: (userData: any) => api.post('/auth/register', userData),
    login: (credentials: any) => api.post('/auth/login', credentials),
    getProfile: () => api.get('/auth/user'),
};

export const taskService = {
    getTasks: (params: any) => api.get('/tasks', { params }),
    createTask: (taskData: any) => api.post('/tasks', taskData),
    updateTask: (id: string, taskData: any) => api.put(`/tasks/${id}`, taskData),
    deleteTask: (id: string) => api.delete(`/tasks/${id}`),
};

export default api;
