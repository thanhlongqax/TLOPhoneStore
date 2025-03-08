import {CartComponent, Pagination, TableSkeleton, UserSearch} from '../../components/index.jsx';
import {useProductHook} from '../../hook';
import {useEffect, useState} from "react";

function ProductUserPage() {
    const {products = [], totalProducts, fetchProducts ,loading } = useProductHook();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const productsPerPage = 6;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const [cart, setCart] = useState([]);
    const [quantities, setQuantities] = useState({});
    useEffect(() => {
        fetchProducts(currentPage, productsPerPage, searchTerm);
    }, [currentPage, productsPerPage, searchTerm]);
    const handleSearch = (term) => {
        setSearchTerm(term);
    }

    const increment = (id) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1,
        }));
    };

    const decrement = (id) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max((prev[id] || 1) - 1, 1),
        }));
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
    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    const addCart = (product) => {
        const productQuantity = quantities[product.product_id] || 1;

        setCart((prevCart) => {
            const existingProductIndex = prevCart.findIndex(
                (item) => item.product_id === product.product_id
            );

            if (existingProductIndex !== -1) {
                return prevCart.map((item, index) => {
                    if (index === existingProductIndex) {
                        return {
                            ...item,
                            quantity: item.quantity + productQuantity,
                        };
                    }
                    return item;
                });
                ;
            } else {
                return [...prevCart, {...product, quantity: productQuantity}];
            }
        });


    }
    const handleRemove = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.product_id !== id));
    };
    useEffect(() => {
        if (searchTerm) {
            const matchingProductName = products.find(product =>
                product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            const matchingProductBarcode = products.find(product =>
                product.barcode.toLowerCase().includes(searchTerm.toLowerCase())
            );
            if (matchingProductName) {
                addCart(matchingProductName);
            } else if (matchingProductBarcode) {
                addCart(matchingProductBarcode);
            }
        }
    }, [searchTerm, products]);
    if (loading) return <div><TableSkeleton/></div>;
    return (
        <>
            <div className="grid grid-cols-3 gap-4 p-2 min-h-screen border border-gray-100 shadow-2xl shadow-gray300 ">
                <div className="col-span-4">
                    <div className="grid grid-cols-2 items-center gap-4 pt-6 px-6">
                        <div>
                            <h1 className="self-start text-3xl font-bold tracking-normal text-neutral-800 hover:scale-105 transform uppercase">
                                Sản phẩm
                            </h1>
                        </div>
                        <div className="flex justify-end">
                            <UserSearch onSearch={handleSearch}/>
                        </div>
                    </div>

                </div>
                <div className="col-span-2">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ">
                        {products.map((product) => (
                            <div key={product.product_id}
                                 className="p-4 justify-items-center items-center shadow-md shadow-gray-200 border border-gray-200  hover:shadow-2xl hover:shadow-gray-400 transition-shadow duration-300 rounded-lg bg-white">

                                <img className="max-h-40 w-full object-cover rounded-lg"
                                     src={`${import.meta.env.VITE_BASE_URL}/images/${product.thumbnail}`}
                                     alt={product.product_name}/>
                                <p className="p-2">{product.product_name}</p>
                                <p className="">{formatCurrency(product.product_price)}</p>
                                <div className="flex items-center gap-2 p-2">
                                    {/* Decrement Button */}
                                    <button
                                        onClick={() => decrement(product.product_id)}
                                        className="px-3 py-1 text-black border border-gray-300 hover:bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md focus:ring focus:ring-gray-300"
                                    >
                                        -
                                    </button>
                                    <div
                                        className="px-4 py-1 border border-gray-300 rounded-md bg-white text-gray-700">
                                        {quantities[product.product_id] || 1}
                                    </div>

                                    <button
                                        onClick={() => increment(product.product_id)}
                                        className="px-3 py-1 text-black bg-white border border-gray-300 hover:bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md focus:ring focus:ring-blue-300"
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="">
                                    <button type="button"
                                            onClick={() => addCart(product)}
                                            className="flex items-center gap-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-3.5 py-0.5 text-center me-2 mb-2">

                                        <img src="/icon/cart-100.png"
                                             className="max-h-16 w-14 object-cover rounded-lg"/>
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>

                            </div>
                        ))}

                    </div>
                    <div className="flex items-center justify-center p-6">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}

                        />
                    </div>
                </div>

                <div className="col-span-1 max-h-[810px] grid grid-cols-1 grid-rows-2 overflow-y-auto">
                    <div className="max-w-2xl lg:max-w-7xl max-h-[400px] ">
                        <CartComponent
                            cart={cart}
                            handleRemove={handleRemove}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductUserPage;
