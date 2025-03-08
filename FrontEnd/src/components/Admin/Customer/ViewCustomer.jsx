import {useCustomerHook} from "../../../hook/index.jsx";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
function ViewEmployee() {
    const navigate = useNavigate();
    const {id} = useParams();
    const {loadingCustomer , errorCustomer , getCustomerById ,customer } = useCustomerHook();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('không có dữ liệu');
    const [phone , setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [membership_level , setMembership_level] = useState('');
    const [points_balance , setPointsBalance] = useState('');
    const [last_purchase_date , setLast_purchase_date] = useState('');
    const [totalSpent , setTotalSpent] = useState('');

    useEffect(() => {
        const fetchEmployeeById = async () => {
            if (id) {
                await getCustomerById(id);
            }
        };

        fetchEmployeeById();
    }, [id, getCustomerById]);
    const formatDate = (date) => {
        if (date) {
            return new Date(date).toLocaleString('vi-VN', {
                timeZone: 'Asia/Ho_Chi_Minh',
                hour12: false,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).replace(',', '');
        } else {
            return 'Chưa có dữ liệu';
        }
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
    useEffect(() => {
        if (customer) {
            setFullName(customer.customer_name);
            setEmail(customer.email);
            setAddress(customer.customer_address)
            setPhone(customer.customer_phone)
            setLast_purchase_date(customer.last_purchase_date)
            setPointsBalance(customer.points_balance)
            setTotalSpent(customer.total_spent)
            setMembership_level(customer.membership_level)
        }
    }, [customer]);
    if (loadingCustomer) {
        return <div>Đang tải khách hàng ..</div>;
    }

    if (errorCustomer) {
        return <div>Lỗi: {errorCustomer}</div>;
    }
    if (!customer) {
        return <div>Không tìm thấy thông tin Khách hàng.</div>;
    }
    return (
        <>
            <div className="container mx-auto px-4 ">
                <div className="flex items-center px-12 py-12 sm:px-12  sm:py-12  rounded-md">
                    <nav aria-label="Breadcrumb" className="flex space-x-2">
                        <a href="/admin" className="text-gray-500 hover:text-indigo-600 text-sm font-medium">
                            Trang chủ
                        </a>
                        <span className="text-gray-400">/</span>
                        <a href="/admin/customer" className="text-gray-500 hover:text-indigo-600 text-sm font-medium">
                            khách hàng
                        </a>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 text-sm font-semibold">Khách hàng <strong>{fullName}</strong></span>
                    </nav>
                </div>

                <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">Chi tiết thông tin khách hàng</h2>

                <div
                    className="px-12 py-12 pb-12 mb-12 mt-8 sm:px-12   bg-white shadow-lg rounded-lg ">

                    <div className="flex space-x-6 w-full p-2">
                        {/* Left Column: Information */}
                        <div className="space-y-6 w-2/3">
                            <div className="flex flex-col space-y-4">
                                {/* Tên khách hàng */}
                                <div className="flex items-center">
                                    <img src="/icon/fullname-100.png" className="p-2"></img>
                                    <p className="font-medium text-gray-700 mr-2">Họ và tên khách hàng:</p>
                                    <strong>{fullName}</strong>
                                </div>
                                {/* Email khách hàng */}
                                <div className="flex items-center">
                                    <img src="/icon/gmail-100.png" className="p-2"/>
                                    <p className="font-medium text-gray-700 mr-2">Email:</p>
                                    <strong>{email ? email : 'Không có email'}</strong>
                                </div>
                                {/* Số điện thoại khách hàng */}
                                <div className="flex items-center">
                                    <img src="/icon/phone-100.png" className="p-2"/>
                                    <p className="font-medium text-gray-700 mr-2">SDT:</p>
                                    <strong>{phone}</strong>

                                </div>
                                {/* Địa chỉ khách hàng */}
                                <div className="flex items-center">
                                    <img src="/icon/address-100.png" className="p-2"/>
                                    <p className="font-medium text-gray-700 mr-2">Địa chỉ khách hàng:</p>
                                    <strong>{address}</strong>
                                </div>

                                {/* Mức độ thành viên */}
                                <div className="flex items-center">
                                    <img src="/icon/membership-100.png" className="p-2"/>
                                    <p className="font-medium text-gray-700 mr-2">Thành viên:</p>

                                    <button
                                        type="button"
                                        className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                    >
                                        <strong>{membership_level}</strong>
                                    </button>
                                </div>

                                {/* Điểm khách hàng */}
                                <div className="flex items-center">
                                    <img src="/icon/balance-symbol-100.png" className="p-2"/>
                                    <p className="font-medium text-gray-700 mr-2">Điểm tích lũy:</p>
                                    <strong>{points_balance}</strong>
                                    {/*{isHasPassword ? (*/}
                                    {/*    <button*/}
                                    {/*        type="button"*/}
                                    {/*        className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"*/}
                                    {/*    >*/}
                                    {/*        Đã có*/}
                                    {/*    </button>*/}
                                    {/*) : (*/}
                                    {/*    <button*/}
                                    {/*        type="button"*/}
                                    {/*        className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"*/}
                                    {/*    >*/}
                                    {/*        Chưa có*/}
                                    {/*    </button>*/}
                                    {/*)}*/}

                                </div>
                                {/* Tổng chi tiêu khách hàng */}
                                <div className="flex items-center">
                                    <img src="/icon/money-100.png" className="p-2"/>
                                    <p className="font-medium text-gray-700 mr-2">Tổng tiền mua hàng:</p>
                                    <strong>{formatCurrency(totalSpent)}</strong>
                                </div>
                                {/* Lần mua hàng gần nhất khách hàng */}
                                <div className="flex items-center">
                                    <img src="/icon/date-new-100.png" className="p-2"/>
                                    <p className="font-medium text-gray-700 mr-2">Lần mua hàng gần nhất:</p>
                                    <strong>{formatDate(last_purchase_date)}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 border border-gray-100"></div>
                    <div className="mt-6 pt-2 flex items-center justify-center gap-x-6">

                        <button
                            onClick={() => navigate(-1)}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Quay về
                        </button>
                    </div>
                </div>
            </div>
        </>

    )
}

export default ViewEmployee;