import apiClient from "./ApiClient";

// Service to get categories
export const categoryService = {
  getAll: async () => {
    const response = await apiClient.get('category');
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`category/${id}`);
    return response.data;
  }
};