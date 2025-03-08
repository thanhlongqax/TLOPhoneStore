import {useParams} from "react-router-dom";
import {useEffect, useState} from 'react'

import {useProductHook} from "../../../hook/index.jsx";

export default function ProductDetails() {
    const {id} = useParams();
    const {loading, error, getProductById, product} = useProductHook();

    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [currentPrice, setCurrentPrice] = useState(0);
    const [imagesUrl, setImagesUrl] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [shortDescription, setShortDescription] = useState('');
    const [promotionNote, setPromotionNote] = useState('');
    useEffect(() => {
        const fetchProductById = async (id) => {
            try {
                await getProductById(id);
            } catch (error) {
                console.error("Lỗi khi tải danh sách categories:", error);
            }
        };
        if (id) fetchProductById(id);
    }, [id]);
    useEffect(() => {
        if (product) {
            setProductName(product.product_name || "");
            setDescription(product.description || "");
            setCurrentPrice(product.product_price || "");
            setThumbnail(
                product.thumbnail
                    ? `${import.meta.env.VITE_BASE_URL}/images/${product.thumbnail}`
                    : null
            );
            setShortDescription(product.short_description || "");
            setPromotionNote(product.promotion_note || "");
            setImagesUrl(product.product_images || "");
        }
    }, [product]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="bg-white">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol role="list"
                        className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                            <li >
                                <div className="flex items-center">
                                    <a  className="mr-2 text-sm font-medium text-gray-900">
                                        Trang chủ
                                    </a >
                                    <a  className="mr-2 text-sm font-medium text-gray-900">
                                        \  Sản phẩm
                                    </a>
                                    <svg
                                        fill="currentColor"
                                        width={16}
                                        height={20}
                                        viewBox="0 0 16 20"
                                        aria-hidden="true"
                                        className="h-5 w-4 text-gray-300"
                                    >
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z"/>
                                    </svg>
                                </div>
                            </li>
                        <li className="text-sm">
                            <a aria-current="page"
                               className="font-medium text-gray-500 hover:text-gray-600">
                                {productName}
                            </a>
                        </li>
                    </ol>
                </nav>

                <div className="flex flex-col md:flex-row md:gap-8 p-6">
                    <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
                        <div className="grid grid-cols-1 gap-6 p-12">
                            {/* Hàng đầu tiên - 1 cột chính giữa */}
                            <div className="col-span-3 sm:col-span-1">
                                {/* Cột chính giữa */}
                                <div className="flex items-center justify-center border border-gray-300 rounded-md shadow-xl hover:shadow-2xl hover:scale-105 hover:shadow-gray-500">
                                    <img
                                        src={thumbnail}
                                        alt="Product"
                                        className="w-[400px] rounded-lg shadow-md" id="mainImage"/>
                                </div>
                            </div>

                            {/* Hàng thứ hai - 3 cột */}
                            <div className="col-span-3 sm:col-span-1">
                                <div className="grid grid-cols-5 gap-4 ">
                                    {imagesUrl.map((image, index) => {
                                        return (
                                            <div key={index} className="text-white flex items-center border border-gray-300 rounded-md shadow-xl hover:shadow-2xl hover:scale-125 hover:shadow-gray-500">
                                                <img
                                                    src={`${import.meta.env.VITE_BASE_URL}/images/${image}`}
                                                    className="size-full object-cover object-center"
                                                />
                                            </div>
                                        );
                                    })}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 space-y-6 mt-10 md:mt-0">
                        <div className="grid grid-cols-1 gap-6 p-12 px-50 pl-50 ml-50 ">
                            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{productName}</h1>
                            </div>

                            {/* Options */}
                            <div className="lg:row-span-3 lg:mt-0">
                                <h2 className="sr-only">Product information</h2>
                                <p className="text-3xl tracking-tight text-gray-900 hover:scale-105">Giá {currentPrice.toLocaleString('vi-VN')} đ</p>
                                <div className="mt-10">
                                    <h2 className="text-sm font-medium text-black">Khuyến mãi</h2>
                                    <div className="mt-4 space-y-6">
                                        <p
                                            className="text-sm text-gray-600"
                                            dangerouslySetInnerHTML={{__html: promotionNote}}
                                        ></p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product info */}
                <div className="flex flex-col bg-white md:flex-row md:gap-8 p-6 ">
                    <div
                        className="flex flex-col p-2 justify-center ">
                        {/* Description and details */}
                        <div>
                            <div className="space-y-6 p-6">
                                <p
                                    className="text-base text-black hover:shadow-2xl hover:scale-105 hover:shadow-gray-500 hover:p-4"
                                    dangerouslySetInnerHTML={{__html: shortDescription}}
                                ></p>

                            </div>
                        </div>
                        <div className="mt-10">
                            <h2 className="text-xl font-medium text-gray-900 px-4">Thông tin về sản phẩm </h2>
                            <div className="mt-4 space-y-6 p-6 ">
                                <p
                                    className="text-sm text-black"
                                    dangerouslySetInnerHTML={{__html: description}}
                                ></p>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};
