import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token has expired
      localStorage.removeItem('token');
      const navigate = useNavigate();
      navigate('/');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
