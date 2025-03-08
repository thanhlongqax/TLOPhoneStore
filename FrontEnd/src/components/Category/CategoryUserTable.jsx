import PropTypes from 'prop-types';
import PaginationComponent from "../Pagination/PaginationComponent.jsx";
import { useCategoryHook } from '../../hook';
import {TableSkeleton} from "../index.jsx";
const CategoryUserTable = ({ categories, currentPage, totalPages, onPageChange  }) => {
    const { loadingCategory, errorCategory } = useCategoryHook();
    if (loadingCategory) return <div>
        <TableSkeleton/>
    </div>;
    if (errorCategory) return <div>Error: {errorCategory}</div>;
    return (
        <div className="container w-full h-full p-6">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="py-3 px-5 text-left">Tên danh mục</th>
                        <th className="py-3 px-5 text-left">Slug danh mục</th>
                        <th className="py-3 px-5 text-left">Mô tả danh mục</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.length > 0 ? (
                        categories.map((category, index) => (
                            <tr key={index} className="hover:bg-gray-50 border-b">
                                <td className="py-3 px-5">{category.category_name}</td>
                                <td className="py-3 px-5">{category.categorySlug}</td>
                                <td className="py-3 px-5">{category.description}</td>
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

CategoryUserTable.propTypes = {
    categories: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    fetchCategory: PropTypes.func.isRequired,
    categoriesPerPage: PropTypes.number.isRequired,
    searchTerm: PropTypes.string.isRequired,
};

export default CategoryUserTable;
