import {Search, CustomerTable, TableSkeleton} from '../../components/index.jsx';
import {useEffect, useState} from "react";
import { useCustomerHook }from "../../hook";
function CustomerPage() {

    const {customers ,fetchCustomers ,totalCustomers , loadingCustomer , errorCustomer } = useCustomerHook()
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const customerPerPages = 8;
    const totalPages = Math.ceil(totalCustomers / customerPerPages);
    useEffect(() => {
        fetchCustomers(currentPage, customerPerPages , searchTerm);
    }, [currentPage, customerPerPages,searchTerm]);
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
                            <h1 className="self-start text-3xl font-bold tracking-normal text-neutral-800 hover:scale-105 transform uppercase">
                                Quản lý khách hàng
                            </h1>
                        </div>
                        <div className="flex justify-end">
                            <Search onSearch={handleSearch}/>
                        </div>
                    </div>

                </div>

                <div className="col-span-4">
                    <CustomerTable
                        customers={customers}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        fetchCustomers={fetchCustomers}
                        customerPerPage={customerPerPages}
                        searchTerm={searchTerm}

                    />
                </div>
            </div>
        </>
    )
}

export default CustomerPage;
