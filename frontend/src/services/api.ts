import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Transactions API
export const transactionsApi = {
  create: (data: any) => apiClient.post('/transactions', data),
  findAll: (skip?: number, take?: number, startDate?: string, endDate?: string) =>
    apiClient.get('/transactions', { params: { skip, take, startDate, endDate } }),
  findOne: (id: string) => apiClient.get(`/transactions/${id}`),
  update: (id: string, data: any) => apiClient.patch(`/transactions/${id}`, data),
  delete: (id: string) => apiClient.delete(`/transactions/${id}`),
  getMonthlyStats: (year: number, month: number) =>
    apiClient.get('/transactions/stats/monthly', { params: { year, month } }),
  getCategoryStats: () => apiClient.get('/transactions/stats/categories'),
  getMerchantStats: () => apiClient.get('/transactions/stats/merchants'),
};

// Items API
export const itemsApi = {
  create: (data: any) => apiClient.post('/items', data),
  findAll: (skip?: number, take?: number, status?: string) =>
    apiClient.get('/items', { params: { skip, take, status } }),
  findOne: (id: string) => apiClient.get(`/items/${id}`),
  update: (id: string, data: any) => apiClient.patch(`/items/${id}`, data),
  delete: (id: string) => apiClient.delete(`/items/${id}`),
  getCategoryStats: () => apiClient.get('/items/stats/categories'),
  getIdleItems: (days?: number) => apiClient.get('/items/stats/idle', { params: { days } }),
  getMostUsedItems: (limit?: number) => apiClient.get('/items/stats/most-used', { params: { limit } }),
  getValueRanking: () => apiClient.get('/items/stats/value-ranking'),
};

// Usage Logs API
export const usageLogsApi = {
  create: (data: any) => apiClient.post('/usage-logs', data),
  quickLog: (itemId: string, count?: number, duration?: number) =>
    apiClient.post(`/usage-logs/quick/${itemId}`, {}, { params: { count, duration } }),
  findAll: (itemId: string, skip?: number, take?: number) =>
    apiClient.get(`/usage-logs/item/${itemId}`, { params: { skip, take } }),
  findOne: (id: string) => apiClient.get(`/usage-logs/${id}`),
  update: (id: string, data: any) => apiClient.patch(`/usage-logs/${id}`, data),
  delete: (id: string) => apiClient.delete(`/usage-logs/${id}`),
  getUsageStats: (itemId: string, startDate: string, endDate: string) =>
    apiClient.get(`/usage-logs/stats/${itemId}`, { params: { startDate, endDate } }),
  getUsageTrend: (itemId: string, days?: number) =>
    apiClient.get(`/usage-logs/stats/trend/${itemId}`, { params: { days } }),
};

// Watchlists API
export const watchlistsApi = {
  create: (data: any) => apiClient.post('/watchlists', data),
  findAll: (skip?: number, take?: number, status?: string) =>
    apiClient.get('/watchlists', { params: { skip, take, status } }),
  findOne: (id: string) => apiClient.get(`/watchlists/${id}`),
  update: (id: string, data: any) => apiClient.patch(`/watchlists/${id}`, data),
  delete: (id: string) => apiClient.delete(`/watchlists/${id}`),
  getPriceStats: (id: string, days?: number) =>
    apiClient.get(`/watchlists/stats/${id}`, { params: { days } }),
  addPriceHistory: (id: string, data: any) => apiClient.post(`/watchlists/${id}/price-history`, data),
  getPriceDropItems: () => apiClient.get('/watchlists/alerts/price-drops'),
  getRecentPriceDrops: (days?: number) =>
    apiClient.get('/watchlists/alerts/recent-drops', { params: { days } }),
};

// Dashboard API
export const dashboardApi = {
  getHomeCards: () => apiClient.get('/dashboard/home-cards'),
  getSpendingDashboard: (month?: number, year?: number) =>
    apiClient.get('/dashboard/spending', { params: { month, year } }),
  getItemsDashboard: () => apiClient.get('/dashboard/items'),
  getWatchlistDashboard: () => apiClient.get('/dashboard/watchlist'),
  getComprehensiveDashboard: () => apiClient.get('/dashboard'),
};
