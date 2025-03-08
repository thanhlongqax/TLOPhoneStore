import { useState, useCallback } from 'react';
import { productService } from '../service';

const useProductHook = () => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalProducts, setTotalProducts] = useState(0);

    const getProductById = useCallback(async (id) => {
        setLoading(true);
        try {
            const response = await productService.GetProductById(id);
            setProduct(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const addProduct = useCallback(async (newProduct) => {
        setLoading(true);
        try {
            const response = await productService.CreateProduct(newProduct);
            setProducts((prev) => [...prev, response.data]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const updateProduct = useCallback(async (id, updatedProduct) => {
        setLoading(true);
        try {
            const response = await productService.UpdateProductById(id, updatedProduct);
            setProducts((prev) => prev.map((prod) => (prod.id === id ? response.data : prod)));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteProduct = useCallback(async (id) => {
        setLoading(true);
        try {
            await productService.DeleteProductById(id);
            setProducts((prev) => prev.filter((prod) => prod.id !== id));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchProducts = useCallback(async (page = 1, limit = 10, searchTerm = '') => {
        setLoading(true);
        try {
            const response = await productService.GetProductByPage(page, limit, searchTerm);
            setProducts(response.data);
            setTotalProducts(response.total);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        products,
        product,
        loading,
        error,
        totalProducts,
        fetchProducts,
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct,
    };
};

export default useProductHook;
