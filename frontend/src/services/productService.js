import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productService = {
  // Obtener todos los productos con filtros opcionales
  getProducts: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== '' && filters[key] !== null) {
          params.append(key, filters[key]);
        }
      });

      const response = await api.get(`/productos?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener productos');
    }
  },

  // Obtener un producto por ID
  getProduct: async (id) => {
    try {
      const response = await api.get(`/productos/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener el producto');
    }
  },

  // Crear un nuevo producto
  createProduct: async (productData) => {
    try {
      const response = await api.post('/productos', productData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear el producto');
    }
  },

  // Actualizar un producto
  updateProduct: async (id, productData) => {
    try {
      const response = await api.put(`/productos/${id}`, productData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al actualizar el producto');
    }
  },

  // Eliminar un producto
  deleteProduct: async (id) => {
    try {
      const response = await api.delete(`/productos/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al eliminar el producto');
    }
  },

  // Categorías disponibles
  getCategories: () => [
    'electronica',
    'ropa',
    'hogar',
    'deportes',
    'libros',
    'otros'
  ],

  // Formatear precio
  formatPrice: (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  },

  // Formatear fecha
  formatDate: (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
};

export default productService;
