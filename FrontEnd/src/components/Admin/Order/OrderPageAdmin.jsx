import {Search, CustomerHistoryTable, TableSkeleton} from '../../../components/index.jsx';
import {useEffect, useState} from "react";
import { useCustomerHook }from "../../../hook";
import {useParams} from "react-router-dom";
function OrderPageAdmin() {
    const { id} = useParams();
    const { getHistoryOrderCustomerById , totalHistoryOrder , customerHistoryOrder , loadingCustomer , errorCustomer } = useCustomerHook();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const customerPerPages = 5;
    const totalPages = Math.ceil(totalHistoryOrder / customerPerPages);

    useEffect(() => {
        const fetchHistoryOrder = async () => {
            try {
                await getHistoryOrderCustomerById(id, currentPage, customerPerPages, searchTerm);
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            }
        };
        fetchHistoryOrder();
    }, [id, currentPage, customerPerPages, searchTerm]);

    const handleSearch = (term) => {
        setSearchTerm(term);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    if (loadingCustomer) return <div><TableSkeleton/></div>;
    if (errorCustomer) return <div>Error: {errorCustomer}</div>;
    return (
        <>
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-4 ">
                    <div className="grid grid-cols-2 items-center gap-4 pt-6 px-6">
                        <div>
                            <h1 className="text-xl font-bold ">Lịch sử đơn hàng</h1>
                        </div>
                        <div className="flex justify-end">
                            <Search onSearch={handleSearch}/>
                        </div>
                    </div>

                </div>

                <div className="col-span-4">
                    <CustomerHistoryTable
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        customerPerPages={customerPerPages}
                        searchTerm={searchTerm}
                        customerHistoryOrder={customerHistoryOrder}
                        getHistoryOrderCustomerById={getHistoryOrderCustomerById}
                        type="admin"
                    />
                </div>
            </div>
        </>
    )
}

export default OrderPageAdmin;
