import {useCreateOrder, useCustomerHook ,useInvoice} from "../../hook/index.jsx";
import {useEffect, useState} from "react";
import {notifyAddOrder, notifyOrderMessage } from "../../../utils";
import {useNavigate} from "react-router-dom";
import {STATUS_CODES} from "../../constant/index.jsx";
import {addressService } from "../../service/index.jsx";
import {CartOrder, LoadingSkeleton} from "../index.jsx";

function OrderPage() {
    const navigate = useNavigate();
    const {loading, error, createOrder} = useCreateOrder();
    const {getCustomerByPhoneNumber} = useCustomerHook();
    const {fetchInvoice , loadingInvoice , errorInvoice} = useInvoice();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState(null);
    const [fullName, setFullName] = useState('');
    const [amount_paid, setAmount_paid] = useState('');
    const [refund_amount, setRefund_amount] = useState('');



    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");

    const [cart, setCart] = useState([]);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(cart);
        if (cart.length === 0) {
            notifyOrderMessage("Giỏ hàng trống! Vui lòng thêm sản phẩm.")
            navigate("/product");
        }
    }, [navigate]);

    const getNumericPhoneNumber = () => {
        return phoneNumber.replace(/\D/g, "");
    };

    const formatPhoneNumber = (value) => {
        const onlyNumbers = value.replace(/\D/g, "");
        const formatted = onlyNumbers.replace(/(\d{3})(?=\d)/g, "$1 ");
        return formatted.trim();
    };

    const formatMoney = (value) => {
        if (value === "") return "";
        return new Intl.NumberFormat("vi-VN").format(value);
    };

    const handleInputPhoneChange = (e) => {
        const formattedPhone = formatPhoneNumber(e.target.value);
        setPhoneNumber(formattedPhone);
    };

    const handleInputAmountChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, "");
        const numericValue = parseFloat(rawValue || "0");
        setAmount_paid(numericValue);
    };

    const handleInputRefundChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, "");
        const numericValue = parseFloat(rawValue || "0");
        setRefund_amount(numericValue);
    };

    const handlePhoneNumber = () => {
        if (phoneNumber && phoneNumber.length >= 10) {
            const findCustomerByPhone = async () => {
                try {
                    let phone = getNumericPhoneNumber(phoneNumber);
                    const response = await getCustomerByPhoneNumber(phone);
                    if (response.data && response.statusCode == STATUS_CODES.OK.code) {
                        setFullName(response.data.customer_name || '');
                        setAddress(response.data.customer_address || '');
                    } else if (response.statusCode == STATUS_CODES.NOT_FOUND.code) {
                        setFullName('');
                        setAddress('');
                    }
                } catch (err) {
                    console.error('Lỗi khi lấy thông tin khách hàng: ', err);
                }
            };
            findCustomerByPhone();
        } else {
            setFullName('');
            setAddress('');
        }
    }
    useEffect(() => {
        handlePhoneNumber()
    }, [phoneNumber]);

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const data = await addressService.getProvinces();
                setProvinces(data);
            } catch (error) {
                console.error("Error fetching provinces:", error);
            }
        };

        fetchProvinces();
    }, []);

    useEffect(() => {
        const fetchDistricts = async () => {
            if (selectedProvince) {
                try {
                    const respone = await addressService.getProvince(selectedProvince, 2);
                    setDistricts(respone.districts || "");
                } catch (error) {
                    console.error("Error fetching districts:", error);
                }
            } else {
                setDistricts([]);
                setWards([]);
            }
        };

        fetchDistricts();
    }, [selectedProvince]);

    useEffect(() => {
        const fetchWards = async () => {
            if (selectedDistrict) {
                try {
                    const data = await addressService.getDistrict(selectedDistrict, 2)
                    setWards(data.wards || "");
                } catch (error) {
                    console.error("Error fetching wards:", error);
                }
            } else {
                setWards([]);
            }
        };

        fetchWards();
    }, [selectedDistrict])

    const handleAmountPaid = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            return notifyOrderMessage("Giỏ hàng trống! Không thể tạo đơn hàng. Quay lại trang mua hàng");
        }
        const totalPrice = cart.reduce((acc, item) => {
            const itemPrice = item.product_price * item.quantity;
            return acc + itemPrice;
        }, 0)
        if ((amount_paid - totalPrice) < 0) {
            return notifyOrderMessage(`Tiền nhận vào bị thiếu là ${formatCurrency((amount_paid - totalPrice))}`);
        }
        setRefund_amount((amount_paid - totalPrice));
    }

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
    const handleSubmit = async (e) => {
        e.preventDefault()
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            return notifyOrderMessage("Giỏ hàng trống! Không thể tạo đơn hàng. Quay lại trang mua hàng");
        }
        if (!phoneNumber) {
            return notifyOrderMessage("Vui lòng nhập số điện thoại");
        }
        if (!amount_paid) {
            return notifyOrderMessage("Vui lòng nhập số tiền nhận từ khách hàng");
        }
        const orderItems = cart.map(item => ({
            quantity: item.quantity,
            product: {product_id: item.product_id}
        }));
        const totalPrice = cart.reduce((acc, item) => {
            const itemPrice = item.product_price * item.quantity;
            return acc + itemPrice;
        }, 0);
        if ((amount_paid - totalPrice) < 0) {
            return notifyOrderMessage(`Tiền nhận vào bị thiếu là ${formatCurrency((amount_paid - totalPrice))}`);
        } else if (refund_amount != (amount_paid - totalPrice)) {
            return notifyOrderMessage(`Tiền hoàn lại sai không đúng phải là ${formatCurrency((amount_paid - totalPrice))}`);
        }
        const order = {
            orderItems: orderItems,
        };
        const Province = await addressService.getProvince(selectedProvince)
        const District = await addressService.getDistrict(selectedDistrict)
        const Ward = await addressService.getWard(selectedWard)
        const customer = {
            customer_phone: getNumericPhoneNumber(phoneNumber),
            customer_name: fullName,
            customer_address: address || `${Ward.name}  ${District.name} ${Province.name} `
        };

        const orderDataToSend = {
            order: order,
            customer: customer,
            amount_paid: amount_paid,
            refund_amount: refund_amount
        };

        const respone = await createOrder(orderDataToSend);

        if (respone?.statusCode === STATUS_CODES.BAD_REQUEST.code) {
            notifyOrderMessage(`Tạo đơn hàng không thành công`);
        } else if (respone?.statusCode === STATUS_CODES.OK.code) {
            notifyAddOrder();
            localStorage.removeItem('cart');
            await fetchInvoice(respone.data.order_id);
            navigate("/product");
        }
    };
    const handleRemove = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.product_id !== id));
    };
    if (loading) {
        return <div><LoadingSkeleton/></div>;
    }

    if (error) {
        return <div>Lỗi: {error}</div>;
    }
    return (
        <>
            <div className="">
                <div className="flex p-2  rounded-md">
                    <nav aria-label="Breadcrumb" className="flex space-x-2">
                        <a href="/product" className="text-gray-500 hover:text-blue-600 text-sm font-medium">
                            Sản phẩm
                        </a>
                        <span className="text-gray-900 text-sm font-semibold">/ Chi tiết mua hàng</span>
                    </nav>
                </div>
                <h1 className="justify-center text-4xl font-semibold text-center text-gray-900 ">Thanh <strong className="text-blue-600">Toán</strong></h1>
                <div className="grid grid-cols-3 gap-8 mt-8">
                    <div className="col-span-2 ">
                        <form
                            className="pb-12 mb-12 border border-gray-200 bg-white shadow-lg hover:shadow-2xl hover:shadow-gray-400 transition-shadow duration-300 rounded-lg"
                            onSubmit={handleSubmit}>
                            <h2 className="text-base/7 font-semibold text-gray-900 p-6">Vui lòng nhập thông tin
                                khách hàng</h2>
                            <div className="grid grid-cols-2 w-full p-4">
                                {/* Cột trái  */}
                                <div className="space-y-4 w-full p-2">
                                    <div className="grid grid-rows-3 gap-x-6 gap-y-8">
                                        {/* SDT */}
                                        <div className="row">
                                            <label htmlFor="phone_number"
                                                   className="flex items-center text-sm/6 font-medium text-gray-900">
                                                <img className="h-8 w-8 object-cover flex" src="/icon/phone-100.png" alt="phone"/>
                                                Số điện thoại

                                            </label>
                                            <div className="mt-2">
                                                <div
                                                    className="flex p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                    <input
                                                        id="phone_number"
                                                        name="phone_number"
                                                        type="text"
                                                        value={phoneNumber}
                                                        onChange={handleInputPhoneChange}
                                                        onBlur={handlePhoneNumber}
                                                        placeholder="Vui lòng nhập số điện thoại khách hàng"
                                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Số tiền nhận */}
                                        <div className="row">
                                            <label htmlFor="Moneyin"
                                                   className="flex items-center text-sm/6 font-medium text-gray-900">
                                                <img className="h-8 w-8 object-cover flex" src="/icon/newmoney-100.png"
                                                     alt="Số điện thoại"/>
                                                Số tiền khách đưa
                                            </label>
                                            <div className="mt-2">
                                            <div
                                                    className="flex items-center p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                    <input
                                                        id="Moneyin"
                                                        name="Moneyin"
                                                        type="text"
                                                        value={formatMoney(amount_paid)}
                                                        onChange={handleInputAmountChange}
                                                        onBlur={handleAmountPaid}
                                                        placeholder="Nhập số tiền nhận"
                                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                                    />
                                                    .VND
                                                </div>
                                            </div>
                                        </div>

                                        {/* Số tiền hoàn trả */}
                                        <div className="row">
                                            <label htmlFor="Moneyout"
                                                   className="flex items-center text-sm/6 font-medium text-gray-900">
                                                <img className="h-8 w-8 object-cover flex" src="/icon/newmoney-100.png"
                                                     alt="Số điện thoại"/>
                                                Số tiền hoàn cho khách
                                            </label>
                                            <div className="mt-2">
                                                <div
                                                    className="flex items-center p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                    <input
                                                        id="Moneyout"
                                                        name="Moneyout"
                                                        type="text"
                                                        value={formatMoney(refund_amount)}
                                                        onChange={handleInputRefundChange}
                                                        placeholder="Nhập số tiền hoàn trả"
                                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                                    />
                                                    .VND
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Right Column*/}
                                <div className="space-y-4 w-full p-2">
                                    <div className="grid grid-rows-3 gap-x-6 gap-y-8">
                                        {/* Họ và tên khách hàng */}
                                        <div className="row">
                                            <label htmlFor="fullName"
                                                   className="flex items-center text-sm/6 font-medium text-gray-900">
                                                <img className="h-8 w-8 object-cover flex" src="/icon/account-50.png"
                                                     alt="tên khách hàng "/>
                                                Họ và tên khách hàng
                                            </label>
                                            <div className="mt-2">
                                                <div
                                                    className="flex p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                    <input
                                                        id="fullName"
                                                        name="fullName"
                                                        type="text"
                                                        value={fullName}
                                                        onChange={(e) => setFullName(e.target.value)}
                                                        placeholder="Vui lòng nhập họ và tên khách hàng"
                                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Địa chỉ khách hàng */}
                                        <div className="row-span-3 ">
                                            <label htmlFor="address"
                                                   className="flex items-center text-sm/6 font-medium text-gray-900 p-1">
                                                <img className="h-8 w-8 object-cover flex" src="/icon/address-100.png"
                                                     alt="Địa chỉ khách hàng"/>
                                                Địa chỉ khách hàng
                                            </label>
                                            {address ? (
                                                <div className="">
                                                <div className="">
                                                        <textarea
                                                            id="address"
                                                            name="address"
                                                            rows={3}
                                                            value={address}
                                                            onChange={(e) => setAddress(e.target.value)}
                                                            placeholder="Vui lòng nhập mô tả danh mục  "
                                                            className="block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                                        />
                                                    </div>
                                                </div>
                                            ) : (

                                                <div className="grid grid-cols-2 gap-x-2 gap-y-16 ">
                                                    <div className="flex h-full border border-gray-300 items-center rounded-md hover:bg-gray-50">
                                                        <select
                                                            value={selectedProvince}
                                                            onChange={(e) => setSelectedProvince(e.target.value)}
                                                            className="w-full h-full border border-gray-300 rounded-md"
                                                        >
                                                            <option value="">Chọn tỉnh/thành phố</option>
                                                            {provinces.map((province) => (
                                                                <option key={province.code} value={province.code}>
                                                                    {province.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div className="flex h-full items-center border border-gray-300 rounded-md hover:bg-gray-50">
                                                        <select
                                                            value={selectedDistrict}
                                                            onChange={(e) => setSelectedDistrict(e.target.value)}
                                                            className="w-full h-full py-3 border border-gray-300 rounded-md"
                                                            disabled={!selectedProvince}
                                                        >

                                                            <option value="">Chọn quận/huyện</option>
                                                            {districts && districts.length > 0 ? (
                                                                districts.map((district) => (
                                                                    <option key={district.code} value={district.code}>
                                                                        {district.name}
                                                                    </option>
                                                                ))
                                                            ) : (
                                                                <option disabled>Không có quận/huyện</option>
                                                            )}
                                                        </select>
                                                    </div>

                                                    <div className="flex  my-1.5 items-center border border-gray-300 rounded-md hover:bg-gray-50">
                                                        <select
                                                            value={selectedWard}
                                                            onChange={(e) => setSelectedWard(e.target.value)}
                                                            className=" w-full h-full py-3.5 border border-gray-300 rounded-md"
                                                            disabled={!selectedDistrict}
                                                        >
                                                            <option value="">Chọn phường/xã</option>
                                                            {wards.map((ward) => (
                                                                <option key={ward.code} value={ward.code}>
                                                                    {ward.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                </div>
                                            )}
                                        </div>

                                    </div>

                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-x-6 border-t border-gray-200 p-6">
                                <button type="button"
                                        onClick={() =>{
                                            localStorage.removeItem("cart")
                                            navigate("/product")
                                        }}
                                        className="text-sm/6 font-semibold text-gray-900 border border-gray-200 rounded-md px-3 py-2">
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus-visible:outline px-6 py-3 text-base font-medium text-white shadow-sm"
                                >
                                    Xác nhận
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-span-1 ">
                        <CartOrder
                            cart={cart}
                            handleRemove={handleRemove}
                        />
                    </div>

                </div>


            </div>
        </>

    )
}

export default OrderPage;