import { useState, useCallback } from 'react';
import { authService } from "../service";
const useAuthHook = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = useCallback(async (payload) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.Login(payload);
            if (response?.accessToken && response?.refreshToken ) {
                localStorage.setItem("accessToken", response.accessToken);
                localStorage.setItem("refreshToken", response.refreshToken);
            }
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const loginWithToken = useCallback(async (token) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.LoginWithToken(token);
            if (response?.accessToken && response?.refreshToken ) {
                localStorage.setItem("accessToken", response.accessToken);
                localStorage.setItem("refreshToken", response.refreshToken);
            }
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const registerWithMail = useCallback(async (payload) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.RegisterWithMail(payload);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);
    const changePassword = useCallback(async (changePasswordDTO , token) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.ChangePassword(changePasswordDTO, token);
            return response;
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi khi đổi mật khẩu.');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);
    const refreshToken = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.RefreshToken();
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        login,
        loginWithToken,
        registerWithMail,
        changePassword,
        refreshToken,
        loading,
        error,
    };
};

export default useAuthHook;
