import axios from 'axios';

const API = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
});

/**
 * Fetch all products
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export const getProducts = () => API.get('/products');

/**
 * Fetch a single product by ID
 * @param {number|string} id
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export const getProduct = (id) => API.get(`/products/${id}`);

/**
 * Fetch all product categories
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export const getCategories = () => API.get('/products/categories');

export default API;
