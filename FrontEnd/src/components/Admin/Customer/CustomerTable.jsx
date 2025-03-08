import PropTypes from 'prop-types';
import PaginationComponent from "../../Pagination/PaginationComponent.jsx";
import { useNavigate } from 'react-router-dom';
import {  useCustomerHook} from '../../../hook';
const CustomerTable = ({ customers, currentPage, totalPages, onPageChange ,fetchCustomers , customerPerPage , searchTerm }) => {
    const {loadingCustomer , errorCustomer } = useCustomerHook();
    const navigate = useNavigate();
    const openDetailCustomer = (customerId) => {
        navigate(`/admin/customer/details/${customerId}`);
    };
    const opendHistoryOrderCustomer = (customerId) =>{
        navigate(`/admin/customer/historyOrder/${customerId}`);
    }
    if (loadingCustomer) return <div>Loading...</div>;
    if (errorCustomer) return <div>Error: {errorCustomer}</div>;
    return (
        <div className="container w-full h-full p-6">
            <div className="overflow-x-auto">
                <div className="grid grid-cols-4 md:grid-cols-4 gap-4">
                    {customers.map((customer, index) => (
                        <div
                            key={index}
                            className="h-full w-60 p-4 border border-gray-200 shadow-xl shadow-gray-200 rounded-xl"
                        >
                            {/* Ảnh */}
                            <div className="flex justify-center items-center w-full">
                                <img
                                    className="h-14 w-14 max-w-full rounded-lg"
                                    src="/icon/customer-table.png"
                                    alt="Customer Icon"
                                />
                            </div>
                            {/* Thông tin khách hàng */}
                            <div className="w-full p-2 ">
                                <h2 className="text-lg font-semibold">
                                    Tên: {customer.customer_name}
                                </h2>
                                <p className="text-gray-600 truncate">Email: {customer.customer_email}</p>
                                <p className="text-gray-600">
                                    Sdt: {customer.customer_phone}
                                </p>
                            </div>
                            {/* Các nút */}
                            <div className="flex gap-4 justify-center items-center w-full">
                                <button
                                    className="w-14 h-14 flex justify-center items-center text-white hover:bg-blue-600 border border-gray-200 shadow-lg shadow-yellow-600 rounded-md group relative"
                                    onClick={() => opendHistoryOrderCustomer(customer.customer_id)}
                                >
                                    <img
                                        alt="History Icon"
                                        src="/icon/history-100.png"
                                        className="w-full h-full"
                                    />
                                    <div
                                        className="absolute z-10 p-2 inset-y-0 bottom-4 hidden items-center group-hover:flex"
                                    >
                                        <div
                                            className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                                            Lịch sử đơn hàng
                                        </div>
                                    </div>
                                </button>
                                <button
                                    className="w-14 h-14 flex justify-center items-center text-white hover:bg-yellow-300 border border-gray-200 shadow-lg shadow-yellow-600 rounded-md group relative"
                                    onClick={() => openDetailCustomer(customer.customer_id)}
                                >
                                    <img
                                        alt="Detail Icon"
                                        src="/icon/detail-100.png"
                                        className="w-full h-full"
                                    />
                                    <div
                                        className="absolute z-10 p-2 inset-y-0 left-14 hidden items-center group-hover:flex"
                                    >
                                        <div
                                            className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                                            Chi tiết
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

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

CustomerTable.propTypes = {
    customers: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    fetchCustomers: PropTypes.func.isRequired,
    customerPerPage: PropTypes.number.isRequired,
    searchTerm: PropTypes.string.isRequired,
};

export default CustomerTable;
