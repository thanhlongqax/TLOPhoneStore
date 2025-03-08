import PropTypes from 'prop-types';
import PaginationComponent from "../../Pagination/PaginationComponent.jsx";
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../Modal/DeleteModal.jsx'
import { useProductHook } from '../../../hook/index.jsx';
import {notifyDeleteProduct} from "../../../../utils/index.jsx";
const ProductTable = ({ products, currentPage, totalPages, onPageChange ,fetchProducts ,productsPerPage , searchTerm }) => {
    const { loading, error, deleteProduct } = useProductHook();
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();
    const formatCurrency = (amount) => {
        if (amount) {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(amount);
        } else {
            return 'Chưa có dữ liệu';
        }
    };
    const openDeleteModal = (product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };
    const handleProductView = (productId) => {
        navigate(`/product/${productId}`);
    };
    const handleDelete = async () => {
        try {
            await deleteProduct(selectedProduct.product_id);
            setModalOpen(false);
            fetchProducts(currentPage, productsPerPage , searchTerm);
            notifyDeleteProduct();
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
        }
    };
    const openAddProductPage = () => {
        navigate('/admin/product/addProduct');
    };
    const handleEditProduct = (productId) => {
        navigate(`/admin/product/editProduct/${productId}`);
    }
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <div className="container w-full h-full p-6">
            <button
                onClick={openAddProductPage}
                className="flex items-center h-14 gap-2 p-6 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                <img src="/icon/add-100.png" className="w-12 h-12" alt="thêm tài khoản nhân viên"/>
                Thêm sản phẩm
            </button>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="py-3 px-5 text-left">Hình ảnh</th>
                        <th className="py-3 px-5 text-left">Tên sản phẩm</th>
                        <th className="py-3 px-5 text-left">Mô tả</th>
                        <th className="py-3 px-5 text-left">Giá</th>
                        <th className="py-3 px-5 text-left">Danh mục</th>
                        <th className="py-3 px-5 text-center">Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <tr key={index} className="hover:bg-gray-50 border-b">
                                <td className="py-3 px-5">
                                    <img
                                        src={`${import.meta.env.VITE_BASE_URL}/images/${product.thumbnail}`}
                                        alt={`Thumbnail ${product.product_name}`}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                </td>
                                <td className="py-3 px-5">{product.product_name}</td>
                                <td className="py-3 px-5 truncate max-w-28" title={product.short_description}>
                                    {product.short_description}
                                </td>

                                <td className="py-3 px-5">{formatCurrency(product.product_price)}</td>
                                <td className="py-3 px-5">{product.category.categorySlug}</td>
                                <td className="flex gap-2">
                                    <div className="flex justify-center gap-6 p-2">
                                        <button
                                            className="w-16 h-16 flex justify-center items-center text-white hover:bg-yellow-300 border border-gray-200 shadow-lg shadow-yellow-600 rounded-md group relative"
                                            onClick={() => handleProductView(product.product_id)}
                                        >
                                            <img alt="Product View Icon" src="/icon/detail-100.png"
                                                 className="w-full h-full"
                                            />
                                            <div
                                                className="absolute inset-y-0 left-12 hidden items-center group-hover:flex group-hover:translate-x-[-50%]">
                                                <div
                                                    className="relative whitespace-nowrap rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                                                    <div className="absolute inset-0 -left-1 flex items-center">
                                                        <div className="h-2 w-2 rotate-45 bg-white"></div>
                                                    </div>
                                                    Chi tiết
                                                </div>
                                            </div>
                                        </button>
                                        <button
                                            className="w-16 h-16 flex justify-center items-center text-black bg-white hover:bg-blue-600 border border-gray-200 shadow-md shadow-blue-400 rounded-md group relative"
                                            onClick={() => handleEditProduct(product.product_id)}
                                        >
                                            <img alt="Product Edit Icon" src="/icon/edit-100.png"
                                                 className="w-full h-full"
                                            />
                                            <div
                                                className="absolute inset-y-0 left-12 hidden items-center group-hover:flex group-hover:translate-x-[-50%]">
                                                <div
                                                    className="relative whitespace-nowrap rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                                                    <div className="absolute inset-0 -left-1 flex items-center">
                                                        <div className="h-2 w-2 rotate-45 bg-white"></div>
                                                    </div>
                                                    Chỉnh sửa
                                                </div>
                                            </div>
                                        </button>
                                        <button
                                            className="w-16 h-16 flex justify-center items-center text-black bg-white hover:bg-red-600 border border-gray-200 shadow-lg shadow-red-500 rounded-md group relative"
                                            onClick={() => openDeleteModal(product)}
                                        >
                                            <img
                                                alt="Delete Icon"
                                                src="/icon/delete-100.png"
                                                className="w-full h-full"
                                            />
                                            <div
                                                className="absolute inset-y-0 left-12 hidden items-center group-hover:flex group-hover:translate-x-[-50%]">
                                                <div
                                                    className="relative whitespace-nowrap rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                                                    <div className="absolute inset-0 -left-1 flex items-center">
                                                        <div className="h-2 w-2 rotate-45 bg-white"></div>
                                                    </div>
                                                    Xóa
                                                </div>
                                            </div>
                                        </button>

                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center py-3 px-5">Không có sản phẩm</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <DeleteModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleDelete}
                title="Xóa sản phẩm"
                description={`Bạn có muốn xóa sản phẩm ${selectedProduct?.product_name}?`}
            />
            <div className="flex justify-center mt-4">
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            </div>

        </div>
    );
};

ProductTable.propTypes = {
    products: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    fetchProducts: PropTypes.func.isRequired,
    productsPerPage: PropTypes.number.isRequired,
    searchTerm: PropTypes.string.isRequired,

};

export default ProductTable;
