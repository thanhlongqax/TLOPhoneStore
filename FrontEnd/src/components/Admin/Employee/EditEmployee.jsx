import {  UserCircleIcon } from '@heroicons/react/24/solid'
import {useProductHook , useCategoryHook} from "../../../hook/index.jsx";
import {useEffect, useState} from "react";
import { imageService } from "../../../service"
import { notifyAddProduct } from "../../../../utils";
import {useNavigate} from "react-router-dom";
function EditEmployee() {
    const navigate = useNavigate();
    const { loading, error, addProduct } = useProductHook();
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [productPrice , setProductPrice] = useState('');
    const [images, setImages] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [selectedThumbnail, setSelectedThumbnail] = useState(null);
    const [category, setCategory] = useState('');
    const [barCode , setBarCode] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [promotionNote , setPromotionNote] = useState('');
    const [productSlug , setProductSlug] = useState('');
    const { loadingCategory , errorCategory , categories = [] , getAllCategories } = useCategoryHook();
    const keywords = {
        iphone: "iphone",
        samsung: "samsung",
        macbook: "macbook",
        laptop: "laptop",
        accessory: "phu-kien",
    };
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                await getAllCategories()
            } catch (error) {
                console.error("Lỗi khi tải danh sách categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        files.forEach(file => {
            const reader = new FileReader();;
            reader.onloadend = () => {
                setImages(prevImages => [...prevImages, { file, preview: reader.result, name: file.name }]);
            };

            reader.readAsDataURL(file);
        });
    };

    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };
    const handleThumbnailChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setThumbnail(reader.result);
        };
        reader.readAsDataURL(file);
        setSelectedThumbnail(file);

    };
    const uploadImages = async () => {
        const imageUrls = [];
        let thumbnailUrl = "";
        try {
            if (selectedThumbnail) {
                let folderName = selectedThumbnail.name.toLowerCase();
                for (const [key, value] of Object.entries(keywords)) {
                    if (folderName.includes(key)) {
                        folderName = value;
                        break;
                    }
                    else{
                        folderName = "chuaphanloai";
                    }
                }
                const thumbnailResponse = await imageService.uploadImage(folderName, selectedThumbnail);
                thumbnailUrl = thumbnailResponse.url;
            }

            for (const image of images) {
                let folderName = image.name.toLowerCase();
                for (const [key, value] of Object.entries(keywords)) {
                    if (folderName.includes(key)) {
                        folderName = value;
                        break;
                    }
                    else{
                        folderName = "chuaphanloai";
                    }
                }
                if (folderName === image.name.toLowerCase()) {
                    folderName = image.name;
                }
                const response = await imageService.uploadImage(folderName, image.file);
                imageUrls.push(response.url);
            }
        }
        catch (error) {
            console.error(error);
        }

        return { imageUrls, thumbnailUrl };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { imageUrls, thumbnailUrl } = await uploadImages();
        const Product = {
            product_name : productName,
            product_price : productPrice,
            product_slug : productSlug,
            barcode : barCode,
            thumbnail : thumbnailUrl,
            promotion_note : promotionNote,
            description : description,
            short_description : shortDescription,
            product_images : imageUrls,
            categoryId : category,
        }
        await addProduct(Product);
        notifyAddProduct();
        navigate("/admin/product");

    };
    if (loadingCategory) {
        return <div>Đang tải danh mục...</div>;
    }

    if (errorCategory) {
        return <div>Lỗi: {errorCategory}</div>;
    }
    if (loading) {
        return <div>Đang thêm sản phẩm...</div>;
    }

    if (error) {
        return <div>Lỗi: {error}</div>;
    }

    return (
        <>
            <div className="container mx-auto px-4">
                <div className="flex items-center px-12 py-12 sm:px-12  sm:py-12  rounded-md">
                    <nav aria-label="Breadcrumb" className="flex space-x-2">
                        <a href="/admin" className="text-gray-500 hover:text-indigo-600 text-sm font-medium">
                            Trang chủ
                        </a>
                        <span className="text-gray-400">/</span>
                        <a href="/admin/product" className="text-gray-500 hover:text-indigo-600 text-sm font-medium">
                            Sản phẩm
                        </a>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 text-sm font-semibold">Thêm sản phẩm</span>
                    </nav>
                </div>

                <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">Thêm sản phẩm</h2>

                <form className="px-12 py-12 pb-12 mb-12 mt-8 sm:px-12  sm:py-12  bg-white shadow-lg rounded-lg" onSubmit={handleSubmit}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base/7 font-semibold text-gray-900">Thêm sản phẩm </h2>
                            <p className="mt-1 text-sm/6 text-gray-600">
                                Vui lòng nhập thông tin về thêm sản phẩm mới
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                {/* Tên sản phẩm */}
                                <div className="sm:col-span-4">
                                    <label htmlFor="product_name" className="block text-sm/6 font-medium text-gray-900">
                                        Tên sản phẩm
                                    </label>
                                    <div className="mt-2">
                                        <div
                                            className="flex p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                id="product_name"
                                                name="product_name"
                                                type="text"
                                                value={productName}
                                                onChange={(e) => setProductName(e.target.value)}
                                                placeholder="Vui lòng nhập tên sản phẩm"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Mã barcode sản phẩm */}
                                <div className="sm:col-span-4">
                                    <label htmlFor="barcode"
                                           className="block text-sm/6 font-medium text-gray-900">
                                        Mã Barcode sản phẩm
                                    </label>
                                    <div className="mt-2">
                                        <div
                                            className="flex p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                id="barcode"
                                                name="barcode"
                                                type="text"
                                                value={barCode}
                                                onChange={(e) => setBarCode(e.target.value)}
                                                placeholder="Vui lòng nhập tên sản phẩm"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Giá sản phẩm */}
                                <div className="sm:col-span-4">
                                    <label htmlFor="product_price"
                                           className="block text-sm/6 font-medium text-gray-900">
                                        Giá sản phẩm
                                    </label>
                                    <div className="mt-2">
                                        <div
                                            className="flex p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                id="product_price"
                                                name="product_price"
                                                type="number"
                                                value={productPrice}
                                                onChange={(e) => setProductPrice(e.target.value)}
                                                placeholder="Vui lòng nhập tên sản phẩm"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Url / slug sản phẩm */}
                                <div className="sm:col-span-4">
                                    <label htmlFor="product_slug"
                                           className="block text-sm/6 font-medium text-gray-900">
                                        Url sản phẩm : SEO
                                    </label>
                                    <div className="mt-2">
                                        <div
                                            className="flex p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                id="product_slug"
                                                name="product_slug"
                                                type="text"
                                                value={productSlug}
                                                onChange={(e) => setProductSlug(e.target.value)}
                                                placeholder="Vui lòng nhập tên sản phẩm"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* quảng cáo sản phẩm */}
                                <div className="sm:col-span-4">
                                    <label htmlFor="promotion_node"
                                           className="block text-sm/6 font-medium text-gray-900">
                                        Quảng cáo sản phẩm nổi bật
                                    </label>
                                    <div className="mt-2">
                                        <div
                                            className="flex p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                id="promotion_node"
                                                name="promotion_node"
                                                type="text"
                                                value={promotionNote}
                                                onChange={(e) => setPromotionNote(e.target.value)}
                                                placeholder="Vui lòng nhập tên sản phẩm"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Mô tả sản phẩm ngắn */}
                                <div className="col-span-full">
                                    <label htmlFor="short_description" className="block text-sm/6 font-medium text-gray-900">
                                        Mô tả sản phẩm ngắn gọn
                                    </label>
                                    <div className="mt-2">
                <textarea
                    id="short_description"
                    name="short_description"
                    rows={3}
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    placeholder="Vui lòng nhập mô tả sản phẩm ngắn "
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
                                    </div>
                                </div>
                                {/* Mô tả sản phẩm dài */}
                                <div className="col-span-full">
                                    <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                                        Mô tả sản phẩm
                                    </label>
                                    <div className="mt-2">
                <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Vui lòng nhập mô tả sản phẩm chi tiết "
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
                                    </div>
                                </div>
                                {/* Danh mục sản phẩm */}
                                <div className="sm:col-span-4">
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-900">
                                        Chọn danh mục
                                    </label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                    >
                                        <option value="">Chọn danh mục</option>
                                        {categories.map((cat) => (
                                            <option key={cat.category_id} value={cat.category_id}>
                                                {cat.category_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* Ảnh thu nhỏ thumbnail */}
                                <div className="col-span-full">
                                    <label htmlFor="photo" className="block text-sm/6 font-medium text-gray-900">
                                        Ảnh sản phẩm thu nhỏ (thumbnail)
                                    </label>
                                    <div className="mt-2 flex items-center gap-x-3">
                                        {thumbnail ? (
                                            <img
                                                src={thumbnail}
                                                alt="Thumbnail"
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                        ) : (
                                            <UserCircleIcon aria-hidden="true" className="w-12 h-12 text-gray-300"/> // Icon mặc định nếu không có ảnh
                                        )}
                                        <input
                                            type="file"
                                            onChange={handleThumbnailChange}
                                            multiple
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm/6 font-semibold text-gray-900">
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={images.length === 0 || loading}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Thêm nhân viên
                        </button>
                    </div>
                </form>
            </div>
        </>

    )
}

export default EditEmployee;