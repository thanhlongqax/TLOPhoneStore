import axiosConfig from '../../config/axiosConfig.jsx';

class CategoryService {
    GetCategoryAll() {
        return axiosConfig.get(`/api/categories`);
    }
    GetCategoryByPage(page , limit ,searchTerm ) {
        return axiosConfig.get(`/api/categories?page=${page}&limit=${limit}&search=${searchTerm}`);
    }
    GetCategoryById(id) {
        return axiosConfig.get(`/api/categories/${id}`);
    }

    UpdateCategoryById(categoriesd ,payload) {
        return axiosConfig.put(`/api/categories/${categoriesd}`, payload);
    }

    CreateCategory(payload) {
        return axiosConfig.post(`/api/categories`, payload);
    }

    DeleteCategoryById(id) {
        return axiosConfig.delete(`/api/categories/${id}`);
    }

}

const categoryService = new CategoryService();
export default categoryService;
