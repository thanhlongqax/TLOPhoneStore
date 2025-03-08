import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from "../service/index.jsx";
import { toast } from 'react-toastify';

const useLogout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const logout = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            await authService.Logout();
            navigate("/login");
        } catch (error) {
            toast.error("Đăng xuất không thành công!", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    return { logout, loading, error };
};

export default useLogout;
