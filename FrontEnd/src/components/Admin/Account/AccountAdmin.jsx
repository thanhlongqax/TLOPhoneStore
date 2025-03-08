import {UserCircleIcon} from '@heroicons/react/24/solid'
import {useEmployeeHook} from "../../../hook/index.jsx";
import { useState} from "react";
import {imageService} from "../../../service"
import {notifyAddEmployee, notifyEmployeeMessage} from "../../../../utils";
import {useNavigate} from "react-router-dom";
import { Datepicker } from "flowbite-react";
function AddEmployee() {
    const navigate = useNavigate();
    const { loadingEmployee , errorEmployee , createEmployee } = useEmployeeHook();
    const [fullName, setFullName] = useState('');
    const [dateOfBirth , setDateOfBirth] = useState(new Date("2024-10-30 00:00:00"));
    const [email, setEmail] = useState('');
    const [background , setBackground] = useState(false);
    const [selectedBackground, setSelectedBackground] = useState(null);

    const handleBackgroundChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setBackground(reader.result);
        };
        reader.readAsDataURL(file);
        setSelectedBackground(file)

    };

    const uploadImages = async () => {
        let backgroundUrl = "";
        try {
            if (selectedBackground) {
                let folderName = selectedBackground.name.toLowerCase();
                folderName = "background";
                const thumbnailResponse = await imageService.uploadImage(folderName, selectedBackground);
                backgroundUrl = thumbnailResponse.url;
            }
        }catch (e){
            console.log("Error while uploading thumbnail" , e);
        }
        return {backgroundUrl};
    };
    const handleDateChange = (date) => {
        setDateOfBirth(date);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {backgroundUrl} = await uploadImages();
        if (!fullName) {
            notifyEmployeeMessage("Vui lòng nhập họ và tên")
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email || !emailPattern.test(email)) {
            notifyEmployeeMessage("Vui lòng nhập email hợp lệ")
            return;
        }
        const Employee = {
            fullName: fullName,
            dateOfBirth: dateOfBirth,
            email : email,
            background : backgroundUrl
        }
        try {
            await createEmployee(Employee);
            notifyAddEmployee();
            navigate("/admin/employee");
        } catch (error) {
            console.log("Lỗi khi tạo nhân viên:", error);
            notifyEmployeeMessage(`Lỗi khi tạo nhân viên ${error}`);
        }

    };
    if (loadingEmployee) {
        return <div>Đang thêm sản phẩm...</div>;
    }

    if (errorEmployee) {
        return <div>Lỗi: {errorEmployee}</div>;
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
                        <a href="/admin/employee" className="text-gray-500 hover:text-indigo-600 text-sm font-medium">
                            tài khoản
                        </a>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 text-sm font-semibold">Thêm tài khoản nhân viên</span>
                    </nav>
                </div>

                <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">Thêm tài khoản nhân viên</h2>

                <form
                    className="px-12 py-12 pb-12 mb-12 mt-8 sm:px-12  border border-blue-50 bg-white shadow-lg rounded-lg "
                    onSubmit={handleSubmit}>
                    <p className="mt-1 text-sm/6 text-gray-600">
                        Vui lòng nhập thông tin về chi tiết nhân viên
                    </p>
                    <div className="flex space-x-4 w-full p-2 border-b border-gray-900/10 ">
                        <div className="space-y-4 w-1/2">
                            <div className="space-y">
                                <div className="pb-12">
                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        {/* Tên sản phẩm */}
                                        <div className="sm:col-span-4">
                                            <label htmlFor="product_name"
                                                   className="block text-sm/6 font-medium text-gray-900">
                                                Họ và tên nhân viên
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
                                                        placeholder="Vui lòng nhập tên nhân viên"
                                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Ngày sinh nhân viên  */}
                                        <div className="sm:col-span-4">
                                            <label htmlFor="barcode"
                                                   className="block text-sm/6 font-medium text-gray-900">
                                                Ngày sinh
                                            </label>
                                            <div className="mt-2">
                                                <div
                                                    className="flex p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                    <Datepicker id="date" language="vn" labelTodayButton="Ngày hôm nay"
                                                                onChange={handleDateChange} defaultValue={dateOfBirth}/>
                                                </div>
                                            </div>

                                        </div>
                                        {/* email nhân viên */}
                                        <div className="sm:col-span-4">
                                            <label htmlFor="product_price"
                                                   className="block text-sm/6 font-medium text-gray-900">
                                                Email nhân viên
                                            </label>
                                            <div className="mt-2">
                                                <div
                                                    className="flex p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="Vui lòng nhập email "
                                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="pl-4 space-y-4 w-1/2 ml-4">
                            <div className="col-span-full">
                                <label htmlFor="photo"
                                       className="block text-sm/6 font-medium text-gray-900">
                                    Ảnh đại diện nhân viên
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    {background ? (
                                        <img
                                            src={background}
                                            alt="Thumbnail"
                                            className="w-20 h-25 rounded-full object-cover"
                                        />
                                    ) : (
                                        <UserCircleIcon aria-hidden="true"
                                                        className="w-20 h-25 text-gray-300"
                                                        textAnchor="Chưa có ảnh"/>
                                    )}
                                    <input
                                        type="file"
                                        onChange={handleBackgroundChange}
                                        multiple
                                    />
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
                            disabled={loadingEmployee}
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

export default AddEmployee;