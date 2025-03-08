import PropTypes from 'prop-types';
import PaginationComponent from "../../Pagination/PaginationComponent.jsx";
import {useNavigate} from 'react-router-dom';

const CustomerHistoryTable = ({ customerHistoryOrder, currentPage, totalPages, onPageChange , type }) => {
    const navigate = useNavigate();
    const openOrderDetails = (orderId) =>{
        navigate(`/${type}/order/details/${orderId}`);
    }
    if (!customerHistoryOrder || customerHistoryOrder.length === 0) {
        return <div className="p-6 text-xl">Không có đơn hàng nào.</div>;
    }
    return (
        <div className="container w-full h-full p-6">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="py-3 px-5 text-left">Mã vận đơn</th>
                        <th className="py-3 px-5 text-left">Ngày đặt hàng</th>
                        <th className="py-3 px-5 text-left">tổng tiền</th>
                        <th className="py-3 px-5 text-center">Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(customerHistoryOrder) && customerHistoryOrder.length > 0 ? (
                        customerHistoryOrder.map((order) => (
                            <tr key={order.order_id} className="hover:bg-gray-50 border-b">
                                {/* Hiển thị thông tin đơn hàng */}
                                <td className="py-3 px-5">{order.order_id}</td>
                                <td className="py-3 px-5">{order.order_date}</td>
                                <td className="py-3 px-5">{order.total_price.toLocaleString()} VND</td>

                                {/* Cột hành động */}
                                <td className="flex justify-center gap-2 p-2">
                                    <div className="flex justify-center gap-2">
                                        {/* Button Chỉnh sửa */}
                                        <button
                                            className="w-20 h-20 flex justify-center items-center text-black bg-white hover:bg-yellow-300 border border-gray-200 shadow-md shadow-blue-400 px-2 py-1 rounded-md group relative"
                                            onClick={() => openOrderDetails(order.order_id)}
                                        >
                                            <img alt="Edit Icon" src="/icon/detail-100.png" className="w-full h-full"/>
                                            <div
                                                className="absolute z-10 p-4 inset-y-0 right-14 hidden items-center group-hover:flex">
                                                <div
                                                    className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                                                    Xem chi tiết
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center py-3 px-5">
                                Không có đơn hàng nào cho khách hàng này
                            </td>
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

CustomerHistoryTable.propTypes = {
    customerHistoryOrder: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    getHistoryOrderCustomerById: PropTypes.func.isRequired,
};

export default CustomerHistoryTable;
