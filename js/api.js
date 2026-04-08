// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth token
function getAuthToken() {
    return localStorage.getItem('turfhub_token');
}

// Helper function to set auth headers
function getHeaders(includeAuth = true) {
    const headers = { 'Content-Type': 'application/json' };
    if (includeAuth) {
        const token = getAuthToken();
        if (token) headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
}

// Generic API request function
async function apiRequest(endpoint, method = 'GET', data = null, requireAuth = true) {
    const config = {
        method,
        headers: getHeaders(requireAuth)
    };

    if (data) {
        config.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'API request failed');
        }

        return result;
    } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error('Cannot connect to server. Make sure the backend is running.');
        }
        throw error;
    }
}

// Auth API
const AuthAPI = {
    register: (data) => apiRequest('/auth/register', 'POST', data, false),
    login: (data) => apiRequest('/auth/login', 'POST', data, false),
    logout: () => apiRequest('/auth/logout', 'POST'),
    getProfile: () => apiRequest('/auth/profile')
};

// Turfs API
const TurfsAPI = {
    getAll: (filters = {}) => {
        const params = new URLSearchParams(filters).toString();
        return apiRequest(`/turfs${params ? '?' + params : ''}`, 'GET', null, false);
    },
    getById: (id) => apiRequest(`/turfs/${id}`, 'GET', null, false),
    getSlots: (id, date) => apiRequest(`/turfs/${id}/slots?date=${date}`, 'GET', null, false),
    create: (data) => apiRequest('/turfs', 'POST', data),
    update: (id, data) => apiRequest(`/turfs/${id}`, 'PUT', data),
    delete: (id) => apiRequest(`/turfs/${id}`, 'DELETE')
};

// Bookings API
const BookingsAPI = {
    create: (data) => apiRequest('/bookings', 'POST', data),
    getMyBookings: () => apiRequest('/bookings'),
    getById: (id) => apiRequest(`/bookings/${id}`),
    cancel: (id) => apiRequest(`/bookings/${id}`, 'PUT', { status: 'cancelled' }),
    delete: (id) => apiRequest(`/bookings/${id}`, 'DELETE')
};

// Admin API
const AdminAPI = {
    getStats: () => apiRequest('/admin/stats'),
    getAllBookings: () => apiRequest('/admin/bookings')
};
