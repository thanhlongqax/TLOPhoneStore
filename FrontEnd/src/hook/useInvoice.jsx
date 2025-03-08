import { useState, useCallback } from 'react';
import { invoiceService } from '../service'; // Chú ý import đúng service

const useInvoice = () => {
    const [loadingInvoice, setLoading] = useState(false);
    const [errorInvoice, setError] = useState(null);

    const fetchInvoice = useCallback(async (orderId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await invoiceService.getInvoice(orderId);
            const fileUrl = URL.createObjectURL(response);
            window.open(fileUrl, '_blank');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
            console.error('Error fetching invoice:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    return { fetchInvoice, loadingInvoice, errorInvoice };
};

export default useInvoice;
