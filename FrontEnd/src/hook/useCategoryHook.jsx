import { useState, useEffect, useCallback } from 'react';
import { categoryService } from '../service';

const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loadingCategory, setLoadingCategory] = useState(true);
    const [errorCategory, setErrorCategory] = useState(null);
    const [totalCategories, setTotalCategories] = useState(1);

    const fetchCategories = useCallback(async (page = 1, limit = 10, search = '') => {
        setLoadingCategory(true);
        try {
            const response = await categoryService.GetCategoryByPage(page, limit, search);
            setCategories(response.data);
            setTotalCategories(response.total);
        } catch (err) {
            setErrorCategory(err.message);
        } finally {
            setLoadingCategory(false);
        }
    }, []);

    const getAllCategories = useCallback(async () => {
        setLoadingCategory(true);
        try {
            const response = await categoryService.GetCategoryAll();
            setCategories(response.data);
        } catch (err) {
            setErrorCategory(err.message);
        } finally {
            setLoadingCategory(false);
        }
    }, []);

    const getCategoryById = useCallback(async (id) => {
        setLoadingCategory(true);
        try {
            const response = await categoryService.GetCategoryById(id);
            return response;
        } catch (err) {
            setErrorCategory(err.message);
        } finally {
            setLoadingCategory(false);
        }
    }, []);

    const createCategory = useCallback(async (categoryData) => {
        try {
            const response = await categoryService.CreateCategory(categoryData);
            return response;
        } catch (err) {
            setErrorCategory(err.response?.message || err.message);
        } finally {
            setLoadingCategory(false);
        }
    }, []);

    const updateCategory = useCallback(async (id, categoryData) => {
        try {
            const response = await categoryService.UpdateCategoryById(id, categoryData);
            return response;
        } catch (err) {
            setErrorCategory(err.message);
        } finally {
            setLoadingCategory(false);
        }
    }, []);

    const deleteCategory = useCallback(async (id) => {
        try {
            await categoryService.DeleteCategoryById(id);
        } catch (err) {
            setErrorCategory(err.message);
        } finally {
            setLoadingCategory(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return {
        categories,
        loadingCategory,
        errorCategory,
        totalCategories,
        fetchCategories,
        getAllCategories,
        getCategoryById,
        createCategory,
        updateCategory,
        deleteCategory,
    };
};

export default useCategories;
