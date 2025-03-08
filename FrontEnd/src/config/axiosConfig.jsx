import axios from "axios";
import {useAuth} from "../context/index.jsx";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
});

instance.interceptors.request.use(function (config) {
    let token = window.localStorage.getItem('accessToken')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return error.response.data;
});
instance.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            const { logout } = useAuth();
            logout();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
export default instance