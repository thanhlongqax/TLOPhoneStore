import axiosConfig from '../../config/axiosConfig.jsx';

class ProductService {

    GetProductByPage(page , limit ,searchTerm ) {
        return axiosConfig.get(`/api/products?page=${page}&limit=${limit}&search=${searchTerm}`);
    }
    GetAllProduct() {
        return axiosConfig.get("/api/products");
    }
    GetProductById(id) {
        return axiosConfig.get(`/api/products/${id}`);
    }

    UpdateProductById(productId ,payload) {
        return axiosConfig.put(`/api/products/${productId}`, payload);
    }

    CreateProduct(payload) {
        return axiosConfig.post(`/api/products`, payload);
    }

    DeleteProductById(id) {
        return axiosConfig.delete(`/api/products/${id}`);
    }

}

const productService = new ProductService();
export default productService;
