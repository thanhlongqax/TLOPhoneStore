import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

const axiosApiConfig = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosApiConfig;
