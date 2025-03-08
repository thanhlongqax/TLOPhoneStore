import { useState, useCallback } from 'react';
import { adminService } from '../service';

const useAdmin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateAdmin = useCallback(async (username, payload) => {
        setLoading(true);
        setError(null);
        try {
            const response = await adminService.UpdateAdmin(username, payload);
            setLoading(false);
            return response;
        } catch (err) {
            setLoading(false);
            setError(err);
            console.error('Error updating admin:', err);
            throw err;
        }
    }, []);

    return {
        updateAdmin,
        loading,
        error,
    };
};

export default useAdmin;
