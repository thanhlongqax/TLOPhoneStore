import PropTypes from 'prop-types';
import PaginationComponent from "../../Pagination/PaginationComponent.jsx";
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../Modal/DeleteModal.jsx'
import { useCategoryHook } from '../../../hook';
import {notifyDeleteCategory} from "../../../../utils/index.jsx";
const OrderTable = ({ categories, currentPage, totalPages, onPageChange ,fetchCategory ,categoriesPerPage , searchTerm }) => {
    const { loadingCategory, errorCategory, deleteCategory } = useCategoryHook();
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();
    const openDeleteModal = (category) => {
        setSelectedCategory(category);
        setModalOpen(true);
    };
    const handleDelete = async () => {
        try {
            await deleteCategory(selectedCategory.category_id);
            setModalOpen(false);
            fetchCategory(currentPage,categoriesPerPage, searchTerm);
            notifyDeleteCategory()
        } catch (error) {
            console.error('Lỗi khi xóa danh mục:', error);
        }
    };
    const openAddCategoryPage = () => {
        navigate('/admin/category/addCategory');
    };
    const handleEditCategory = (categorieId) => {
        navigate(`/admin/category/editCategory/${categorieId}`);
    }
    if (loadingCategory) return <div>Loading...</div>;
    if (errorCategory) return <div>Error: {errorCategory}</div>;
    return (
        <div className="container w-full h-full p-6">
            <button
                onClick={openAddCategoryPage}
                className="flex items-center h-14 gap-2 p-6 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                <img src="/icon/add-100.png" className="w-12 h-12" alt="thêm danh mục"/>
                Thêm danh Mục
            </button>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="py-3 px-5 text-left">Tên danh mục</th>
                        <th className="py-3 px-5 text-left">Slug danh mục</th>
                        <th className="py-3 px-5 text-left">Mô tả danh mục</th>
                        <th className="py-3 px-5 text-center">Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.length > 0 ? (
                        categories.map((category, index) => (
                            <tr key={index} className="hover:bg-gray-50 border-b">
                                <td className="py-3 px-5">{category.category_name}</td>
                                <td className="py-3 px-5">{category.categorySlug}</td>
                                <td className="py-3 px-5">{category.description}</td>
                                <td className="flex justify-center gap-2 p-2">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            className="w-16 h-16 flex justify-center items-center text-black bg-white hover:bg-blue-600 border border-gray-200 shadow-md shadow-blue-400 px-2 py-1 rounded-md group relative"
                                            onClick={() => handleEditCategory(category.category_id)}
                                        >
                                            <img alt="Product Edit Icon" src="/icon/edit-100.png"
                                                 className="w-full h-full"
                                            />
                                            <div className="absolute z-10 p-4 inset-y-0 right-14 hidden items-center group-hover:flex">
                                                <div
                                                    className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                                                    Chỉnh sửa
                                                </div>
                                            </div>
                                        </button>
                                        <button
                                            className="w-16 h-16 flex justify-center items-center text-black bg-white hover:bg-red-600 border border-gray-200 shadow-lg shadow-red-500 px-2 py-1 rounded-md group relative"
                                            onClick={() => openDeleteModal(category)}
                                        >
                                            <img
                                                alt="Delete Icon"
                                                src="/icon/delete-100.png"
                                                className="w-full h-full"
                                            />
                                            <div
                                                className="absolute inset-y-0 left-12 p-6 hidden items-center group-hover:flex">
                                                <div
                                                    className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
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
                            <td colSpan="6" className="text-center py-3 px-5">Không có danh mục</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <DeleteModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleDelete}
                title="Xóa danh mục"
                description={`Bạn có muốn xóa danh mục ${selectedCategory?.category_name}?`}
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

OrderTable.propTypes = {
    categories: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    fetchCategory: PropTypes.func.isRequired,
    categoriesPerPage: PropTypes.number.isRequired,
    searchTerm: PropTypes.string.isRequired,
};

export default OrderTable;
