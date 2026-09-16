import apiClient from "./ApiClient";

export const authService ={
    login: async (credentials) => {
        const response = await apiClient.post('/auth/login', credentials)
        return response.data;
    },
    logout: async () => {
        await apiClient.post('/auth/logout');
    },
    register: async (credentials) => {
        const response = await apiClient.post('/auth/register', credentials)
        return response.data;
    },
    getCurrentUser: async () => {
        const response = await apiClient.get('/auth/me')
        return response.data;
    }
};