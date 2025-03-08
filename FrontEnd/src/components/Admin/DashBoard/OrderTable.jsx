import PropTypes from 'prop-types';
import PaginationComponent from "../../Pagination/PaginationComponent.jsx";
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";

const OrderTable = ({Orders, currentPage, totalPages, onPageChange ,type}) => {
    const navigate = useNavigate();
    const [orders , setOrders] = useState([]);
    useEffect(() => {
        if (Orders) {
            setOrders(Orders.orders);
        }
    }, [Orders]);
    const opendDetailOrder = (orderId) => {
        navigate(`/${type}/order/details/${orderId}`);
    }
    return (
        <div className="container">
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
                    {orders && orders.length > 0 ? (
                        orders.map((order) => (
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
                                            onClick={() => opendDetailOrder(order.order_id)}
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
                            <td colSpan="5" className="text-center p-6">
                                Không có đơn hàng nào trong thời gian trên
                            </td>
                        </tr>

                    )}
                    </tbody>


                </table>
            </div>
            <div className="flex justify-center p-4">
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
    Orders: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
};

export default OrderTable;
