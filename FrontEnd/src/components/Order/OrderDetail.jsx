import {useNavigate, useParams} from "react-router-dom";
import {useOrder} from "../../hook/index.jsx";
import {useEffect, useState} from "react";

function OrderDetail() {
    const navigate = useNavigate();
    const {id} = useParams();
    const {loadingOrder , errorOrder , getOrderById } = useOrder();
    const [name, setName] = useState("");
    const [customer, setCustomer] = useState("");
    const [products, setProducts] = useState([]);
    const [order , setOrder] = useState({});

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('vi-VN').format(date);
    };
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
    const fetchData = async () => {
        const response = await getOrderById(id);
        if(response){
            setName(response.customer.customer_name)
            setCustomer(response.customer)
            const orderItems = response.orderItems;
            const products = orderItems.map(item => item.product);
            setOrder(response)
            setProducts(products);
        }

    }
    useEffect(() => {
        if(id){
            fetchData()
        }
    },[id])

    if (loadingOrder) {
        return <div>Đang thêm sản phẩm...</div>;
    }

    if (errorOrder) {
        return <div>Lỗi: {errorOrder}</div>;
    }

    return (
        <>
            <div className="container mx-auto px-4 ">
                <div className="flex items-center px-12 py-12 sm:px-12 sm:py-12 rounded-md">
                    <nav aria-label="Breadcrumb" className="flex space-x-2">
                        <a href="/" className="text-gray-500 hover:text-indigo-600 text-sm font-medium">
                            Trang chủ
                        </a>
                        <span className="text-gray-400">/</span>
                        <a className="text-gray-500 hover:text-indigo-600 text-sm font-medium">
                            đơn hàng
                        </a>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 text-sm font-semibold">Chi tiết</span>
                    </nav>
                </div>

                <h1 className="self-start text-center text-3xl font-bold tracking-normal text-neutral-800 hover:scale-105 transform uppercase">
                    Chi tiết đơn hàng
                </h1>

                <div
                    className="px-12 py-12 pb-12 mb-12 mt-8 sm:px-12 border border-blue-50 bg-white shadow-lg rounded-lg hover:shadow-xl hover:shadow-gray-400">
                    <div className="flex space-x-4 w-full p-2 ">
                        <div className="space-y-4 w-1/2">
                            <div className="flex items-center">
                                <img src="/Admin/Dashboard/received.png" className="p-2 h-20 w-20"></img>
                                <p className="font-medium text-gray-700 mr-2">Mã vận đơn:</p>
                                <strong>{order.order_id}</strong>
                            </div>
                            <div className="flex items-center">
                                <img src="/icon/price-100.png" className="p-2 h-20 w-20"></img>
                                <p className="font-medium text-gray-700 mr-2">Tổng tiền:</p>
                                <strong>{formatCurrency(order.total_price)}</strong>
                            </div>
                            <div className="flex items-center">
                                <img src="/icon/date-new-100.png" className="p-2 h-20 w-20"></img>
                                <p className="font-medium text-gray-700 mr-2">Ngày mua hàng:</p>
                                <strong>{order.order_date ? formatDate(order.order_date) : 'Không có dữ liệu'}
                                </strong>
                            </div>

                        </div>

                        <div className="pl-4 space-y-4 w-1/2 ml-4">
                            <div className="col-span-full">

                                <div className="flex items-center">
                                    <img src="/icon/fullname-100.png" className="p-2 h-20 w-20"></img>
                                    <p className="font-medium text-gray-700 mr-2">Tên khác hàng:</p>
                                    <strong>{name}</strong>
                                </div>
                                <div className="flex items-center">
                                    <img src="/icon/phone-100.png" className="p-2 h-20 w-20"></img>
                                    <p className="font-medium text-gray-700 mr-2">Số điện thoại:</p>
                                    <strong>{customer.customer_phone}</strong>
                                </div>
                                <div className="flex items-center">
                                    <img src="/icon/address-100.png" className="p-2 h-20 w-20"></img>
                                    <p className="font-medium text-gray-700 mr-2"></p>
                                    <strong>{customer.customer_address}</strong>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="flex w-full justify-center">
                        <div className="space-y ">
                            <div className="pb-12">
                                <div className="mt-10 ">
                                    {/* Table sản phẩm */}
                                    <div className="w-full">
                                        <table className="bg-white border border-gray-300">
                                            <thead>
                                            <tr className="bg-gray-100 border-b">
                                                <th className="py-3 px-5 text-left">Tên sản phẩm</th>
                                                <th className="py-3 px-5 text-left">Hình ảnh</th>
                                                <th className="py-3 px-5 text-left">Mô tả</th>
                                                <th className="py-3 px-5 text-left">Đơn giá</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {products && products.length > 0 ? (
                                                products.map((product, index) => {
                                                    return (
                                                        <tr key={index} className="hover:bg-gray-50 border-b">
                                                            <td className="py-3 px-5">
                                                                <img
                                                                    src={`${import.meta.env.VITE_BASE_URL}/images/${product.thumbnail}`}
                                                                    alt={`Thumbnail ${product.product_name}`}
                                                                    className="w-16 h-16 object-cover rounded"
                                                                />
                                                            </td>
                                                            <td className="py-3 px-5">{product.product_name}</td>
                                                            <td className="py-3 px-5 truncate max-w-28"
                                                                title={product.short_description}>
                                                                {product.short_description}
                                                            </td>
                                                            <td className="py-3 px-5">{formatCurrency(product.product_price)}</td>
                                                        </tr>
                                                    );
                                                })
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="text-center py-3 px-5">Không có sản
                                                        phẩm
                                                    </td>
                                                </tr>
                                            )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 border-t flex items-center justify-center p-4 gap-x-6">
                        <button
                            type="button"
                            onClick={() =>{
                                navigate("/")
                            }}
                            className="rounded-md bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl hover:shadow-2xl hover:scale-125 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline "
                        >
                            Quay về trang chủ
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderDetail;
