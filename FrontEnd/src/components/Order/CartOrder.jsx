import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AddItemOrder} from "../index.jsx";
function CartOrder ({ cart ,handleRemove  }){
    const navigate = useNavigate();
    const [subTotal, setSubTotal] = useState(0);
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
        const total = cart.reduce((acc, item) => {
            return acc + (item.product_price * item.quantity);
        }, 0);
        setSubTotal(total);
    }, [cart]);
    const handleCheckout = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
        navigate("/order");
    };
    return (
        <>
            <div className="pointer-events-none sticky top-0">
                <div className="pointer-events-auto ">
                    <div className="flex h-full flex-col border border-gray-300 shadow-md shadow-gray-200 hover:shadow-2xl hover:shadow-gray-400 transition-shadow duration-300 rounded-lg overflow-y-scroll">
                        <div className="flex-1 overflow-y-auto py-6 sm:px-6">
                            <div className="flex justify-center ">
                                <div className="flex justify-center items-center">
                                    <img src="/icon/button-cart-100.png" className="h-8 w-8" alt="giỏ hàng"/>
                                    <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                                        Giỏ<strong> hàng</strong>
                                    </h2>

                                </div>
                            </div>

                            <div className="mt-8">
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {cart.map((item) => (
                                            <AddItemOrder
                                                key={item.product_id}
                                                title={item.product_name}
                                                product_id={item.product_id}
                                                price={formatCurrency(item.product_price)}
                                                image={item.thumbnail}
                                                quantity={item.quantity}
                                                onRemove={() => handleRemove(item.product_id)}
                                            />
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* đây là button mua hàng */}
                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p className="text-gray-500">Tạm tính</p>
                                <p>{formatCurrency(subTotal)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}
CartOrder.propTypes = {
    cart : PropTypes.array.isRequired,
    handleRemove: PropTypes.func.isRequired,
};
export default CartOrder;

