import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/pagamento'; // Adjust port if your backend runs elsewhere

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Customer endpoints
export const createCustomer = (customerData) => apiClient.post('/cliente', customerData);
export const getCustomers = () => apiClient.get('/buscar-clientes');

// Payment endpoints
export const createPayment = (paymentData) => apiClient.post('/criar', paymentData);
export const getPayments = () => apiClient.get('/buscar-cobrancas');

export default apiClient;