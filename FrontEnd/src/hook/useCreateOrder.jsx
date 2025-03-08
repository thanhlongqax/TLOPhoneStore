import { useState, useCallback } from 'react';
import { orderService } from '../service';

const useCreateOrder = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createOrder = useCallback(async (payload) => {
        setLoading(true);
        setError(null);
        try {
            const response = await orderService.CreateOrder(payload);
            return response;
        } catch (err) {
            setError(err.message || 'Đã có lỗi xảy ra!');
        } finally {
            setLoading(false);
        }
    }, []);

    return { createOrder, loading, error };
};

export default useCreateOrder;
