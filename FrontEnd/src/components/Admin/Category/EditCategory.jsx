import { useCategoryHook} from "../../../hook/index.jsx";
import {useEffect, useState} from "react";
import {notifyEditCategory} from "../../../../utils";
import {useNavigate, useParams} from "react-router-dom";
import { STATUS_CODES} from "../../../constant/index.jsx";
import {LoadingSkeleton} from "../../index.jsx";

function EditCategory() {
    const navigate = useNavigate();
    const { id }  = useParams();
    const [categoryName, setCategoryName] = useState('');
    const [description, setDescription] = useState('');
    const [categorySlug , setCategorySlug] = useState('');
    const { loadingCategory , errorCategory ,updateCategory,getCategoryById  } = useCategoryHook();
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const respone = await getCategoryById(id);
                if (respone) {
                    setCategoryName(respone.category_name);
                    setDescription(respone.description);
                    setCategorySlug(respone.categorySlug);
                }
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };

        fetchCategory();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const Category = {
            category_name : categoryName,
            categorySlug : categorySlug,
            description : description,
        }
        const respone = await updateCategory(id,Category);
        if(respone.statusCode === STATUS_CODES.OK.code){
            notifyEditCategory();
            navigate("/admin/category");
        }
    };
    if (loadingCategory) {
        return <div><LoadingSkeleton/></div>;
    }

    if (errorCategory) {
        return <div>Lỗi: {errorCategory}</div>;
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
                        <a href="/admin/category" className="text-gray-500 hover:text-indigo-600 text-sm font-medium">
                            danh mục
                        </a>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 text-sm font-semibold">Chỉnh sửa danh mục</span>
                    </nav>
                </div>

                <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">Cập nhật danh mục</h2>

                <form className="px-12 py-12 pb-12 mb-12 mt-8 sm:px-12  sm:py-12  bg-white shadow-lg rounded-lg" onSubmit={handleSubmit}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base/7 font-semibold text-gray-900">Cập nhật danh mục </h2>
                            <p className="mt-1 text-sm/6 text-gray-600">
                                Vui lòng nhập thông tin về cập nhật danh mục
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                {/* Tên danh mục */}
                                <div className="sm:col-span-4">
                                    <label htmlFor="category_name" className="block text-sm/6 font-medium text-gray-900">
                                        Tên danh mục
                                    </label>
                                    <div className="mt-2">
                                        <div
                                            className="flex p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                id="category_name"
                                                name="category_name"
                                                type="text"
                                                value={categoryName}
                                                onChange={(e) => setCategoryName(e.target.value)}
                                                placeholder="Vui lòng nhập tên danh mục"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Url / slug sản phẩm */}
                                <div className="sm:col-span-4">
                                    <label htmlFor="category_slug"
                                           className="block text-sm/6 font-medium text-gray-900">
                                        Url danh mục : SEO
                                    </label>
                                    <div className="mt-2">
                                        <div
                                            className="flex p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                id="category_slug"
                                                name="category_slug"
                                                type="text"
                                                value={categorySlug}
                                                onChange={(e) => setCategorySlug(e.target.value)}
                                                placeholder="Vui lòng nhập url danh mục"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Mô tả danh mục */}
                                <div className="col-span-full">
                                    <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                                        Mô tả danh mục
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows={3}
                                            value={description || ''}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Vui lòng nhập mô tả danh mục  "
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button onClick={() => {
                            navigate("/admin/category")
                        }} type="button" className="text-sm/6 font-semibold text-gray-900">
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={loadingCategory}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Cập nhật danh mục
                        </button>
                    </div>
                </form>
            </div>
        </>

    )
}

export default EditCategory;