import axios from 'axios';
import toast from 'react-hot-toast';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // dynamic import to avoid circular dependency
    const { store } = await import('../store');
    const token = store.getState().auth.accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axiosInstance.post('/users/refresh-token');
        const { accessToken, refreshToken } = res.data?.data;

        const { store } = await import('../store'); // dynamic import
        if (accessToken && refreshToken) {
          store.dispatch({
            type: 'auth/updateTokens', // make sure this exists in your authSlice
            payload: { accessToken, refreshToken },
          });

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        const { store } = await import('../store');
        store.dispatch({ type: 'auth/logout' });
        toast.error(
          refreshError?.response?.data?.message ||
            'Session expired, please login again'
        );
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
