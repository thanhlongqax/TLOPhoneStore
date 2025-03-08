import axiosConfig from '../../config/axiosConfig.jsx';

class CartService {
    GetCartAll() {
        return axiosConfig.get(`/api/categories`);
    }
    GetCartByPage(page , limit ,searchTerm ) {
        return axiosConfig.get(`/api/categories?page=${page}&limit=${limit}&search=${searchTerm}`);
    }
    GetCartById(id) {
        return axiosConfig.get(`/api/categories/${id}`);
    }

    UpdateCartById(categoriesd ,payload) {
        return axiosConfig.put(`/api/categories/${categoriesd}`, payload);
    }

    CreateCart(payload) {
        return axiosConfig.post(`/api/categories`, payload);
    }

    DeleteCartById(id) {
        return axiosConfig.delete(`/api/categories/${id}`);
    }

}

const cartService = new CartService();
export default cartService;
