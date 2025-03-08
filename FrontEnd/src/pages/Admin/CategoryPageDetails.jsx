import {Search, CategoryTable, TableSkeleton} from '../../components/index.jsx';
import { useCategoryHook } from '../../hook';
import {useEffect, useState} from "react";
function CategoryPage() {
    const { categories , fetchCategories ,totalCatogories , loadingCategory , errorCategory } = useCategoryHook();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const categoriesPerPage = 5;
    const totalPages = Math.ceil(totalCatogories / categoriesPerPage);
    useEffect(() => {
        fetchCategories(currentPage, categoriesPerPage , searchTerm);
    }, [currentPage, categoriesPerPage,searchTerm]);
    const handleSearch = (term) => {
        setSearchTerm(term);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    if (loadingCategory) return <div><TableSkeleton/></div>;
    if (errorCategory) return <div>Error: {errorCategory}</div>;

    return (
        <>
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-4 ">
                    <div className="grid grid-cols-2 items-center gap-4 pt-6 px-6">
                        <div>
                            <h1 className="self-start text-3xl font-bold tracking-normal text-neutral-800 hover:scale-105 transform uppercase">
                                Quản lý danh mục
                            </h1>
                        </div>
                        <div className="flex justify-end">
                            <Search onSearch={handleSearch}/>
                        </div>
                    </div>

                </div>

                <div className="col-span-4">
                    <CategoryTable
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        searchTerm={searchTerm}
                        categories={categories}
                        fetchCategory={fetchCategories}
                        categoriesPerPage={categoriesPerPage}
                    />
                </div>
            </div>
        </>
    )
}

export default CategoryPage;
