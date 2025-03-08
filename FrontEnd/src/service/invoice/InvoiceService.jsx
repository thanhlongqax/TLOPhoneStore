import axiosConfig from '../../config/axiosConfig.jsx';

class InvoiceService {
    async getInvoice(orderId) {
        try {
            const response = await axiosConfig.get(`/api/invoice/${orderId}`, {
                responseType: 'blob',
            });

            return response
        } catch (error) {
            console.error('Error fetching invoice:', error);
            throw error;
        }
    }
}

const invoiceService = new InvoiceService();
export default invoiceService;
