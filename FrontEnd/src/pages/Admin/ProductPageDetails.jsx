import {ProductTable, Search, TableSkeleton} from '../../components/index.jsx';
import { useProductHook } from '../../hook';
import {useEffect, useState} from "react";
function ProductPage() {
    const { products = [], loading, error, totalProducts,fetchProducts} = useProductHook();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const productsPerPage = 5;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    useEffect(() => {
        fetchProducts(currentPage, productsPerPage , searchTerm);
    }, [currentPage, productsPerPage,searchTerm]);
    const handleSearch = (term) => {
        setSearchTerm(term);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    if (loading) return <div><TableSkeleton/></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-4 ">
                    <div className="grid grid-cols-2 items-center gap-4 pt-6 px-6">
                        <div>
                            <h1 className="self-start text-3xl font-bold tracking-normal text-neutral-800 hover:scale-105 transform uppercase">
                                Quản lý sản phẩm
                            </h1>
                        </div>
                        <div className="flex justify-end">
                            <Search onSearch={handleSearch}/>
                        </div>
                    </div>

                </div>

                <div className="col-span-4">
                    <ProductTable
                        products={products}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        fetchProducts={fetchProducts}
                        searchTerm={searchTerm}
                        productsPerPage = {productsPerPage}
                    />
                </div>
            </div>
        </>
    )
}

export default ProductPage;
