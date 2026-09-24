import apiClient from "./ApiClient";

// Service to ge subscriptions
export const subscriptionService = {
  getAll: async () => {
    const response = await apiClient.get('subscription');
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`subscription/${id}`);
    return response.data;
  },

  getSummary: async () => {
    const response = await apiClient.get('subscription/dashboard');
    return response.data;
  },

  create: async (dto) => {
    const response = await apiClient.post('subscription', dto);
    return response.data;
  },

  update: async (id, dto) => {
    const response = await apiClient.put(`subscription/${id}`, dto);
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(`subscription/${id}`);
    return response.data;
  }
};