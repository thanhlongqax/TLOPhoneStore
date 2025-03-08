import axiosConfig from '../../config/axiosConfig.jsx';

class OrderService {

    CreateOrder(payload) {
        return axiosConfig.post(`/api/orders`, payload);
    }
    GetOrderById(id) {
        return axiosConfig.get(`/api/orders/${id}`);
    }
}

const orderService = new OrderService();
export default orderService;
