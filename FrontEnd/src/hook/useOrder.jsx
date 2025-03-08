import { useState, useCallback } from 'react';
import {orderService} from '../service';

const useOrder = () => {
    const [loadingOrder, setLoadingOrder] = useState(false);
    const [errorOrder, setErrorOrder] = useState(null);
    const [order, setOrder] = useState(null);

    const getOrderById = useCallback(async (id) => {
        setLoadingOrder(true);
        setErrorOrder(null);
        try {
            const response = await orderService.GetOrderById(id);
            setOrder(response.data);
            return response.data;
        } catch (error) {
            setErrorOrder(error?.response?.data || error.message || 'Failed to fetch order');
            throw error;
        } finally {
            setLoadingOrder(false);
        }
    }, []);

    return {
        order,
        loadingOrder,
        errorOrder,
        getOrderById,
    };
};

export default useOrder;
