import apiClient from "./ApiClient";

// Framtida funktion/seed data, "sök bland populära prenumerationer"?
export const serviceCatalogService = {
  getAll: async () => {
    const response = await apiClient.get('servicecatalog');
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`servicecatalog/${id}`);
    return response.data;
  },

  getByCategory: async (categoryId) => {
    const response = await apiClient.get(`servicecatalog/category/${categoryId}`);
    return response.data;
  }
};